import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://localhost:5001/api',
// });

const api = axios.create({
  baseURL: 'https://hipnoappinstancelast.azurewebsites.net/api',
});

export default api;
