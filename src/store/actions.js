import * as actionTypes from './actionTypes';

export const initRowData = rowData => {
    return {
        type: actionTypes.INIT_ROW_DATA,
        rowData: rowData
    }
};

export const advance = () => {
    return {
        type: actionTypes.ADVANCE_ONCE
    }
};

export const run = () => (dispatch) => {
    let interval = setInterval(() => {
        dispatch(advance())
    }, 300);

    dispatch({
        type: actionTypes.RUN,
        interval
    });
};

export const stop = (interval) => {
    clearInterval(interval);
    return {
        type: actionTypes.STOP
    }
};

export const buy = () => {
    return {
        type: actionTypes.BUY,
        // payload: {
        //     value,
        //     id
        // }
    }
};

export const sell = () => {
    return {
        type: actionTypes.SELL,
        // payload: {
        //     value,
        //     id
        // }
    }
};
