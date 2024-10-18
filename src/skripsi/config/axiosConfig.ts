import axios from 'axios';

export const skripsiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SKRIPSI_URL,
});
