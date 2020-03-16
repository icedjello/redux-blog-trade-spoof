import * as actionTypes from './actionTypes';

import { initialState, priceUpdater } from '../dataTools';

let startTime = null;

let _reduceUpdater = (prevState) => {
  let totalOwnedPriceUpdates = 0
  let updatedData = prevState.rowData.map(row => {
    let updatedPrice = priceUpdater(row.price)
    if(row.quantity>0){
    totalOwnedPriceUpdates += row.price - updatedPrice
    }
    return{
    ...row,
    price: updatedPrice,
  }
});
  startTime = Date.now();
  return {
    ...prevState,
    rowData: updatedData,
    netValue: prevState.netValue + totalOwnedPriceUpdates
  }
};

function getActualBuyAmount(unitaryPrice, prevState, amountToBuy) {
          let unitaryPencePrice = unitaryPrice * 100;
          let previousPenceBalance = prevState.balance * 100;
          
          let penceCost = amountToBuy * unitaryPencePrice;
          let newPenceBalance = previousPenceBalance - penceCost;

          if (newPenceBalance < 0) {
           let maxQuantityWithCurrentBal = Math.floor(prevState.balance / unitaryPrice)
            return amountToBuy =  maxQuantityWithCurrentBal
          } 
          return amountToBuy
}

function getActualSellAmount(quantity, sellAmount){
  if (quantity >= sellAmount) {
      return sellAmount
  }
  return quantity
}



const reducer = (prevState = initialState, action) => {
  switch (action.type) {

    case actionTypes.INIT_ROW_DATA:
      startTime = Date.now();
      return {
        ...prevState,
        rowData: action.rowData
      };

    case actionTypes.ADVANCE_ONCE:
      return _reduceUpdater(prevState);

    case actionTypes.RUN:
      return {
        ...prevState,
        running: action.interval,
      };

    case actionTypes.STOP:
      return {
        ...prevState,
        running: null,
      };


    case actionTypes.BUY:
      let buyPrice = action.payload.buyPrice;
      let attemptedAmountToBuy = action.payload.buyAmount;
      let actualAmountToBuy = getActualBuyAmount(buyPrice, prevState, attemptedAmountToBuy);                 
      let newBalance = prevState.balance - (actualAmountToBuy * buyPrice)      


      let updatedBuyData = prevState.rowData.map(row => {
          let rowToUpdateFound = row.id === action.payload.id;
          if (!rowToUpdateFound) {
            return {...row}
          }       
          return {
            ...row,
            quantity: row.quantity + actualAmountToBuy
          }
        }
      );

      return {
        ...prevState,
        rowData: updatedBuyData,
        balance: Number(newBalance.toFixed(2)),
        netValue: Number((prevState.netValue + (prevState.balance - newBalance)).toFixed(2))
      }


    case actionTypes.SELL:
      let rowQuantity = action.payload.quantity
      let attemptedSellAmount = action.payload.sellAmount
      let sellPrice = action.payload.sellPrice
      let actualSellAmount = getActualSellAmount(rowQuantity, attemptedSellAmount)
      let newBalanceAfterSell = prevState.balance + (actualSellAmount * sellPrice)

      let updatedSellData = prevState.rowData.map(row => {
        let selectedRow = (row.id === action.payload.id)
        if(!selectedRow){
          return row
        }
      
        return {
          ...row,
          quantity: rowQuantity - actualSellAmount
        }          
      })

      return {
        ...prevState,
        rowData: updatedSellData,
        balance: Number(newBalanceAfterSell.toFixed(2)),
        netValue: Number((prevState.netValue - (newBalanceAfterSell - prevState.balance)).toFixed(2))
      };


    case actionTypes.UPDATE_SELL_AMOUNT:
      return {
        ...prevState,
        sellAmount: action.payload
      };

    case actionTypes.UPDATE_BUY_AMOUNT:
      return {
        ...prevState,
        buyAmount: action.payload
      };

    default: return prevState;
  }
};

export { reducer, startTime }
