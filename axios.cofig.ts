import axios from 'axios';

const http = axios.create({
  baseURL: 'https://pixabay.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  (config) => {
    if (!config.params) config.params = {};
    config.params['key'] = '49295111-1f2715b732cb0635e7d8dcf58';

    return config;
  },
  (error) => Promise.reject(error),
);
http.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    return Promise.reject(error);
  },
);

export default http;
