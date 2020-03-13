import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {applyMiddleware, createStore, compose} from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './store/reducer';
import thunk from "redux-thunk";
import logger from "redux-logger";

const store = createStore(
    reducer,
    compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

