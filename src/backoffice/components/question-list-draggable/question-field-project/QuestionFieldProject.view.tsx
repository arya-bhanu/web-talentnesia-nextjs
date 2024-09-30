import { FileInput } from 'flowbite-react/components/FileInput';
import { Label } from 'flowbite-react/components/Label';
import React from 'react';
import CloudUpload from '@/../public/icons/cloud_upload.svg';

const QuestionFieldProjectView = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full  flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <CloudUpload />
          <p className="text-sm text-gray-500 dark:text-gray-400 font-poppins">
            <span className="font-normal">Drag file here</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-poppins">
            (zip, pdf, docx, ppt, sdoc, png, jpeg/jpg)
          </p>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400 font-poppins">
            OR
          </p>
          <label
            htmlFor="dropzone-file"
            className="px-6 py-2.5 cursor-pointer font-poppins text-sm font-semibold border-2 rounded-lg border-[#219EBC] text-[#219EBC]"
          >
            Browse Files
          </label>
        </div>
        <FileInput id="dropzone-file" className="hidden" />
      </Label>
    </div>
  );
};

export default QuestionFieldProjectView;
