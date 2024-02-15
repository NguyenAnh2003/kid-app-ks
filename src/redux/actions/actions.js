import appConstants from './constants';

export const addItem = (data) => {
  console.log(data);
  return {
    type: appConstants.ADD_ITEM,
    payload: data,
  };
};

export const userActivity = (data) => {
  return {
    type: appConstants.USER_ACTIVITY,
    payload: data,
  };
};
