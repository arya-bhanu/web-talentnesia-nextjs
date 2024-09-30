import React from 'react';
import { TextInput, Select, Label } from 'flowbite-react';
import LabelForm from '@/backoffice/components/label-form';
import TimeInput from '@/backoffice/components/time-input';
import { IFormContent } from './formContent.type';
import { APIContentChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import { UploadFileInput } from '@/backoffice/modules/manage-modul/components/form-content/components/upload-file-input/UploadFileInput';

const FormContentView: React.FC<
  IFormContent & { populatedData?: APIContentChapter; }
> = ({
  time,
  setTime,
  fileUrl,
  fileName,
  fileType,
  setFileType,
  handleFileChange,
  populatedData,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <input
        type="hidden"
        name="time"
        value={time.toTimeString().substring(0, 5)}
      />

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <LabelForm isImportant htmlFor="title">
            Name
          </LabelForm>
          <TextInput
            required
            id="title"
            name="title"
            placeholder="Enter content name"
            defaultValue={populatedData?.title}
          />
        </div>
        <div className="flex-1">
          <LabelForm isImportant htmlFor="type">
            Type
          </LabelForm>
          <Select
            id="type"
            name="type"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            required
          >
            <option value="1">Document</option>
            <option value="2">Video</option>
            <option value="3">Image (png, jpg, gif)</option>
            {/* <option value="4">Link</option> */}
          </Select>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <LabelForm isImportant htmlFor="upload_file">
            Upload File
          </LabelForm>
          <Label
            htmlFor="upload_file"
            className="h-[2.65rem] flex items-center px-3 border border-gray-300 rounded-lg cursor-pointer"
          >
            <UploadFileInput
              onChange={handleFileChange}
              initialFileName={fileName}
              initialFileUrl={fileUrl}
              fileType={parseInt(fileType)}
            />
          </Label>
        </div>
        <TimeInput setTime={setTime} time={time} />
      </div>
    </div>
  );
};

export default FormContentView;
