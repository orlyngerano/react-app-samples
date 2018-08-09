import React, { Component } from 'react';
import './App.css';

import { createStore, combineReducers} from 'redux';
import TodoReducer from './reducers/Todo';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import TodoScreen from './components/TodoScreen';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const reducers = combineReducers({
  Todo: TodoReducer
});

const pReducer = persistReducer(persistConfig, reducers);
const store = createStore(pReducer);
const persistor = persistStore(store);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TodoScreen></TodoScreen>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
