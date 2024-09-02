import React, { useState, Suspense, lazy } from 'react';

const Task = lazy(() => import('../task')); 
const Exam: React.FC = () => {
  const [showTask, setShowTask] = useState(false);

  const handleStartExam = () => {
    setShowTask(true);
  };

  return (
    <div>
      {showTask ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Task />
        </Suspense>
      ) : (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Exam Details</h1>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500">Deadline Pengerjaan</p>
              <p className="font-semibold">Kamis, 19 Juni 2024</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tipe Soal</p>
              <p className="font-semibold">Pilihan Ganda</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold">Belum Dikerjakan</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nilai</p>
              <p className="font-semibold">-</p>
            </div>
          </div>
          <div className="flex justify-center mt-16 mb-6">
            <button
              className="focus:outline-none text-black bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-bold rounded-[30px] text-sm px-44 py-3 dark:focus:ring-yellow-900"
              onClick={handleStartExam}
            >
              Start Exam
            </button>
          </div>
          <div className="flex justify-between px-8 py-4 mt-10">
            <button className="px-8 py-2 rounded-full border border-[#FFC862] text-gray-700">Previous</button>
            <button className="px-14 py-2 rounded-full bg-[#FFC862] hover:bg-[#ffb428] text-gray-700">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;
