'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchHomeData = async () => {
  const { data } = await axios.get('https://api-talentnesia.skwn.dev/api/home');
  return data.data;
};

export const useHomeData = () => {
  return useQuery({ queryKey: ['homeData'], queryFn: fetchHomeData });
};
