import LabelForm from '@/backoffice/components/label-form';
import { FileInput, Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import Flatpickr from 'react-flatpickr';
import Timer from '../../../../../../public/icons/timer.svg';
import styles from './formContent.module.css';
import clsx from 'clsx';
import DocumentUpload from '@/../public/icons/document-upload.svg';
import { IFormContent } from './formContent.type';

const FormContentView: React.FC<IFormContent> = ({
  setTime,
  time,
  setFile,
  file,
}) => {
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
      <div className="flex gap-3 items-stretch">
        <div className={clsx('flex-1 flex flex-col', styles.custom_input)}>
          <LabelForm isImportant htmlFor="upload_file">
            Upload File
          </LabelForm>
          <Label
            htmlFor="upload_file"
            className="h-11 flex items-center px-3 mt-1 border border-[#D3D7DD] rounded-lg"
          >
            <div className="flex items-center gap-2">
              <DocumentUpload />
              {file ? (
                <span className="text-sm text-[#219EBC] font-normal">
                  {file.name}
                </span>
              ) : (
                <span className="text-sm text-[#219EBC] font-normal">Choose file</span>
              )}
            </div>
            <FileInput
              onChange={(e) => {
                const file = e.target.files;
                if (file) {
                  setFile(file[0]);
                }
              }}
              id="upload_file"
              className="hidden"
            />
          </Label>
        </div>
        <div className="flex-1 flex flex-col ">
          <LabelForm isImportant htmlFor="time" className="opacity-0">
            time
          </LabelForm>
          <div className="border border-[#D3D7DD] flex items-center gap-2 px-4 rounded-lg mt-1 flex-1">
            <Timer />
            <Flatpickr
              id="time"
              className="h-full w-full !border-none"
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: 'H:i',
                time_24hr: true,
                minuteIncrement: 1,
              }}
              value={time}
              onChange={([date]) => {
                setTime(date);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContentView;
