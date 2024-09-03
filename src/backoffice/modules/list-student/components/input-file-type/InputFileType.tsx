import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FileInput as FlowbiteFileInput, Label } from 'flowbite-react';
import clsx from 'clsx';

interface FileInputProps {
  id: string;
  label: string;
  onReset?: (resetFunction: () => void) => void;
  accept?: string;
  className?: string;
}

export function FileInput({ id, label, onReset, accept, className }: FileInputProps) {
  const [fileName, setFileName] = useState('Upload file');

  useEffect(() => {
    if (onReset) {
      onReset(() => setFileName('Upload file'));
    }
  }, [onReset]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <div className={clsx("w-full", className)}> {/* Pastikan div ini memiliki lebar penuh */}
      <FlowbiteFileInput
        id={id}
        className="hidden"
        onChange={handleFileChange}
        accept={accept}
      />
      <Label htmlFor={id} className="cursor-pointer w-full"> {/* Tambahkan w-full di sini */}
        <span className="sr-only">{label}</span>
        <div className="flex items-center px-4 py-2.5 bg-white border border-gray-300 text-gray-500 text-sm rounded-lg w-full">
          <Image
            src="/img/manage-user/file.svg"
            width={20}
            height={20}
            alt="Upload"
            className="mr-2"
          />
          <span className="font-normal truncate w-full">{fileName}</span> {/* Tambahkan w-full di sini */}
        </div>
      </Label>
    </div>
  );
}
