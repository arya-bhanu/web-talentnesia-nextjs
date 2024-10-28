import { skripsiAxios } from '@/skripsi/config/axiosConfig';

export const fetchSocialMediaLink = async () => {
  return await skripsiAxios.get('/cms/footer/social-media');
};
