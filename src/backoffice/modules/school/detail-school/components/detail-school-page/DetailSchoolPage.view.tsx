import React from 'react';
import LabelForm from '@/backoffice/components/label-form';
import { SchoolData } from './detailSchoolPage.type';
import Image from 'next/image';

interface DetailSchoolPageViewProps {
  schoolData: SchoolData;
  fullImageUrl: string;
}

const DetailSchoolPageView: React.FC<DetailSchoolPageViewProps> = ({ schoolData, fullImageUrl }) => {
  return (
    <div className="container mx-auto p-6">
      <div className="items-start">
        <div className="w-[15%] gap-y-4">
          <Image 
            src={fullImageUrl || '/placeholder-image.png'} 
            alt="Unavailable" 
            width={400}
            height={250}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 w-full font-lato gap-y-4 mt-4">
          <div className="space-y-4">
            <LabelForm className="font-semibold text-lg" htmlFor="inputSchoolName">
              School Name
            </LabelForm>
            <p id="inputSchoolName" className="text-base">{schoolData.name}</p>
          </div>

          <div className="space-y-4">
            <LabelForm className="font-semibold text-lg" htmlFor="inputPic">PIC</LabelForm>
            <p id="inputPic" className="text-base">{schoolData.pic}</p>
          </div>

          <div className="space-y-4">
            <LabelForm className="font-semibold text-lg" htmlFor="inputEmail">Email</LabelForm>
            <p id="inputEmail" className="text-base">{schoolData.email}</p>
          </div>

          <div className="space-y-4">
            <LabelForm className="font-semibold text-lg" htmlFor="inputPhone">Telephone</LabelForm>
            <p id="inputPhone" className="text-base">{schoolData.phone}</p>
          </div>

          <div className="space-y-4 col-span-2">
            <LabelForm className="font-semibold text-lg" htmlFor="inputAddress">Address</LabelForm>
            <p id="inputAddress" className="text-base">{schoolData.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSchoolPageView;
