import { createStore, combineReducers, applyMiddleware } from 'redux';
import appReducders from './reducers';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';

/**
 * @access https://jscrambler.com/blog/how-to-use-redux-persist-in-react-native-with-asyncstorage
 * @access https://www.youtube.com/watch?v=p38wfGgQZ9c
 * @access https://blog.logrocket.com/use-redux-persist-react-native/
 */

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

/** persisted reducer */
const rootReducer = combineReducers({
  appReducders: persistReducer(persistConfig, appReducders),
});

export const configStore = createStore(rootReducer);
// persistor
export const persistor = persistStore(configStore);
