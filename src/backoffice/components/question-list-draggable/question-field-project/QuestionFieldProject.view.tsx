import React, { useState, useCallback } from 'react';
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
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  }, [onFileUpload]);

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
        return <FaFilePdf size={40} />;
      case 'png':
      case 'jpg':
      case 'jpeg':
        return <FaFileImage size={40} />;
      case 'doc':
      case 'docx':
        return <FaFileWord size={40} />;
      case 'ppt':
      case 'pptx':
        return <FaFilePowerpoint size={40} />;
      case 'zip':
        return <FaFileArchive size={40} />;
      default:
        return <FaFile size={40} />;  
    }
  };

  const fileExtension = getFileExtension(body);

  return (
    <div className="flex w-full items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className={`relative flex h-[200px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
        } hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
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
