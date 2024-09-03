import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FileInput as FlowbiteFileInput, Label } from 'flowbite-react';
import { uploadFile } from '@/backoffice/modules/school/api/minioApi';
import clsx from 'clsx';

interface FileInputProps {
  id: string;
  label: string;
  onFileChange?: (file: File) => void;
  onReset?: (resetFunction: () => void) => void;
  className?: string;
  accept?: string;
  onFileUpload?: (fileUrl: string) => void;
}

export const FileInput = ({ id, label, onFileUpload, accept, className }: FileInputProps) => {
  const [fileName, setFileName] = useState('Upload file');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFileName(file.name);

      try {
        const response = await uploadFile(file, 'content-images');
        setUploadedImageUrl(response.path.thumbs);
        if (onFileUpload) {
          onFileUpload(response.path.thumbs);
        }
      } catch (error) {
        console.error('Failed to upload file:', error);
      }
    }
  };

  return (
    <div className={clsx("relative w-full", className)}>
      <FlowbiteFileInput
        id={id}
        className="hidden"
        onChange={handleFileChange}
        accept={accept}
      />
      <Label htmlFor={id} className="cursor-pointer w-full">
        <span className="sr-only">{label}</span>
        <div className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-500 text-sm rounded-lg w-full">
          <Image
            src="/img/manage-user/file.svg"
            width={20}
            height={20}
            alt="Upload"
            className="mr-2"
          />
          <span className="font-normal truncate w-full">{fileName}</span>
        </div>
      </Label>
    </div>
  );
};

