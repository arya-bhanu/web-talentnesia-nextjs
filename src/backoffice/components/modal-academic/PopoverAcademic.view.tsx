import { Popover } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import MoreHoriz from '../../../../public/icons/more_horiz.svg';
import { IPopoverAcademic } from './popoverAcademic.type';
import AlertModal from '../alert-modal';
import { academicLevelAPI } from '../../modules/academic-level/api/academicLevelApi';

const PopoverAcademicView: React.FC<IPopoverAcademic> = ({
  handleActionButtonRow,
  id,
  index,
  openPopoverIndex,
  setOpenPopoverIndex,
  onUpdate,
  onDelete
}) => {
  const [open, setOpen] = useState(openPopoverIndex === index);
  const [openModal, setOpenModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (isConfirmed) {
      handleDelete();
    }
  }, [isConfirmed]);

  useEffect(() => {
    setOpen(openPopoverIndex === index);
  }, [openPopoverIndex, index]);

  const handleDelete = async () => {
    try {
      await academicLevelAPI.delete(id);
      handleActionButtonRow(id, 'delete');
      await onDelete();
    } catch (error: any) {
      console.error('Failed to delete academic level', error.response?.data || error.message);
    }
  };

  const handleSave = async () => {
    try {
      const updatedData = { code, name };
      await academicLevelAPI.update(id, updatedData);
      handleActionButtonRow(id, 'edit');
      await onUpdate();
      setIsEditOpen(false);
    } catch (error) {
      console.error('Failed to update academic level', error);
    }
  };

  const openEditModal = async () => {
    try {
      const academicLevel = await academicLevelAPI.getById(id);
      setIsEditOpen(true);
    } catch (error) {
      console.error('Failed to fetch academic level details', error);
    }
  };

  return (
    <td className="px-6 py-4">
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
        <button onClick={() => setOpenPopoverIndex(index)}>
          <MoreHoriz />
        </button>
      </Popover>
      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-6">Edit Academic Level</h2>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 flex">
                <span>Code</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Input code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 flex">
                <span>Academic Level Name</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Input level name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </td>
  );
};

export default PopoverAcademicView;