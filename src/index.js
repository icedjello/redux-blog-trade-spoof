import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {applyMiddleware, createStore} from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './store/reducer';
import thunk from "redux-thunk";
import logger from "redux-logger";

const store = createStore(
    reducer,
    applyMiddleware(thunk, logger)
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

