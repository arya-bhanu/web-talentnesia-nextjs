'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FileInput as FlowbiteFileInput, Label } from 'flowbite-react';
import { useStatusModalStore } from '@/lib/store';

interface FileInputProps {
  id: string;
  label: string;
  onChange: (file: File | null) => void;
  onReset?: (resetFunction: () => void) => void;
  initialValue?: string;
  initialFilename?: string | null;
}

export function Component({ id, label, onChange, onReset, initialValue, initialFilename }: FileInputProps) {
  const [fileName, setFileName] = useState(initialFilename || 'Select Image jpg, jpeg, png');
  const openModal = useStatusModalStore((state) => state.openModal);

  useEffect(() => {
    if (initialFilename) {
      setFileName(initialFilename);
    } else if (initialValue) {
      setFileName(initialValue.split('/').pop() || 'Select Image jpg, jpeg, png');
    }
  }, [initialFilename, initialValue]);

  useEffect(() => {
    if (onReset) {
      onReset(() => {
        setFileName('Select Image jpg, jpeg, png');
        onChange(null);
      });
    }
  }, [onReset, onChange]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.startsWith('image/')) {
        setFileName(file.name);
        onChange(file);
      } else {
        openModal({
          status: 'error',
          message: 'Please select an image file.',
          timeOut: 3000
        });
        event.target.value = '';
      }
    }
  };

  return (
    <div className="relative">
      <FlowbiteFileInput
        id={id}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      <Label htmlFor={id} className="cursor-pointer">
        <span className="sr-only">{label}</span>
        <div className="px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-poppins">
          <div className="flex items-center text-gray-500">
            <Image
              src="/img/manage-user/file.svg"
              width={25}
              height={25}
              alt="AddFile"
              className="mr-2"
            />
            <span className="text-gray-500 font-normal truncate">
              {fileName}
            </span>
          </div>
        </div>
      </Label>
    </div>
  );
}
