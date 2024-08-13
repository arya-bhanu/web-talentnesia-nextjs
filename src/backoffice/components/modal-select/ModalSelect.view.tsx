import { Button } from 'flowbite-react/components/Button';
import { Modal } from 'flowbite-react/components/Modal';
import React from 'react';
import { IModalSelect } from './modalSelect.type';
import { sortRowsKeyColumnTable } from '@/helpers/sort.helper';

const ModalSelectView: React.FC<IModalSelect> = ({
  open,
  setOpen,
  title,
  columns,
  rows,
}) => {
  return (
    <Modal show={open} onClose={() => setOpen(false)}>
      <Modal.Header>
        <span className="text-lg font-semibold">{title}</span>
      </Modal.Header>
      <div>
        <Modal.Body>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {columns.map((el) => {
                    return (
                      <th scope="col" className="px-6 py-3">
                        {el.val}
                      </th>
                    );
                  })}
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortRowsKeyColumnTable(rows, columns).map((row, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      {columns.map((column) => {
                        return (
                          <>
                            <td className="px-6 py-4" key={column.key}>
                              {typeof row[column.key] === 'function'
                                ? row[column.key]()
                                : row[column.key]}
                            </td>
                          </>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Modal.Body>

        <Modal.Footer className="w-full justify-end">
          <Button
            onClick={() => setOpen(false)}
            type="button"
            outline
            className="border transition-none delay-0 border-[#F04438] text-[#F04438] outline-transparent bg-transparent enabled:hover:bg-[#F04438] enabled:hover:text-white"
          >
            Cancel
          </Button>
          <Button color={'warning'} className="bg-[#FFC862] text-black">
            Submit
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default ModalSelectView;
