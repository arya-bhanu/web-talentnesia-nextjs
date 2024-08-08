import axios from 'axios';

export const backOfficeAPI = axios.create({
  baseURL: process.env.API_SERVER_URL,
});
