import * as actionTypes from './actionTypes';

import { initialState, priceUpdater } from '../dataTools';

let startTime = null;



let _advanceUpdater = (prevState) => {
  startTime = Date.now();
  let totalOwnedPriceUpdates = 0
  let recordsUpdated = 0
  let updatedData = prevState.rowData.map(row => {
    let updatedPrice = priceUpdater(row.price)
    if (row.quantity > 0) {
      totalOwnedPriceUpdates += row.price - updatedPrice
    }
    recordsUpdated++
    return {
      ...row,
      price: updatedPrice,
    }
  });

  return {
    ...prevState,
    rowData: updatedData,
    netValue: prevState.netValue + totalOwnedPriceUpdates,
    timesStoreHasBeenUpdated: prevState.timesStoreHasBeenUpdated + 1,
    recordsUpdated: prevState.recordsUpdated + recordsUpdated
  }
};


function getActualBuyAmount(unitaryPrice, prevState, amountToBuy) {
  let unitaryPencePrice = unitaryPrice * 100;
  let previousPenceBalance = prevState.balance * 100;

  let penceCost = amountToBuy * unitaryPencePrice;
  let newPenceBalance = previousPenceBalance - penceCost;

  if (newPenceBalance < 0) {
    let maxQuantityWithCurrentBal = Math.floor(prevState.balance / unitaryPrice)
    return amountToBuy = maxQuantityWithCurrentBal
  }
  return amountToBuy
}

function buyUpdater(prevState, newBalance, id, actualAmountToBuy) {
  startTime = Date.now();
  let updatedBuyData = prevState.rowData.map(row => {
    let rowToUpdateFound = row.id === id;
    if (!rowToUpdateFound) {
      return { ...row }
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
    netValue: Number((prevState.netValue + (prevState.balance - newBalance)).toFixed(2)),
    timesStoreHasBeenUpdated: prevState.timesStoreHasBeenUpdated + 1,
    recordsUpdated: prevState.recordsUpdated + 1
  }
}


function getActualSellAmount(quantity, sellAmount) {
  if (quantity >= sellAmount) {
    return sellAmount
  }
  return quantity
}

function sellUpdater(prevState, newBalanceAfterSell, payload, actualSellAmount) {
  startTime = Date.now();
  let updatedSellData = prevState.rowData.map(row => {
    let selectedRow = (row.id === payload.id)
    if (!selectedRow) {
      return row
    }

    return {
      ...row,
      quantity: payload.quantity - actualSellAmount
    }
  })

  return {
    ...prevState,
    rowData: updatedSellData,
    balance: Number(newBalanceAfterSell.toFixed(2)),
    netValue: Number((prevState.netValue - (newBalanceAfterSell - prevState.balance)).toFixed(2)),
    timesStoreHasBeenUpdated: prevState.timesStoreHasBeenUpdated + 1,
    recordsUpdated: prevState.recordsUpdated + 1
  };

}

function handleNANUpdater(prevState, payload) {
  startTime = Date.now();
  let noNaNRowData = prevState.rowData.map(row => {
    if (row.id === payload.id) {
      return {
        ...row,
        quantity: payload.oldValue
      }
    }
    return row
  })
  return {
    ...prevState,
    rowData: noNaNRowData,
  }
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
      return _advanceUpdater(prevState);

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

    case actionTypes.HANDLE_NAN:
      return handleNANUpdater(prevState, action.payload)


    case actionTypes.BUY:
      let buyPrice = action.payload.buyPrice;
      let actualAmountToBuy = getActualBuyAmount(buyPrice, prevState, action.payload.buyAmount);
      let newBalance = prevState.balance - (actualAmountToBuy * buyPrice)

      return buyUpdater(prevState, newBalance, action.payload.id, actualAmountToBuy)


    case actionTypes.SELL:
      let actualSellAmount = getActualSellAmount(action.payload.quantity, action.payload.sellAmount)
      let newBalanceAfterSell = prevState.balance + (actualSellAmount * action.payload.sellPrice)

      return sellUpdater(prevState, newBalanceAfterSell, action.payload, actualSellAmount)


    case actionTypes.UPDATE_SELL_AMOUNT:
      startTime = Date.now();
      return {
        ...prevState,
        sellAmount: action.payload,
        timesStoreHasBeenUpdated: prevState.timesStoreHasBeenUpdated + 1
      };

    case actionTypes.UPDATE_BUY_AMOUNT:
      startTime = Date.now();
      return {
        ...prevState,
        buyAmount: action.payload,
        timesStoreHasBeenUpdated: prevState.timesStoreHasBeenUpdated + 1
      };

    case actionTypes.RECORD_TRANSACTION_TIME:
      return {
        ...prevState,
        timeTakenForTransaction: action.payload + prevState.timeTakenForTransaction
      }

    default: return prevState;
  }
};

export { reducer, startTime }
