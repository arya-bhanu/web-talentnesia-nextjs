import { skripsiAxios } from '../../config/axiosConfig';
export const getHomeData = async () => {
  return skripsiAxios.get('/home');
};
