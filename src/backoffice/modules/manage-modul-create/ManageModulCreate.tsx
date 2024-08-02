'use client';
import React, { useState } from 'react';
import ManageModulCreateView from './ManageModulCreate.view';
import {
  IManageModulCreate,
  ManageModulCreateObject,
} from './manageModulCreate.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createModul } from './api/manageModulCreateApi';
import { useRouter } from 'next/navigation';

const ManageModulCreate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationKey: ['modules'],
    mutationFn: createModul,
  });
  const [modulObject, setModulObject] = useState<ManageModulCreateObject>({
    modulName: '',
    status: 'active',
  });
  const handleSubmitForm: IManageModulCreate['handleSubmitForm'] = async (
    e,
  ) => {
    e.preventDefault();
    try {
      await mutateAsync({ ...modulObject });
      await queryClient.invalidateQueries({ queryKey: ['modules'] });
      router.push('/backoffice/manage-modul');
    } catch (err) {
      console.error(err);
    }
    console.log(modulObject);
  };
  const onChangeModulName: IManageModulCreate['onChangeModulName'] = (e) => {
    e.preventDefault();
    setModulObject((prev) => ({ ...prev, modulName: e.target.value }));
  };
  const onChangeSelectedStatus: IManageModulCreate['onChangeSelectedStatus'] = (
    e,
  ) => {
    e.preventDefault();
    setModulObject((prev) => ({ ...prev, status: e.target.value }));
  };
  return (
    <ManageModulCreateView
      handleSubmitForm={handleSubmitForm}
      onChangeModulName={onChangeModulName}
      onChangeSelectedStatus={onChangeSelectedStatus}
      state={modulObject}
    />
  );
};

export default ManageModulCreate;
