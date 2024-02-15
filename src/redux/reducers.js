import AsyncStorage from '@react-native-async-storage/async-storage';
import appConstants from './actions/constants';

const initState = {
  item: { name: '' },
};

const appReducders = (state = initState, action) => {
  /** item reducer
   * reducer can be used for single object
   */
  switch (action.type) {
    case appConstants.ADD_ITEM:
      console.log('description', action.payload);
      return { ...state.item, item: { name: action.payload } };
    default:
      return state;
  }
};

export default appReducders;
