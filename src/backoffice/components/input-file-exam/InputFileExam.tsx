'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FileInput as FlowbiteFileInput, Label } from 'flowbite-react';

interface FileInputProps {
  id: string;
  label: string;
  onChange: (file: File | null) => void;
  onReset?: (resetFunction: () => void) => void;
  initialValue?: string;
  initialFilename?: string | null;
}

const allowedFileTypes = [
  'image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/webp',
  'application/pdf', 'text/plain', 'text/html', 'text/csv',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'
];

export function Component({ id, label, onChange, onReset, initialValue, initialFilename }: FileInputProps) {
  const [fileName, setFileName] = useState(initialFilename || 'Select File');
  const [hasFile, setHasFile] = useState(!!initialFilename || !!initialValue);

  useEffect(() => {
    if (initialFilename) {
      setFileName(initialFilename);
      setHasFile(true);
    } else if (initialValue) {
      const storedAnswers = JSON.parse(localStorage.getItem('taskAnswers') || '{}');
      const answer = storedAnswers.answers?.find((a: any) => a.valueText === initialValue);
      setFileName(answer?.originalFileName || initialValue.split('/').pop() || 'Select File');
      setHasFile(true);
    }
  }, [initialFilename, initialValue]);

  useEffect(() => {
    if (onReset) {
      onReset(() => {
        setFileName('Select File');
        setHasFile(false);
        onChange(null);
      });
    }
  }, [onReset, onChange]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (allowedFileTypes.includes(file.type)) {
        setFileName(file.name);
        setHasFile(true);
        onChange(file);
      } else {
        alert('File type not allowed');
      }
    }
  };

  const handleDelete = () => {
    setFileName('Select File');
    setHasFile(false);
    onChange(null);
  };

  return (
    <div className="relative">
      <FlowbiteFileInput
        id={id}
        className="hidden"
        onChange={handleFileChange}
        accept={allowedFileTypes.join(',')}
      />
      <Label htmlFor={id} className="cursor-pointer">
        <span className="sr-only">{label}</span>
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 text-gray-900 text-md rounded-lg focus:outline-none w-full dark:bg-gray-700 dark:text-white font-poppins border-b border-gray-300">
          <div className="flex items-center text-gray-500">
            <Image
              src="/img/manage-user/file.svg"
              width={25}
              height={25}
              alt="AddFile"
              className="mr-2"
            />
            <span className={`font-normal truncate ${hasFile ? 'text-[#219EBC] underline' : 'text-gray-500'}`}>
              {fileName}
            </span>
          </div>
          {hasFile && (
            <button
              type="button"
              onClick={handleDelete}
              className="focus:outline-none"
            >
              <Image
                src="/icons/red-trash.svg"
                width={24}
                height={24}
                alt="Delete"
              />
            </button>
          )}
        </div>
      </Label>
    </div>
  );
}
