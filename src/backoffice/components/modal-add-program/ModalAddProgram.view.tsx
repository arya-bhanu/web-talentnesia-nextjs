import React from 'react';
import { Button } from 'flowbite-react';
import { Modal } from 'flowbite-react/components/Modal';
import { IModalSelect } from './modalAddProgram.type';
import { sortRowsKeyColumnTable } from '@/helpers/sort.helper';
import IconLeft from '@/../public/icons/btn-left.svg';
import IconRight from '@/../public/icons/btn-right.svg';
import Search from '@/../public/icons/iconamoon_search-bold.svg';

const ModalAddProgramView: React.FC<IModalSelect> = ({
  open,
  setOpen,
  title,
  columns,
  rows,
}) => {
  return (
    <Modal show={open} onClose={() => setOpen(false)}>
      <div className="max-w-full mx-auto">
        <Modal.Header>
          <span className="text-lg font-semibold">{title}</span>
        </Modal.Header>
        <div className="p-4">
          <Modal.Body>
            <div className="flex justify-end mb-4">
              <div className="relative w-40 max-w-xs">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <Search />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search ..."
                />
              </div>
            </div>

            <div className="overflow-x-auto overflow-y-auto sm:rounded-lg">
              {rows.length > 0 ? (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {columns.map((el, index) => (
                        <th key={index} scope="col" className="px-6 py-3">
                          <div className="flex items-center">
                            {el.val}
                          </div>
                        </th>
                      ))}
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortRowsKeyColumnTable(rows, columns).map((row, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        {columns.map((column, colIndex) => (
                          <td key={colIndex} className="px-6 py-4">
                            {typeof row[column.key] === 'function'
                              ? row[column.key]()
                              : row[column.key]}
                          </td>
                        ))}
                        <td className="pl-10 py-4">
                          <input type="checkbox" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center py-5">No data available</p>
              )}
            </div>
          </Modal.Body>

          <div className="flex justify-between items-center w-full mt-5">
            <div className="flex items-center gap-2 text-[#667085]">
              <label htmlFor="pagination" className="block">Showing</label>
              <select
                id="pagination"
                className="bg-gray-50 border max-w-[5rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option defaultChecked value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
              <p className="w-full min-w-max">data out of {rows.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-[#667085]">Data per page</p>
              <div className="flex items-center gap-2">
                <button>
                  <IconLeft />
                </button>
                <button>
                  <IconRight />
                </button>
              </div>
            </div>
          </div>

          <Modal.Footer className="w-full justify-end mt-4">
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
      </div>
    </Modal>
  );
};

export default ModalAddProgramView;
