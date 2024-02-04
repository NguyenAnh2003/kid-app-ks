import axios from 'axios';

const axiosConfig = axios.create({});

export const postHTTP = async (url, params = {}) => {
  const res = await axios.post(url, params);
  return res;
};

export const getHTTP = async (url) => {
  const res = await axios.get(url);
  return res;
};
