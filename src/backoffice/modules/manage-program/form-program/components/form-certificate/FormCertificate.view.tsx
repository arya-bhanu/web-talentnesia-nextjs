import LabelForm from '@/backoffice/components/label-form';
import { Select } from 'flowbite-react';
import Image from 'next/image';
import React from 'react';

const FormCertificateView = () => {
  return (
    <form className='pb-5'>
      <div>
        <LabelForm isImportant htmlFor="select_template">
          Select Template
        </LabelForm>
        <Select id="select_template" name="select_template">
          <option value="1">Template UI/UX Designer 1</option>
          <option value="2">Template UI/UX Designer 1</option>
          <option value="3">Template UI/UX Designer 1</option>
        </Select>
      </div>
      <div className='mt-8'>
        <Image
          alt="image certificate"
          src={'/images/manage-program/certificate.png'}
          width={800}
          height={600}
          className="w-full object-contain"
        />
      </div>
    </form>
  );
};

export default FormCertificateView;
