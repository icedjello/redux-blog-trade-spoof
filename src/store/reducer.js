import * as actionTypes from './actionTypes';

import { makeData } from './dataBuilder';

let startTime = null;

const initialState = {
  rowData: makeData(50000)
}

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_ROW_DATA:
      startTime = Date.now()
      return {
        ...prevState,
        rowData: action.rowData
      };

    case actionTypes.ADVANCE_ONCE:
      let updatedOddData = prevState.rowData.map(row => ({
        ...row,
        number: row.id % 2 === 0 ? row.number + 1 : row.number
      }))
      startTime = Date.now()
      return {
        ...prevState,
        rowData: updatedOddData
      }
    default: return prevState;
  }
}

export { reducer, startTime }