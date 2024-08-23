import React from 'react';
import IconLeft from '@/../public/icons/btn-left.svg';
import IconRight from '@/../public/icons/btn-right.svg';
import Link from 'next/link';
import { School } from './listTableStudent.type';
import clsx from 'clsx';

interface TableStudentViewProps {
  schools: School[];
  handleActionButtonRow: (id: string, action: 'delete' | 'edit') => Promise<void>;
  className?: string;
}

const ListTableStudentView: React.FC<TableStudentViewProps> = ({
  schools,
  handleActionButtonRow,
  className,
}) => {
  return (
    <div className={clsx("p-4", className)}>
      <div className="flex justify-between items-center mb-5">
        <form className="flex items-center max-w-xs w-full">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
            </div>
          </div>
        </form>
      </div>
      <div className="overflow-x-auto max-h-[60vh] overflow-y-auto sm:rounded-lg">
        {schools.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">No</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">NIS</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((el, index) => (
                <tr key={el.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 flex items-center">
                    <img
                      src={el.photo}
                      alt={el.name}
                      className="w-5 h-5 rounded-full mr-3" 
                    />
                    {el.name}
                  </td>
                  <td className="px-6 py-4">{el.email}</td>
                  <td className="px-6 py-4">{el.nis}</td>
                  <td className="px-6 py-4">
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-5">No data available</p>
        )}
      </div>
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
          <p className="w-full min-w-max">data out of {schools.length}</p>
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
    </div>
  );
};

export default ListTableStudentView;
