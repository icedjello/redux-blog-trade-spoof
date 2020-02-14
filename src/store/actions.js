import * as actionTypes from './actionTypes';

export const initRowData = rowData => {
  return {
    type: actionTypes.INIT_ROW_DATA,
    rowData: rowData
  }
}


export const onAdvance = rowData => {
  return {
    type: actionTypes.ADVANCE_ONCE,
  }
}
