import React, { useState } from 'react';
import FormManageModulView from './FormManageModul.view';
import { IManageModulForm, ISubmitType } from './formManageModul.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  createModul,
  fetchModule,
  updateModul,
} from '../../api/manageModelApi';
import { APIResponseManageModul } from '../../manageModul.type';

const FormManageModul = ({ moduleId }: { moduleId?: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [submitType, setSubmitType] = useState<ISubmitType>({
    type: 'nextSubmit',
  });

  // edit
  const { mutateAsync: createAsync } = useMutation({
    mutationKey: ['modules'],
    mutationFn: createModul,
  });

  // update
  const { mutateAsync: updateModulAsync } = useMutation({
    mutationKey: ['modules'],
    mutationFn: updateModul,
  });

  const { data: dataModule, isLoading } = useQuery({
    queryKey: ['module'],
    queryFn: () => fetchModule(moduleId),
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
      if (moduleId) {
        await updateModulAsync({ data: modulObject, moduleId });
        await queryClient.invalidateQueries({ queryKey: ['modules'] });
        if (submitType.type === 'defaultSubmit') {
          router.push('/backoffice/manage-modul');
        } else {
          router.push(
            '/backoffice/manage-modul/update/chapter?modulId=' + moduleId,
          );
        }
      } else {
        const responseCreate = await createAsync({ ...modulObject });
        await queryClient.invalidateQueries({ queryKey: ['modules'] });
        const id = responseCreate.data.id;
        if (submitType.type === 'defaultSubmit') {
          router.push(`/backoffice/manage-modul`);
        } else {
          router.push(
            `/backoffice/manage-modul/create/chapter?modulId=${id}`,
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormManageModulView
      handleSubmitForm={handleSubmitForm}
      populatedDatas={{
        data: dataModule?.data,
        isLoading,
      }}
      setSubmitType={setSubmitType}
      type={submitType.type}
      id={moduleId}
    />
  );
};

export default FormManageModul;
