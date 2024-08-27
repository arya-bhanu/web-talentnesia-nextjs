'use client';
import React, { FormEvent, useState, useEffect } from 'react';
import DetailSchoolView from './DetailSchool.view';
import { SchoolAPI } from '../api/schoolApi';
import { getImageUrl } from '../api/minioApi';
import { SchoolData } from './detailSchool.type';

const columns = [
  { key: 'no', val: 'No' },
  { key: 'name', val: 'Name' },
  { key: 'periode', val: 'Periode' },
];

const rows = [
  {
    name: () => (
      <div className="flex items-center gap-1.5">
        <span>Kelas A Tefa SMK</span>
      </div>
    ),
    periode: 'Januari 2024 - Juni 2024',
    id: 1,
  },
  {
    name: () => (
      <div className="flex items-center gap-1.5">
        <span>Kelas A Tefa SMK</span>
      </div>
    ),
    periode: 'Januari 2024 - Juni 2024',
    id: 2,
  },
];

const mappedNumberRows = rows.map((el, index) => {
  return { ...el, no: index + 1 };
});

interface DetailSchoolProps {
  schoolId: string;
}

const DetailSchool: React.FC<DetailSchoolProps> = ({ schoolId }) => {
  const [status, setStatus] = useState('On Going');
  const [selectedStudents, setSelectedStudents] = useState(['']);
  const [activeAccordion, setActiveAccordion] = useState(-1);
  const [openModal, setOpenModal] = useState(false);
  const [openModalModul, setOpenModalModul] = useState(false);
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [fullImageUrl, setFullImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const data = await SchoolAPI.getById(schoolId);
        setSchoolData(data);

        if (data.imageUrl) {
          const imageUrl = await getImageUrl(data.imageUrl);
          setFullImageUrl(imageUrl);
        }
      } catch (error) {
        console.error('Failed to fetch school data:', error);
      }
    };

    fetchSchoolData();
  }, [schoolId]);

  const handleSubmitSelectedModul = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <DetailSchoolView
      handleSubmitSelectedModul={handleSubmitSelectedModul}
      setStatus={setStatus}
      status={status}
      selected={selectedStudents}
      setSelected={setSelectedStudents}
      open={openModal}
      setOpen={setOpenModal}
      columns={columns}
      rows={mappedNumberRows}
      activeAccordion={activeAccordion}
      setActiveAccordion={setActiveAccordion}
      openModalModul={openModalModul}
      setOpenModalModul={setOpenModalModul}
      schoolId={schoolId}
      schoolData={schoolData}
      fullImageUrl={fullImageUrl}
    />
  );
};

export default DetailSchool;
