import appConstants from './constants';

export const addItem = (data) => (dispatch) => {
  dispatch({
    type: appConstants.addItem,
    payload: data,
  });
};

export const getItem = () => {
  
}