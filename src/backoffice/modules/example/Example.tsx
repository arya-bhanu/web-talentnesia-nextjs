'use client';
import React from 'react';
import ExampleView from './Example.view';
import FormExample from './components/form-example/FormExample';
import TableExample from './components/table-example/TableExample';
import { useQuery } from '@tanstack/react-query';
import { backOfficeAPI } from '@/lib/axiosConfig';

const Example = () => {
  const { data } = useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      const data = await backOfficeAPI.get('/example');
      return data;
    },
  });
  console.log(data?.data);
  return <h1>Hello World</h1>;
};

export default Example;
