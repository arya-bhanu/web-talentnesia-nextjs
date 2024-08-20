import { DropFile } from '@/backoffice/components/drop-files-input/dropFilesInput';
import LabelForm from '@/backoffice/components/label-form';
import React from 'react';
import { FakeData } from './detailSchoolPage.type';

interface AddSchoolViewProps {
  fakeData: FakeData;
}

const AddSchoolView: React.FC<AddSchoolViewProps> = ({ fakeData }) => {
  return (
    <div>
      {/* Cover Image */}
      <div className="mb-6 w-2/4"> 
      <img 
          src={fakeData.img} 
          alt="Cover Image" 
          className="w-full h-auto border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* School Name */}
        <div>
          <LabelForm isImportant htmlFor="inputSchoolName">
            School Name
          </LabelForm>
          <p id="inputSchoolName">
            {fakeData.schoolName}
          </p>
        </div>

        {/* PIC */}
        <div>
          <LabelForm htmlFor="inputPic">PIC</LabelForm>
          <p id="inputPic">
            {fakeData.pic}
          </p>
        </div>

        {/* Email */}
        <div>
          <LabelForm htmlFor="inputEmail">Email</LabelForm>
          <p id="inputEmail">
            {fakeData.email}
          </p>
        </div>

        {/* Nomor Telepon */}
        <div>
          <LabelForm htmlFor="inputPhone">Nomor Telepon</LabelForm>
          <p id="inputPhone">
            {fakeData.phone}
          </p>
        </div>

        {/* Alamat */}
        <div>
          <LabelForm htmlFor="inputAddress">Alamat</LabelForm>
          <p id="inputAddress">
            {fakeData.address}
          </p>
        </div>

      </div>
    </div>
  );
}

export default AddSchoolView;
