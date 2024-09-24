import React, { useEffect, useState } from 'react';
import FormManageModulView from './FormManageModul.view';
import { IManageModulForm, ISubmitType } from './formManageModul.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  createModul,
  fetchModule,
  updateModul,
} from '../../api/manageModelApi';
import { APIResponseManageModul } from '../../manageModul.type';
import Loading from '@/components/loading';
import { useStatusModalStore } from '@/lib/store';
import AlertModal from '@/backoffice/components/alert-modal';

const FormManageModul = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useSearchParams();
  const { openModal } = useStatusModalStore();

  const moduleId = params.get('modulId');

  const [submitType, setSubmitType] = useState<ISubmitType>({
    type: 'nextSubmit',
  });
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [tempFormData, setTempFormData] = useState<FormData | null>(null);
  const [isAddingContent, setIsAddingContent] = useState(false);

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
    queryKey: ['module', moduleId],
    queryFn: () => fetchModule(moduleId),
  });

  useEffect(() => {
    if (isConfirmed && tempFormData) {
      handleConfirmedSubmitForm(tempFormData);
      setTempFormData(null);
      setIsConfirmed(false);
    }
  }, [isConfirmed]);

  const handleSubmitForm: IManageModulForm['handleSubmitForm'] = async (e, action) => {
    e.preventDefault();
    let formData: FormData;
    
    if (e.currentTarget instanceof HTMLFormElement) {
      formData = new FormData(e.currentTarget);
    } else {
      const form = document.querySelector('form');
      if (form) {
        formData = new FormData(form);
      } else {
        console.error('No form found');
        return;
      }
    }
  
    setTempFormData(formData);
    setIsAddingContent(action === 'addContent');
    if (!moduleId) {
      setIsConfirmed(true);
    } else {
      setOpenAlertModal(true);
    }
  };
  

  const handleConfirmedSubmitForm = async (formData: FormData) => {
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
        if (isAddingContent) {
          router.push('/backoffice/manage-modul/update/chapter?modulId=' + moduleId);
        } else {
          router.push('/backoffice/manage-modul');
        }
        openModal({
          status: 'success',
          timeOut: 2000,
          action: 'update',
          message: 'Module updated successfully',
        });
      } else {
        const responseCreate = await createAsync({ ...modulObject });
        await queryClient.invalidateQueries({ queryKey: ['modules'] });
        const id = responseCreate.id;

        if (submitType.type === 'defaultSubmit') {
          router.push(`/backoffice/manage-modul`);
        } else {
          router.push(`/backoffice/manage-modul/create/chapter?modulId=${id}`);
        }
      }
    } catch (err) {
      console.error(err);
      openModal({
        status: 'error',
        timeOut: 2000,
        message: 'Failed to process module',
      });
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <FormManageModulView
        handleSubmitForm={handleSubmitForm}
        populatedDatas={{
          data: dataModule,
          isLoading,
        }}
        setSubmitType={setSubmitType}
        type={submitType.type}
        id={moduleId || undefined}
      />
      <AlertModal
        openModal={openAlertModal}
        setOpenModal={setOpenAlertModal}
        setIsConfirmed={setIsConfirmed}
        messageText={`Are you sure you want to ${moduleId ? 'update' : 'create'} this module?`}
      />
    </Loading>
  );
};

export default FormManageModul;
