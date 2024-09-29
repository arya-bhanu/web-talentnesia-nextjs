import React, { useState, useEffect } from 'react';
import { uploadFile } from '@/backoffice/modules/school/api/minioApi';
import DocumentUpload from '@/../public/icons/document-upload.svg';

interface UploadFileInputProps {
  onChange: (fileUrl: string, fileName: string, fileType: number) => void;
  initialFileName: string;
  fileType?: number;
}

export const UploadFileInput: React.FC<UploadFileInputProps> = ({ onChange, initialFileName, fileType }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (initialFileName) {
      setFileName(initialFileName);
      setIsLoading(false);
    }
  }, [initialFileName]);

  console.log('fileName', fileName);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const response = await uploadFile(file, 'content');
        let fileUrl: string;
        if (typeof response.path === 'string') {
          fileUrl = response.path;
        } else if (typeof response.path === 'object' && 'thumbs' in response.path) {
          fileUrl = response.path.thumbs;
        } else {
          throw new Error('Unexpected response format');
        }
        setFileName(file.name);
        onChange(fileUrl, file.name, fileType || 1);
      } catch (error) {
        console.error('Failed to upload file:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return (
    <div className="flex items-center">
      <label htmlFor="upload_file" className="flex items-center cursor-pointer">
        <DocumentUpload />
        <span className="ml-2 text-sm font-normal">
          {isLoading ? 'Loading...' : (fileName || 'Choose file')}
        </span>
      </label>
      <input
        type="file"
        id="upload_file"
        name='upload_file'
        className="hidden"
        onChange={handleFileChange}
        accept={fileType === 1 ? ".pdf,.doc,.docx" : "image/*"}
        disabled={isLoading}
      />
    </div>
  );
};
