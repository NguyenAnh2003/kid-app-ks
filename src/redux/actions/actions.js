import appConstants from './constants';

export const addItem = (data) => {
  return {
    type: appConstants.ADD_ITEM,
    payload: data,
  };
};

/** user activity */
export const userActivity = (data) => {
  return {
    type: appConstants.USER_ACTIVITY,
    payload: data,
  };
};

/** user login */
export const userLogin = (data) => {
  return {
    type: appConstants.USER_LOGIN,
    payload: data,
  };
};

/** signout */
export const userLogout = () => {
  return {
    type: appConstants.USER_LOGOUT,
  };
};

/** assign child to device */
export const assignData2Device = (data) => {
  console.log({ data });
  /**
   * @param data
   * (parentId, childId, hourUsage, timeUsaege)
   */
  return {
    type: appConstants.ASSIGN_DATA2DEVICE,
    payload: data,
  };
};
