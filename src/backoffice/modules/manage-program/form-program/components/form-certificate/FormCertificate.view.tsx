import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import LabelForm from '@/backoffice/components/label-form';
import { Select } from 'flowbite-react';

const DocumentEditor = dynamic(
  () => import('./components/Certificatedocs'),
  { ssr: false }
);

const FormCertificateView = () => {
  const [selectedTemplate, setSelectedTemplate] = useState({ file: "1725847018092023700_WHcgryc0mlIyvj9Z", id: "1725847018092023700_WHcgryc0mlIyvj9Z" });
  const [templates, setTemplates] = useState<Array<{ id: string; name: string; file: string }>>([]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('https://api-talentnesia.skwn.dev/api/v1/certificate');
      const data = await response.json();
      setTemplates(data.data.items);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleTemplateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const template = templates.find(t => t.id === selectedId);
    if (template) {
      setSelectedTemplate(template);
    }
  }; 

  return (
    <form className='pb-5'>
      <div>
        <LabelForm isImportant htmlFor="select_template">
          Select Template
        </LabelForm>
        <Select 
          id="select_template" 
          name="select_template" 
          onChange={handleTemplateChange} 
          value={selectedTemplate.id}
        >
          <option value="" disabled>Select a template</option>
          {templates.map(template => (
            <option key={template.id} value={template.id}>{template.file}</option>
          ))}
        </Select>
      </div>
      <div className="mt-4">
        <DocumentEditor selectedTemplate={selectedTemplate}/>
      </div>
    </form>
  );
};
export default FormCertificateView;