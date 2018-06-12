import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import MainReducer from './reducers/Main';
import SynonymReducer from './reducers/Synonym';


import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/indexSaga';

import Synonym from './screen/synonym';
import Word from './screen/word';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
};


const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  Main: MainReducer,
  Synonym: SynonymReducer
});

const pReducer = persistReducer(persistConfig, reducers);
const store = createStore(pReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/synonym" />} />
              <Route exact path='/synonym' component={Synonym} />
              <Route exact path="/word/:id" component={Word} />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}



export default App;
