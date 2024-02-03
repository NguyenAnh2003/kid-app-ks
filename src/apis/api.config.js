import axios from 'axios';

const postHTTP = (url, params = {}) => {
  const res = axios.post(url, params);
  return res;
};

const getHTTP = url => {
  const res = axios.get(url);
  return res;
};
