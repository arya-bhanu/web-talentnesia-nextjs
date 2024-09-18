import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddDocumentEditorComponent from './components/Certificatedocs';
import { AddCertificateViewProps } from './addCertificate.type';
import { FileInputComponent } from '@/backoffice/components/file-input/FileInput';
import { InputDropdown } from '@/backoffice/components/input-dropdown';
import { certificateAPI } from '@/backoffice/modules/master-data/certificate/api/certificateApi';

export const AddCertificateView: React.FC<AddCertificateViewProps> = ({
  formData,
  hasError,
  handleInputChange,
  handleSave: propHandleSave,
}) => {
  const router = useRouter();
  const [documentId, setDocumentId] = useState<string | undefined>();
  const [documentUrl, setDocumentUrl] = useState<string | undefined>();
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      await certificateAPI.add({
        name: formData.name,
        file: documentUrl || '',
      });
      router.push('/backoffice/master-data/certificate/');
    } catch (error) {
      console.error('Failed to add certificate', error);
    }
  };

  const fetchData = useCallback(async () => {
    const certificates = await certificateAPI.fetch();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);
    const fileInput = document.getElementById('certificate-file') as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('https://api-talentnesia.skwn.dev/api/v1/certificate/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            console.log('Received from API:', result.data);
            setDocumentId(result.data.id);
            setDocumentUrl(result.data.url);
            setIsFileUploaded(true);
          } else {
            setUploadError('Upload successful, but received unexpected data structure');
            console.error('Unexpected API response structure:', result);
          }
        } else {
          const errorText = await response.text();
          setUploadError(`File upload failed: ${response.status} ${response.statusText}. ${errorText}`);
          console.error('File upload failed:', response.status, response.statusText, errorText);
        }
      } catch (error) {
        setUploadError(`Error uploading file: ${error instanceof Error ? error.message : String(error)}`);
        console.error('Error uploading file:', error);
      }
    } else {
      setUploadError('No file selected');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="py-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Certificate name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Input Certificate name"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required className={`block w-full p-2 border ${hasError && !formData.name ? 'border-red-500' : 'border-gray-300'
            } rounded-lg`}
        />
        {hasError && !formData.name && (
          <p className="text-red-500 text-xs mt-1">
            Certificate name is required.
          </p>
        )}
      </div>

      <div className="py-2 flex grid-cols-2 w-full">
        <div className='w-full'>
          <FileInputComponent
            id="certificate-file"
            label="Upload Certificate File"
            onFileChange={(file) => {
              handleInputChange('file', file.name);
              setIsFileUploaded(true);
            }}
            allowedTypes={['application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
          />
        </div>
        <div className='pl-2'>
          <button
            type="submit"
            className="bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-lg px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Status<span className="text-red-500">*</span>
        </label>
        <InputDropdown
          value={formData.active === 1 ? 'Active' : 'Non Active'}
          onChange={(value) => handleInputChange('active', value)}
          options={['Active', 'Non Active']}
        />

        {hasError && (formData.active === undefined || formData.active === null) && (
          <p className="text-red-500 text-xs mt-1">Status is required.</p>
        )}

      </div>
      <div className="py-5">
        <AddDocumentEditorComponent id={documentId} url={documentUrl} />
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="button"
          className="text-red-600 border border-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200 rounded-lg px-5 py-2.5 text-center mr-2"
          onClick={() => router.push('/backoffice/master-data/certificate/')}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={propHandleSave}
          className="bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-lg px-5 py-2.5 text-center"
        >
          Save
        </button>
      </div>
    </form>
  );
}; export default AddCertificateView;

