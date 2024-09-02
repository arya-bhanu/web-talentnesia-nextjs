import { DropFile } from '@/backoffice/components/drop-files-input/dropFilesInput';
import React from 'react';

const Assignment: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Assignment Homework Ethical Design
      </h1>
      <hr className="my-4 border-gray-300 mb-6" />
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Format Pengumpulan</p>
          <p className="font-base text-gray-900">
            File presentasi dalam bentuk PDF. Link Figma dilampirkan dalam file.
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Deadline Pengumpulan</p>
          <p className="font-base text-gray-900">Kamis, 19 Oktober 2023</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Maksimal Ukuran File</p>
          <p className="font-base text-gray-900">20 MB</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Waktu</p>
          <p className="font-base text-gray-900">23.59 WIB</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">File Soal Pendukung</p>
          <p className="font-base text-gray-900">23.59 WIB</p>
        </div>
      </div>
      <div>
        <DropFile />
      </div>
      <div className="flex justify-center mt-4 mb-6">
        <button className="focus:outline-none text-black bg-[#FFC862] hover:bg-[#ffb428] focus:ring-yellow-500 font-semibold rounded-[30px] text-sm px-[270px] py-3 dark:focus:ring-yellow-800">
          Submit Now
        </button>
      </div>
      <div className="flex justify-between py-4 mt-6">
        <button className="px-8 py-2 rounded-full border border-[#FFC862] text-gray-700 mr-8">
          Previous
        </button>
        <button className="px-14 py-2 rounded-full bg-[#FFC862] hover:bg-[#ffb428] text-gray-700 ml-8">
          Next
        </button>
      </div>
    </div>
  );
};

export default Assignment;
