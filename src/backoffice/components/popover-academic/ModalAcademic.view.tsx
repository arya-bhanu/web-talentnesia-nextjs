import { Popover } from 'flowbite-react';
import React, { useEffect, useState, useCallback } from 'react';
import MoreHoriz from '../../../../public/icons/more_horiz.svg';
import { IModalAcademic } from './modalAcademic.type';
import AlertModal from '../alert-modal';
import { academicLevelAPI } from '@/backoffice/modules/master-data/academic-level/api/academicLevelApi';
import { ModalFormEdit } from '../modal-form-edit/ModalFormEdit';

const PopoverAcademicView: React.FC<IModalAcademic> = ({
  handleActionButtonRow,
  id,
  index,
  openModalIndex,
  setOpenModalIndex,
  onUpdate,
  onDelete,
}) => {
  const [open, setOpen] = useState(openModalIndex === index);
  const [openModal, setOpenModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [initialData, setInitialData] = useState({ code: '', name: '' });

  const handleDelete = useCallback(async () => {
    try {
      await academicLevelAPI.delete(id);
      handleActionButtonRow(id, 'delete');
      await onDelete();
    } catch (error) {
      console.error('Failed to delete academic level', error);
    }
  }, [id, handleActionButtonRow, onDelete]);

  useEffect(() => {
    if (isConfirmed) {
      handleDelete();
    }
  }, [isConfirmed, handleDelete]);

  useEffect(() => {
    setOpen(openModalIndex === index);
  }, [openModalIndex, index]);

  const openEditModal = async () => {
    try {
      const academicLevel = await academicLevelAPI.getById(id);
      setInitialData({ code: academicLevel.code, name: academicLevel.name });
      setIsEditOpen(true);
    } catch (error) {
      console.error('Failed to fetch academic level details', error);
    }
  };

  return (
    <td className="px-2 py-2">
      <AlertModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setIsConfirmed={setIsConfirmed}
      />
      <Popover
        open={open}
        onOpenChange={setOpen}
        aria-labelledby="academic-popover"
        content={
          <div className="w-fit px-4 py-3 gap-4 flex flex-col text-sm text-gray-500 dark:text-gray-400">
            <button
              className="hover:text-blue-500 hover:underline"
              onClick={openEditModal}
            >
              Edit
            </button>
            <button
              className="hover:text-red-500 hover:underline"
              onClick={() => setOpenModal(true)}
            >
              Delete
            </button>
          </div>
        }
      >
        <button onClick={() => setOpenModalIndex(index)}>
          <MoreHoriz />
        </button>
      </Popover>
      <ModalFormEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={async (updatedData) => {
          handleActionButtonRow(id, 'edit');
          await onUpdate();
        }}
        initialData={initialData}
        id={id}
        title="Edit Academic Level"
        fields={[
          { name: 'code', label: 'Code' },
          { name: 'name', label: 'Academic Level Name' },
        ]}
        apiUpdate={academicLevelAPI.update}
      />
    </td>
  );
};

export default PopoverAcademicView;
