'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchIicpData = async () => {
  const { data } = await axios.get('https://api-talentnesia.skwn.dev/api/home');
  return data.data;
};

export const useIicpData = () => {
  return useQuery({ queryKey: ['iicpData'], queryFn: fetchIicpData });
};
