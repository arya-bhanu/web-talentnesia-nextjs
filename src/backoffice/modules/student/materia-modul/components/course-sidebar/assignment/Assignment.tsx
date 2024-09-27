import { DropFile } from '@/backoffice/components/drop-files-input/dropFilesInput';
import React, { useState } from 'react';

const Assignment: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleImageChange = (url: string) => {
    setImageUrl(url);
  };

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
        <DropFile onChange={handleImageChange} />
      </div>
      <div className="flex justify-center mt-4 mb-6">
        <button className="focus:outline-none text-black bg-[#FFC862] hover:bg-[#ffb428] focus:ring-yellow-500 font-semibold rounded-[30px] text-sm px-[270px] py-3 dark:focus:ring-yellow-800">
          Submit Now
        </button>
      </div>
    </div>
  );
};

export default Assignment;
