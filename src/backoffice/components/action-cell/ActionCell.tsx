import React, { useState } from 'react';
import AlertModal from '../alert-modal';
import { Popover } from 'flowbite-react';
// import { ModalFormEdit } from '../../modules/master-data/academic-level/components/modal-form-edit/ModalFormEdit';
import MoreHoriz from '../../../../public/icons/more_horiz.svg';

// interface ActionCellProps {
//   id: string;
//   rowData: any;
//   fetchData: () => void;
//   apiGetById: (id: string) => Promise<{ code: string; name: string }>;
//   apiDelete: (id: string) => Promise<void>;
//   apiUpdate: (id: string, updatedData: any) => Promise<void>;
//   fields: { name: string; label: string }[];
//   title: string;
//   actions: Array<{
//     name: string;
//     render: (id: string) => React.ReactNode;
//   }>;
// }

interface ActionCellProps {
  id: string;
  rowData: any;
  fetchData: () => void;
  handleActionButtonRow: (id: string, action: "edit" | "delete", rowData?: any) => void;
  fields?: { name: string; label: string }[];
  title?: string;
  actions: { name: string; render: (id: string) => React.ReactNode }[];
}

const ActionCell: React.FC<ActionCellProps> = ({
  id,
  rowData,
  handleActionButtonRow,
  actions,
}) => {
  const [open, setOpen] = useState(false);

  const handleAction = (actionName: string) => {
    if (actionName === "edit" || actionName === "delete") {
      handleActionButtonRow(id, actionName, rowData);
    } else {
      console.warn(`Unsupported action: ${actionName}`);
    }
    setOpen(false);
  };

  return (
    <div className="">
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
    </div>
  );
};

export default ActionCell;