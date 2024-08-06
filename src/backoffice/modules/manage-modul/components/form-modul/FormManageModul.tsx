import React from 'react';
import FormManageModulView from './FormManageModul.view';
import { IManageModulForm, ModuleObject } from './formManageModul.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  createModul,
  fetchModule,
  updateModul,
} from '../../api/manageModelApi';

const FormManageModul = ({ slug }: { slug?: number }) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  // edit
  const { mutateAsync : createAsync } = useMutation({
    mutationKey: ['modules'],
    mutationFn: createModul,
  });

  // update
  const { mutateAsync: updateAsync } = useMutation({
    mutationKey: ['modules'],
    mutationFn: updateModul,
  });

  const { data } = useQuery({
    queryKey: ['module'],
    queryFn: () => fetchModule(slug),
  });

  const handleSubmitForm: IManageModulForm['handleSubmitForm'] = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const modul = formData.get('modul');
    const status = formData.get('status');
    const modulObject = {
      modulName: modul as string,
      status: status as string,
    };
    try {
      if (slug) {
        await updateAsync({ data: modulObject, id: slug });
        await queryClient.invalidateQueries({ queryKey: ['modules'] });
        router.push('/backoffice/manage-modul');
      } else {
        await createAsync({ ...modulObject });
        await queryClient.invalidateQueries({ queryKey: ['modules'] });
        router.push('/backoffice/manage-modul/create/chapter');
      }

      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormManageModulView
      handleSubmitForm={handleSubmitForm}
      populatedDatas={data?.data}
    />
  );
};

export default FormManageModul;
