import React, {Component} from 'react';
import { Provider } from 'react-redux';
// import store from './src/store/buildStore'
import {applyMiddleware, compose, createStore} from 'redux'
import Entry from './Entry';
import reducer from './src/reducer'
import sagas from './src/saga'

import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, compose(
    applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))
sagaMiddleware.run(sagas);

export default class App extends Component {

  render() {
    return (
        <Provider store={store}>
          <Entry/>
        </Provider>
    );
  }
}
