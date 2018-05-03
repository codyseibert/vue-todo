import axios from 'axios';
import store from './store/';

export default () => {
  return axios.create({
    baseURL: store.state.baseApiUrl,
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${store.state.authentication.token}`,
    },
  });
};
