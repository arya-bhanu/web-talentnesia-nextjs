'use client';

import React from 'react';
import Image from 'next/image';
import { DetailStudentProps } from '../listStudent.type';

export const DetailStudent: React.FC<{ student: DetailStudentProps }> = ({
  student,
}) => {
  return (
    <div className="space-y-8 items-center">
      <div className="bg-[#FFFFFF] rounded-lg items-center">
        <div className="flex flex-col md:flex-row items-center p-4">
          <Image
            src={student.photo || ''}
            alt={student.name}
            width={100}
            height={100}
            className="rounded-full border-2 border-gray-300"
          />
          <div className="mt-4 md:mt-0 md:ml-6 space-y-2">
            <h1 className="text-2xl font-semibold">{student.name}</h1>
            <p className="text-gray-500">{student.school}</p>
          </div>
          <div className="ml-auto mt-4 md:mt-0 space-y-2 text-gray-500 border-l-2 pl-8 mr-6">
            <div className="flex flex-1 gap-2">
              <Image
                src="/icons/user-fill.svg"
                alt="NIK"
                width={20}
                height={20}
              />
              <p>NIK {student.nik}</p>
            </div>
            <div className="flex flex-1 gap-2">
              <Image
                src="/icons/phone-fill.svg"
                alt="NIK"
                width={20}
                height={20}
              />
              <p>+62 {student.noHp}</p>
            </div>
            <div className="flex flex-1 gap-2">
              <Image
                src="/icons/email-fill.svg"
                alt="NIK"
                width={20}
                height={20}
              />
              <p>{student.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF] p-6 rounded-md">
        <h2 className="text-xl font-semibold mb-6">Profil Student</h2>

        <Section title="A. Information Detail">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-24">
            <InfoItem label="Name" value={student.name} />
            <InfoItem label="NIK/Identity Number" value={student.nik} />
            <InfoItem
              label="Foto KTP"
              value={
                <a href={student.ktpPhoto} className="text-[#2166B2] underline">
                  FotoKTP.jpg
                </a>
              }
            />
            <InfoItem label="Place of Birth" value={student.placeOfBirth} />
            <InfoItem label="Date of Birth" value={student.dateOfBirth} />
            <InfoItem label="Religion" value={student.religion} />
            <InfoItem label="Gender" value={student.gender} />
          </div>
        </Section>

        <Section title="B. Contact Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
            <InfoItem label="Phone Number" value={`+62 ${student.noHp}`} />
            <InfoItem label="Email" value={student.email} />
          </div>
        </Section>

        <Section title="C. Address">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
            <InfoItem label="Province" value={student.province} />
            <InfoItem label="City/District" value={student.city} />
            <InfoItem label="Sub District" value={student.subDistrict} />
            <InfoItem label="Zip Code" value={student.zipCode} />
            <InfoItem label="Address (KTP)" value={student.addressKTP} />
            <InfoItem
              label="Address (Domicile)"
              value={student.addressDomicile}
            />
          </div>
        </Section>

        <Section title='D. Last Education'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
            <InfoItem label="Institution Name" value={student.school} />
            <InfoItem label='Academic Level' value={student.academicLevel} />
            <InfoItem label="Start From" value={student.startFrom + ' - ' + student.endDate} />
            <InfoItem label="Institution Address" value={student.addressKTP} />
          </div>
        </Section>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mb-6 space-y-4">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="border-b"></div>
    <div className="p-4 rounded-md">{children}</div>
  </div>
);

const InfoItem: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between py-2">
    <span className="text-gray-500 w-1/3">{label}</span>
    <span className="text-gray-500 text-center w-[25%]">:</span>
    <span className="font-medium text-gray-800 flex-1">{value}</span>
  </div>
);
