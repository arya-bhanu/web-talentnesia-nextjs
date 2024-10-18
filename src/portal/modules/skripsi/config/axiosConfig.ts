import axios from 'axios';

export const skripsiAxios = axios.create({
  baseURL: process.env.API_SKRIPSI_URL,
});
