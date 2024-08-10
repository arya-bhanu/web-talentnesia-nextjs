'use client';
import React, { useState } from 'react';
import Search from '../../../../public/icons/iconamoon_search-bold.svg';
import Add from '../../../../public/icons/add.svg';
import IconLeft from '../../../../public/icons/btn-left.svg';
import IconRight from '../../../../public/icons/btn-right.svg';
import Link from 'next/link';
import { IAcademicLevelView } from './academicLevel.type';
import Popover from '@/backoffice/components/popover';
import AddAcademicTitleView from '@/backoffice/components/add-academic-title/AddAcademicTitle.view';

const AcademicLevelView: React.FC<IAcademicLevelView> = ({
  data,
  handleActionButtonRow,
  setOpenPopoverIndex,
  openPopoverIndex,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <form className="flex items-center max-w-xs w-full">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search />
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search ..."
              required
            />
          </div>
        </form>
        <button
        onClick={openPopup}
        className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
      >
        <Add />
        <span className="text-black"> Add Academic Level</span>
      </button>

      {isPopupOpen && <AddAcademicTitleView />}
    </div>
      <div className="overflow-x-auto max-h-[60vh] overflow-y-auto shadow-md sm:rounded-lg mt-5">
        {data ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">   
                    Code
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Level Name
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div>Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((el, index) => {
                return (
                  <tr
                    key={el.code}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{el.name}</td>
                    <Popover
                      handleActionButtonRow={handleActionButtonRow}
                      id={el.code}
                      index={index}
                      openPopoverIndex={openPopoverIndex}
                      setOpenPopoverIndex={setOpenPopoverIndex}
                    />
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
      <div className="flex justify-between items-center w-full mt-5">
        <div className="flex items-center gap-2 text-[#667085]">
          <label htmlFor="" className="block">
            Showing
          </label>
          <select
            id="pagination"
            className="bg-gray-50 border max-w-[5rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultChecked value={5}>
              5
            </option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <p className="w-full min-w-max">data out of 100</p>
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

export default AcademicLevelView;
