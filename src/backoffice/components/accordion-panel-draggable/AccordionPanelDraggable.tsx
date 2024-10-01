'use client';
import React, { useEffect, useState } from 'react';
import AccordionPanelDraggableView from './AccordionPanelDraggable.view';
import { IAccordionPanelDraggable } from './accordionPanelDraggable.type';
import { IStateChapter } from '@/backoffice/modules/manage-modul/components/chapter/chapter.type';
import { deleteChapter } from '@/backoffice/modules/manage-modul/api/manageModelApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useStatusModalStore } from '@/lib/store';

const AccordionPanelDraggable: React.FC<
  IAccordionPanelDraggable &
    IStateChapter & { index: number; chapterId?: string }
> = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [isConfirmDel, setIsConfirmDel] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const { openModal: openModalToast } = useStatusModalStore();
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutateAsync: deleteChapterAsync } = useMutation({
    mutationFn: deleteChapter,
    mutationKey: ['chapter'],
  });

  const handleClickEdit = () => {
    router.push(
      pathname +
        'chapter?modulId=' +
        params.get('modulId') +
        '&chapterId=' +
        props.id,
    );
  };

  useEffect(() => {
    (async function () {
      if (isConfirmDel && idDelete) {
        try {
          await deleteChapterAsync(idDelete);
          openModalToast({
            status: 'success',
            action: 'delete',
            message: 'data chapter berhasil dihapus',
          });
          await queryClient.invalidateQueries({ queryKey: ['chapter'] });
          await queryClient.invalidateQueries({ queryKey: ['module'] });
          await queryClient.invalidateQueries({ queryKey: ['modules'] });
        } catch (err) {
          console.error(err);
          openModalToast({ status: 'error', message: JSON.stringify(err) });
        }
      }
    })();
  }, [isConfirmDel]);
  return (
    <AccordionPanelDraggableView
      setIdDelete={setIdDelete}
      setOpenModal={setOpenModal}
      setIsConfirmed={setIsConfirmDel}
      isConfirmed={isConfirmDel}
      idDelete={idDelete}
      openModal={openModal}
      handleEdit={handleClickEdit}
      {...props}
    />
  );
};

export default AccordionPanelDraggable;
