import { createStore } from 'redux';
import appReducders from './reducers';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

const store = createStore(appReducders, offline(offlineConfig));
export default store;
