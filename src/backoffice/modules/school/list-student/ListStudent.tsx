import { SearchTable } from '@/backoffice/components/search-table';
import TableStudent from '../add-school/components/table-student';

export const TabsListStudent = () => {
  return (
    <div>
      <h1 className="font-bold text-base text-gray-800 mb-4">List Student</h1>
      <div className="flex justify-between">
        <div className="flex items-center max-w-xs w-full">
          <div className="relative w-full">
              <SearchTable onChange={() => {}} value="" />
          </div>
        </div>
      </div>
      <TableStudent className="mt-5" />
    </div>
  );
};
