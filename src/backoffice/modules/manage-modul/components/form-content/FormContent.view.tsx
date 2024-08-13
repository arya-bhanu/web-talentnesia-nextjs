import LabelForm from '@/backoffice/components/label-form';
import { FileInput, Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import styles from './formContent.module.css';
import clsx from 'clsx';
import DocumentUpload from '@/../public/icons/document-upload.svg';
import { IFormContent } from './formContent.type';
import TimeInput from '@/backoffice/components/time-input';

const FormContentView: React.FC<IFormContent> = ({
  setTime,
  time,
  setFile,
  file,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <input
        type="text"
        className="hidden"
        name="time"
        id="time"
        defaultValue={time.toTimeString()}
        key={time.toTimeString()}
      />
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <LabelForm isImportant htmlFor="title">
            Name
          </LabelForm>
          <TextInput required id="title" name="title" className="w-full" />
        </div>
        <div className="flex-1">
          <LabelForm isImportant htmlFor="type">
            Type
          </LabelForm>
          <Select required id="type" name="type" className="w-full">
            <option value={1}>Document</option>
            <option value={2}>Video</option>
            <option value={3}>Image (png, jpg, gif)</option>
            <option value={4}>Link</option>
          </Select>
        </div>
      </div>
      <div className="flex gap-3 items-stretch">
        <div className={clsx('flex-1 flex flex-col', styles.custom_input)}>
          <LabelForm isImportant htmlFor="upload_file">
            Upload File
          </LabelForm>
          <Label
            htmlFor="upload_file"
            className="h-11 flex items-center max-w-80 overflow-hidden  px-3 mt-1 border border-[#D3D7DD] rounded-lg"
          >
            <div className="flex items-center gap-2">
              <DocumentUpload />
              {file ? (
                <span className="text-sm text-[#219EBC] font-normal w-max">
                  {file.name}
                </span>
              ) : (
                <span className="text-sm text-[#219EBC] font-normal w-max">
                  Choose file
                </span>
              )}
            </div>
            <FileInput
              required
              onChange={(e) => {
                const file = e.target.files;
                if (file) {
                  setFile(file[0]);
                }
              }}
              id="upload_file"
              className="hidden"
              name="upload_file"
            />
          </Label>
        </div>
        <TimeInput setTime={setTime} time={time} />
      </div>
    </div>
  );
};

export default FormContentView;
