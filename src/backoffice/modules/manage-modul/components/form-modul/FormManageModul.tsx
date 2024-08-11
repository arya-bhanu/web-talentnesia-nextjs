import React from 'react';
import FormManageModulView from './FormManageModul.view';
import { IManageModulForm } from './formManageModul.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  createModul,
  fetchModule,
  updateModul,
} from '../../api/manageModelApi';
import { APIResponseManageModul } from '../../manageModul.type';

const FormManageModul = ({ id }: { id?: string }) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  // edit
  const { mutateAsync: createAsync } = useMutation({
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
    queryFn: () => fetchModule(id),
  });

  const handleSubmitForm: IManageModulForm['handleSubmitForm'] = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const modul = formData.get('modul');
    const status = formData.get('status');
    const modulObject = { active: Number(status), name: modul } as Pick<
      APIResponseManageModul,
      'active' | 'name'
    >;
    try {
      if (id) {
        await updateAsync({ data: modulObject, id });
        await queryClient.invalidateQueries({ queryKey: ['modules'] });
        router.push('/backoffice/manage-modul');
      } else {
        const responseCreate = await createAsync({ ...modulObject });
        await queryClient.invalidateQueries({ queryKey: ['modules'] });
        const id = responseCreate.data.id;
        router.push(`/backoffice/manage-modul/create/chapter?modulId=${id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormManageModulView
      handleSubmitForm={handleSubmitForm}
      populatedDatas={data?.data}
      id={id}
    />
  );
};

export default FormManageModul;
