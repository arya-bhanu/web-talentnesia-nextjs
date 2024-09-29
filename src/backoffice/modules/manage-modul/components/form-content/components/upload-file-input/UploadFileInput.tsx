import React, { useState, useEffect } from 'react';
import { uploadFile } from '@/backoffice/modules/school/api/minioApi';
import DocumentUpload from '@/../public/icons/document-upload.svg';

interface UploadFileInputProps {
  onChange: (fileUrl: string, fileName: string, fileType: number) => void;
  initialFileName: string;
  initialFileUrl: string;
  fileType?: number;
}

export const UploadFileInput: React.FC<UploadFileInputProps> = ({ onChange, initialFileName, initialFileUrl, fileType }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (initialFileName !== undefined || initialFileUrl !== undefined) {
      setFileUrl(initialFileUrl);
      setFileName(initialFileName);
      setIsLoading(false);
    }
  }, [initialFileName, initialFileUrl]);

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
        setFileUrl(fileUrl);
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
      <input
        type="hidden"
        name="fileName"
        value={fileName || ''}
      />
      <input
        type="hidden"
        name="fileUrl"
        value={fileUrl || ''}
      />  
    </div>
  );
};
