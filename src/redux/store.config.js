import { createStore, combineReducers, applyMiddleware } from 'redux';
import appReducders from './reducers';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { thunk } from 'redux-thunk';

/**
 * @access https://jscrambler.com/blog/how-to-use-redux-persist-in-react-native-with-asyncstorage
 */

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  appReducders: persistReducer(persistConfig, appReducders),
});

const store = createStore(rootReducer, applyMiddleware(thunk));
// persistor
export const persistor = persistStore(store);

export default store;
