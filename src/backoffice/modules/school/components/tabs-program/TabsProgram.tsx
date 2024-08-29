import Search from '@/../public/icons/iconamoon_search-bold.svg';
import Add from '@/../public/icons/add.svg';
import ProgramCard from '../../add-school/components/program-card';

export const TabsProgram = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center max-w-xs w-full">
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search ..."
              required
            />
          </div>
        </div>
        <button
          onClick={() => true}
          className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          <Add />
          <span className="text-black"> Browse All </span>
        </button>
      </div>
      <ProgramCard className="mt-5" />
    </div>
  );
};
