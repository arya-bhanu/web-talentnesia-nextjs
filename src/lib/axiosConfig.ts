import axios from 'axios';

export const backOfficeAPI = axios.create({
  baseURL: 'http://localhost:7000',
});
