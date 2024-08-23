import { DropFile } from '@/backoffice/components/drop-files-input/dropFilesInput';
import LabelForm from '@/backoffice/components/label-form';
import { Button, TextInput } from 'flowbite-react';
import React from 'react';

const AddSchoolView: React.FC = () => {
  return (
    <div>
      {/* Cover Image */}
      <div className="mb-6 w-2/4"> 
        <DropFile /> 
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Program Name */}
        <div>
          <LabelForm isImportant htmlFor="inputSchoolName">
            School Name
          </LabelForm>
          <TextInput
            id="inputSchoolName"
            placeholder="Input School Name"
            required
          />
        </div>

        {/* PIC */}
        <div>
          <LabelForm htmlFor="inputPic">PIC</LabelForm>
          <TextInput
            id="inputPic"
            placeholder="Input Person in Charge"
            required
          />
        </div>

        {/* Email */}
        <div>
          <LabelForm htmlFor="inputEmail">Email</LabelForm>
          <TextInput
            id="inputEmail"
            placeholder="Input Email"
            type="email"
            required
          />
        </div>

        {/* Nomor Telepon */}
        <div>
          <LabelForm htmlFor="inputPhone">Nomor Telepon</LabelForm>
          <TextInput
            id="inputPhone"
            placeholder="Input Phone Number"
            type="tel"
            required
          />
        </div>

        {/* Alamat */}
        <div>
          <LabelForm htmlFor="inputAddress">Alamat</LabelForm>
          <TextInput
            id="inputAddress"
            placeholder="Input Address"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default AddSchoolView;