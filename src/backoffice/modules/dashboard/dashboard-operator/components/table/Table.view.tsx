import React, { useState, useCallback, forwardRef } from 'react';
import IconLeft from '@/../public/icons/btn-left.svg';
import IconRight from '@/../public/icons/btn-right.svg';
import { DashboardProgressItem } from '../../dashboardOperator.type';

interface ITableViewProps {
    data: DashboardProgressItem[];
    selectedType: string;
    onTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (direction: 'prev' | 'next') => void;
    onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    itemsPerPage: number;
}

const TableView = forwardRef<HTMLDivElement, ITableViewProps>(({
    data,
    selectedType,
    onTypeChange,
    currentPage,
    totalPages,
    onPageChange,
    onItemsPerPageChange,
    itemsPerPage,
}, ref) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen(prev => !prev);
    }, []);

    const handleOptionClick = useCallback((type: string) => {
        setIsDropdownOpen(false);
        onTypeChange({
            target: { value: type }
        } as React.ChangeEvent<HTMLSelectElement>);
    }, [onTypeChange]);

    return (
        <div ref={ref} className='bg-white rounded-lg p-8'>
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold text-gray-800">Class Progress</h1>

                <div className="flex items-center gap-2 text-[#667085]">
                    <button 
                        id="dropdownDefaultButton" 
                        onClick={toggleDropdown}
                        className="text-black border bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                        type="button"
                    >
                        {selectedType || 'All Types'}
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-2">
                            <ul className="py-2 text-sm text-gray-700">
                                <li>
                                    <a 
                                        href="#" 
                                        onClick={() => handleOptionClick('')} 
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        All Types
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        onClick={() => handleOptionClick('iicp')} 
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        IICP
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        onClick={() => handleOptionClick('bootcamp')} 
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Bootcamp
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        onClick={() => handleOptionClick('course')} 
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Course
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="overflow-x-auto max-h-[60vh] overflow-y-auto shadow-md sm:rounded-lg mt-5">
                {data ? (
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-5 py-3">
                                    <div className="flex items-center">
                                        No
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Class
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Type
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Progress
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((el, index) => (
                                <tr key={el.id} className="bg-white border-b">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{el.name}</td>
                                    <td className="px-6 py-4">{el.type}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <div className="w-full bg-gray-200 rounded-full h-2.5 flex-grow">
                                                    <div
                                                        className="bg-[#219EBC] h-2.5 rounded-full"
                                                        style={{ width: `${el.progress || 0}%` }}
                                                    ></div>
                                                </div>
                                                <span className="ml-2 text-sm text-gray-900">{el.progress || 0}% </span>
                                                <span className="ml-1.5 text-sm text-gray-900"> Selesai</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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
                        value={itemsPerPage}
                        onChange={onItemsPerPageChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                    <label htmlFor="" className="block">
                        data out of 100
                    </label>
                </div>

                <div className="flex items-center gap-2 text-[#667085]">
                    <button 
                        onClick={() => onPageChange('prev')}
                        disabled={currentPage === 1}
                        className="bg-white border border-gray-300 p-2 rounded-lg disabled:opacity-50"
                    >
                        <IconLeft />
                    </button>
                    <span>{currentPage} of {totalPages}</span>
                    <button 
                        onClick={() => onPageChange('next')}
                        disabled={currentPage === totalPages}
                        className="bg-white border border-gray-300 p-2 rounded-lg disabled:opacity-50"
                    >
                        <IconRight />
                    </button>
                </div>
            </div>
        </div>
    );
});

export default TableView;
