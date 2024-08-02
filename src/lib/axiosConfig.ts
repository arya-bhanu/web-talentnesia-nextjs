import axios from 'axios';

export const axiosConfigBackoffice = axios.create({
  baseURL: 'http://localhost:7000',
});
