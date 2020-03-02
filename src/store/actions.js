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

export const buy = (id, amount) => {
    return {
        type: actionTypes.BUY,
        payload: {id: id, buyAmount: amount}
    }
};

export const sell = (id, amount) => {
    return {
        type: actionTypes.SELL,
        payload: {id: id, sellAmount: amount}
    }
};

export const updateSellAmount = (amount) =>{
    return {
        type: actionTypes.UPDATE_SELL_AMOUNT,
        payload: amount
    }
};

export const updateBuyAmount = (amount) =>{
    return {
        type: actionTypes.UPDATE_BUY_AMOUNT,
        payload: amount
    }
};
