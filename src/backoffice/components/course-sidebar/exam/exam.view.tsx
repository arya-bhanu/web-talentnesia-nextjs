import React from 'react';

const Exam: React.FC = () => {
  return (
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
      <button className="w-full focus:outline-none text-black text-fo bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-bold rounded-[30px] text-sm px-5 py-3 me-2 dark:focus:ring-yellow-900 mt-[75px]">
        Start Exam
      </button>
    </div>
  );
};

export default Exam;
