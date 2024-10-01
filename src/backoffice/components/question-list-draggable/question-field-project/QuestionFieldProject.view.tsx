import React from 'react';
import CloudUpload from '@/../public/icons/cloud_upload.svg';
import {
  FaFilePdf,
  FaFileImage,
  FaFileWord,
  FaFilePowerpoint,
  FaFileArchive,
  FaFile,
} from 'react-icons/fa';

interface QuestionFieldProjectViewProps {
  body: string;
  onFileUpload: (file: File) => void;
  fileName: string;
}

const QuestionFieldProjectView: React.FC<QuestionFieldProjectViewProps> = ({
  body,
  onFileUpload,
  fileName,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const getFileExtension = (url: string) => {
    return url.split('.').pop()?.toLowerCase() || '';
  };

  const getFileIcon = (extension: string) => {
    switch (extension) {
      case 'pdf':
        return <FaFilePdf size={24} />;
      case 'png':
      case 'jpg':
      case 'jpeg':
        return <FaFileImage size={24} />;
      case 'doc':
      case 'docx':
        return <FaFileWord size={24} />;
      case 'ppt':
      case 'pptx':
        return <FaFilePowerpoint size={24} />;
      case 'zip':
        return <FaFileArchive size={24} />;
      default:
        return <FaFile size={24} />;
    }
  };

  const fileExtension = getFileExtension(body);

  return (
    <div className="flex w-full items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className="relative flex h-fit py-10 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {body ? (
          <div className="flex flex-col items-center justify-center">
            {getFileIcon(fileExtension)}
            <p className="mt-2 text-sm font-normal text-gray-500 dark:text-gray-400 font-poppins">
              Uploaded file: {fileName}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-poppins">
              Click or drag to replace the file
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 ">
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
