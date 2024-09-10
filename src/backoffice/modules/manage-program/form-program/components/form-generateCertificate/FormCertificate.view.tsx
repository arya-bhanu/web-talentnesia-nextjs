import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import LabelForm from '@/backoffice/components/label-form';
import { Select, TextInput } from 'flowbite-react';


const FormCertificateView = () => {
  const [selectedTemplate, setSelectedTemplate] = useState({ file: "", id: "" });
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
          Certificate Number
        </LabelForm>
        <TextInput
                id="modul"
                name="modul"
                type="number"
                placeholder="Certificate Number"
                required
              />
      </div>
    </form>
  );
};
export default FormCertificateView;