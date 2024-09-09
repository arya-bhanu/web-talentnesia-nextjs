import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import AddDocumentEditorComponent from './components/Certificatedocs';
import { AddCertificateViewProps } from './addCertificate.type';
import { FileInputComponent } from '@/backoffice/components/file-input/FileInput';
import { InputDropdown } from '@/backoffice/components/input-dropdown';

export const AddCertificateView: React.FC<AddCertificateViewProps> = ({
  formData,
  hasError,
  handleInputChange,
  handleSave, }) => {
  const router = useRouter();
  const documentEditorRef = useRef<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (documentEditorRef.current) {
      const fileContent = documentEditorRef.current.getDocumentContent();
    }
    handleSave();
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
          required
          className={`block w-full p-2 border ${hasError && !formData.name ? 'border-red-500' : 'border-gray-300'
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
            onFileChange={(file) => handleInputChange('file', file.name)}
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

        {hasError && !formData.active && (
          <p className="text-red-500 text-xs mt-1">Status is required.</p>
        )}
      </div>
      <div className="py-2">
        <AddDocumentEditorComponent />
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
          type="submit"
          className="bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-lg px-5 py-2.5 text-center"
        >
          Save
        </button>
      </div>
    </form>
  );
};
export default AddCertificateView;
