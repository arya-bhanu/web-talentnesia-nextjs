import React from 'react'
import Search from '../../../../public/icons/iconamoon_search-bold.svg';
import { SearchTableProps } from './searchTable.type';

export const SearchTableView: React.FC<SearchTableProps> = ({ value, onChange }) => {
  return (
    <form className="flex items-center max-w-xs w-full">
    <label htmlFor="simple-search" className="sr-only font-lato">
      Search
    </label>
    <div className="relative w-full">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <Search />
      </div>
      <input
        type="text"
        id="simple-search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#FFFFFF] border border-gray-300 font-lato text-[#667085] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
        placeholder="Search ..."
        required
      />
    </div>
  </form>
  )
}