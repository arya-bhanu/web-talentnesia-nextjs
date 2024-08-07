import LabelForm from '@/backoffice/components/label-form';
import { FileInput, Select, TextInput } from 'flowbite-react';
import React from 'react';

const FormContentView = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <LabelForm isImportant htmlFor="name">
            Name
          </LabelForm>
          <TextInput id="name" name="name" className="w-full" />
        </div>
        <div className="flex-1">
          <LabelForm isImportant htmlFor="type">
            Type
          </LabelForm>
          <Select id="type" name="type" className="w-full">
            <option>Document</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>
      </div>
      <div className="flex items-end gap-3">
        <div className="flex-1 ">
          <LabelForm isImportant htmlFor="upload_file">
            Upload File
          </LabelForm>
          <FileInput id="upload_file" name="upload_file" className="w-full" />
        </div>
        <div className="flex-1 ">
          <TextInput className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default FormContentView;
