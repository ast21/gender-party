import axios from 'axios';

function API() {
  return axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  });
}

export default API();