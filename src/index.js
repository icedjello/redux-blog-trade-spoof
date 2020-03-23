import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {applyMiddleware, createStore, compose} from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './store/reducer';
import thunk from "redux-thunk";

const store = createStore(
    reducer,
    compose(
    applyMiddleware(thunk),
    )
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

