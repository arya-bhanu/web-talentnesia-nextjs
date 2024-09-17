import React, { useState } from 'react';

import { TextInput } from 'flowbite-react';
import LabelForm from '@/backoffice/components/label-form';
import Legenda from './components/Legenda/Legenda';
import { DocumentEditor } from '@onlyoffice/document-editor-react';
import DocumentEditorComponent from './components/Certificatedocs';

interface FormCertificateViewProps {
  generateCertificate: (certificateNumber: string) => Promise<void>;
  certificateData: any;
}
const FormCertificateView: React.FC<FormCertificateViewProps> = ({ generateCertificate, certificateData }) => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertificateNumber(e.target.value);
    generateCertificate(e.target.value);
  };

  return (
    <div className='flex'>
      <div className='w-3/4 pr-4'>
        <form className='pb-5'>
          <div>
            <LabelForm isImportant htmlFor="certificate_number">
              Certificate Number
            </LabelForm>
            <TextInput
              id="certificate_number"
              name="certificate_number"
              type="text"
              placeholder="Certificate Number"
              value={certificateNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          {certificateData && (
            <div className="mt-4">
              <h3>Generated Certificate Data:</h3>
              <pre>{JSON.stringify(certificateData, null, 2)}</pre>
            </div>
          )}
        </form>
        <div>
          <DocumentEditorComponent selectedTemplate={{ file: '', id: '' }} />
        </div>
      </div>
      <div className="w-1/4 border-l border-gray-300 overflow-y-auto">
        <Legenda />
      </div>
    </div>
  );
};

export default FormCertificateView;