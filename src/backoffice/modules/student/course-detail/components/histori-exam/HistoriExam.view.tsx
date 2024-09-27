import React from 'react';
import { ExamData } from './historiExam.type';
import SortIcon from '@/../public/icons/sort-arrow.svg'; 

const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  const optionsDate: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
  const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };

  const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
  const formattedTime = date.toLocaleTimeString('en-GB', optionsTime);

  return (
    <>
      <div className="text-sm font-medium text-gray-700">{formattedDate}</div>
      <div className="text-xs font-normal text-gray-500">{formattedTime}</div>
    </>
  );
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'On Time':
      return 'bg-green-100 text-green-600'; 
    case 'Late':
      return 'bg-yellow-100 text-yellow-600'; 
    case 'Missed':
      return 'bg-red-100 text-red-600'; 
    default:
      return '';
  }
};

interface HistoriExamViewProps {
  itemsToShow: number;
  showAll: boolean;
  onViewAll: () => void;
  onHide: () => void;
  sortedData: ExamData[];
  sortColumn: keyof ExamData;
  sortDirection: 'asc' | 'desc';
  onSort: (column: keyof ExamData) => void;
  totalItems: number;
}

const HistoriExamView: React.FC<HistoriExamViewProps> = ({
  itemsToShow,
  showAll,
  onViewAll,
  onHide,
  sortedData,
  sortColumn,
  sortDirection,
  onSort,
  totalItems
}) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-gray-800 mb-8">Histori Exam</h1>
      <table className="min-w-full divide-y divide-gray-200 mb-4">
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
              <div className="flex items-center cursor-pointer" onClick={() => onSort('no')}>
                No
                <SortIcon className={`ml-2 h-4 w-4 text-gray-400 ${sortColumn === 'no' ? (sortDirection === 'asc' ? 'rotate-180' : '') : ''}`} />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
              <div className="flex items-center cursor-pointer" onClick={() => onSort('examName')}>
                Exam Name
                <SortIcon className={`ml-2 h-4 w-4 text-gray-400 ${sortColumn === 'examName' ? (sortDirection === 'asc' ? 'rotate-180' : '') : ''}`} />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
              <div className="flex items-center cursor-pointer" onClick={() => onSort('submitDate')}>
                Submit Date
                <SortIcon className={`ml-2 h-4 w-4 text-gray-400 ${sortColumn === 'submitDate' ? (sortDirection === 'asc' ? 'rotate-180' : '') : ''}`} />
              </div>
            </th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">
              <div className="flex items-center cursor-pointer relative justify-center" onClick={() => onSort('status')}>
                Status
                <SortIcon className={`ml-2 h-4 w-4 text-gray-400 ${sortColumn === 'status' ? (sortDirection === 'asc' ? 'rotate-180' : '') : ''}`} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((exam: ExamData) => (
            <tr key={exam.no}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{exam.no}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{exam.examName}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {exam.status !== 'Missed' && formatDateTime(exam.submitDate)}
              </td>
              <td className="px-2 py-1 text-center text-xs font-medium">
                <span className={`inline-block px-2 py-1 rounded-md ${getStatusClass(exam.status)}`}>
                  {exam.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        {!showAll && itemsToShow < totalItems && (
          <button
            onClick={onViewAll}
            className="px-4 py-2 text-blue-500"
          >
            View All
          </button>
        )}
        {showAll && (
          <button
            onClick={onHide}
            className="px-4 py-2 text-blue-500"
          >
            Hide
          </button>
        )}
      </div>
    </div>
  );
};

export default HistoriExamView;
