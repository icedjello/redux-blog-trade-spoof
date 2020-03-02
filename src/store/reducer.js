import * as actionTypes from './actionTypes';

import { initialState, priceUpdater } from '../dataTools';

let startTime = null;

let _reduceUpdater = (prevState) => {
  let updatedData = prevState.rowData.map(row => ({
    ...row,
    price: priceUpdater(row.price),
  }));
  startTime = Date.now();
  return {
    ...prevState,
    rowData: updatedData
  }
};



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
      let buyPrice = 0;
      let updatedBuyData = prevState.rowData.map(row => {
        if(row.id === action.payload.id){
            buyPrice = row.price;         
          return {
            ...row,
            quantity: row.quantity + action.payload.buyAmount
          }
        }
        return row
      });
      let buyPriceInPence = buyPrice * 100;
      let valueOfBuyInPounds = (action.payload.buyAmount * buyPriceInPence)/100;
      let newBalanceAmountAfterBuy = prevState.balance - valueOfBuyInPounds;
      
      if(newBalanceAmountAfterBuy<0){
        return prevState;
     }
      return {
        ...prevState,
        rowData: updatedBuyData,
        balance: Number(newBalanceAmountAfterBuy.toFixed(2)),
        netValue: Number((prevState.netValue + newBalanceAmountAfterBuy).toFixed(2))
      }
    

    case actionTypes.SELL:
      let sellPrice = 0;
      let rowQuantity = 0;
      let updatedSellData = prevState.rowData.map(row => {
        if(row.id === action.payload.id){
            rowQuantity = row.quantity
            sellPrice = row.price
            return{
              ...row,
              quantity: row.quantity - action.payload.sellAmount
            }
        }
       return row        
    })
       let sellPriceInPence = sellPrice * 100;
       let valueOfSellInPounds = (action.payload.sellAmount * sellPriceInPence)/100;
       let newBalanceAmountAfterSell = prevState.balance + valueOfSellInPounds
    
       if(rowQuantity<action.payload.sellAmount){
        return prevState;
       }
      
       return {
        ...prevState,
        rowData: updatedSellData,
        balance: Number(newBalanceAmountAfterSell.toFixed(2)),
        netValue: Number((prevState.netValue - newBalanceAmountAfterSell).toFixed(2))
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
