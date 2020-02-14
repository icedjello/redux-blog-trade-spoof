import * as actionTypes from './actionTypes';

import { initialState, bskUpdater, priceUpdater, quantityUpdater } from '../dataTools';


let startTime = null;

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_ROW_DATA:
      startTime = Date.now()
      return {
        ...prevState,
        rowData: action.rowData
      };

    case actionTypes.ADVANCE_ONCE:
      let updatedData = prevState.rowData.map(row => ({
        ...row,
        quantity: quantityUpdater(row.quantity),
        price: priceUpdater(row.price),
        bsk: bskUpdater()

      }))
      // debugger
      startTime = Date.now()
      return {
        ...prevState,
        rowData: updatedData
      }
    default: return prevState;
  }
}

export { reducer, startTime }