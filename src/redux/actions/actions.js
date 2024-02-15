import appConstants from './constants';

export const addItem = (data) => {
  return {
    type: appConstants.addItem,
    payload: data,
  };
};
