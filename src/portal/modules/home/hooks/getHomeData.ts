import axios from 'axios';
import { HomeData } from '../home.type';

export const getHomeData = async (): Promise<HomeData> => {
  try {
    const { data } = await axios.get('https://api-talentnesia.skwn.dev/api/home');
    return data.data;
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};
