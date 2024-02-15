import { createStore, combineReducers, applyMiddleware } from 'redux';
import appReducders from './reducers';
import thunk from 'redux-thunk';

const rootReducerr = combineReducers({ appReducders });

const store = createStore(appReducders);
export default store;
