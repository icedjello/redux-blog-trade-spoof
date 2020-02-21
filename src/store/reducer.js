import * as actionTypes from './actionTypes';

import { initialState, priceUpdater } from '../dataTools';


let startTime = null;

let reduceUpdater = (prevState) => {
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
      return reduceUpdater(prevState);

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
      let updatedBuyData = prevState.rowData.map(row => ({
        ...row,
        quantity: row.id === action.payload ? (row.quantity > 100 ? (row.quantity - 100) : 0) : row.quantity
      }));
      return {
        ...prevState,
        rowData: updatedBuyData
      };

    case actionTypes.SELL:
      let updatedSellData = prevState.rowData.map(row => ({
        ...row,
        quantity: row.id === action.payload ? row.quantity + 100 : row.quantity
      }));
      return {
        ...prevState,
        rowData: updatedSellData
      };

    default: return prevState;
  }
};

export { reducer, startTime }
