import appConstants from './actions/constants';

const initState = { item: {} };

const appReducders = (state = initState, action) => {
  switch (action.type) {
    case appConstants.addItem:
      return { ...state, item: action.payload };

    default:
      return state;
  }
};

export default appReducders;
