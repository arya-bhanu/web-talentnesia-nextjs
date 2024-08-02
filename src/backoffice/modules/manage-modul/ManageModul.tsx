"use client"
import React from 'react';
import ManageModulView from './ManageModul.view';
import { useQuery } from '@tanstack/react-query';
import { fetchModules } from './api/manageModelApi';

const ManageModul = () => {
  const query = useQuery({ queryKey: ['modules'], queryFn: fetchModules });
  return <ManageModulView data={query.data?.data} />;
};

export default ManageModul;
