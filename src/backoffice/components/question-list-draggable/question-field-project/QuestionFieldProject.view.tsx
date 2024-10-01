import React from 'react';
import CloudUpload from '@/../public/icons/cloud_upload.svg';

interface QuestionFieldProjectViewProps {
  body: string;
  onFileUpload: (file: File) => void;
}

const QuestionFieldProjectView: React.FC<QuestionFieldProjectViewProps> = ({ body, onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className="relative flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {body ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400 font-poppins">
              Uploaded file: {body}
            </p>
          </div>
        ) : (
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
        )}
        <input 
          id="dropzone-file" 
          type="file" 
          className="hidden" 
          onChange={handleFileChange}
          accept=".zip,.pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg"
        />
      </label>
    </div>
  );
};

export default QuestionFieldProjectView;