import React, { useState } from 'react';
import AlertModal from '../alert-modal';
import { Popover } from 'flowbite-react';
import { ModalFormEdit } from '../modal-form-edit/ModalFormEdit';
import MoreHoriz from '../../../../public/icons/more_horiz.svg';

interface ActionCellProps {
  id: string;
  fetchData: () => void;
  apiGetById: (id: string) => Promise<{ code: string; name: string }>;
  apiDelete: (id: string) => Promise<void>;
  apiUpdate: (id: string, updatedData: any) => Promise<void>;
  fields: { name: string; label: string }[];
  title: string;
  actions: Array<{
    name: string;
    render: (id: string) => React.ReactNode;
  }>;
}

const ActionCell: React.FC<ActionCellProps> = ({
  id,
  fetchData,
  apiGetById,
  apiDelete,
  apiUpdate,
  fields,
  title,
  actions,
}) => {
  const [open, setOpen] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [initialData, setInitialData] = useState({ code: '', name: '' });

  const openEditModal = async () => {
    try {
      const data = await apiGetById(id);
      setInitialData(data);
      setShowEditModal(true);
    } catch (error) {
      console.error('Failed to fetch details', error);
    }
  };

  const handleAction = (actionName: string) => {
    setOpen(false); // Close the popover
    if (actionName === 'Edit') {
      openEditModal();
    } else if (actionName === 'Delete') {
      setShowDeleteAlert(true);
    }
  };

  return (
    <div className="w-[100px] items-center text-center">
      <Popover
        open={open}
        onOpenChange={setOpen}
        aria-labelledby="action-popover"
        content={
          <div className="w-fit px-4 py-3 gap-4 flex flex-col text-sm text-gray-500 dark:text-gray-400">
            {actions.map((action) => (
              <div key={action.name} onClick={() => handleAction(action.name)}>
                {action.render(id)}
              </div>
            ))}
          </div>
        }
      >
        <button onClick={() => setOpen(true)}>
          <MoreHoriz />
        </button>
      </Popover>

      {showDeleteAlert && (
        <AlertModal
          openModal={showDeleteAlert}
          setOpenModal={setShowDeleteAlert}
          setIsConfirmed={async (confirmed) => {
            if (confirmed) {
              try {
                await apiDelete(id);
                await fetchData();
              } catch (error) {
                console.error('Failed to delete item', error);
              }
            }
          }}
        />
      )}

      <ModalFormEdit
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={async (updatedData) => {
          await apiUpdate(id, updatedData);
          await fetchData();
          setShowEditModal(false);
        }}
        initialData={initialData}
        id={id}
        title={title}
        fields={fields}
        apiUpdate={apiUpdate}
      />
    </div>
  );
};

export default ActionCell;
