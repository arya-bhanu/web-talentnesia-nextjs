// UpdateSchool.tsx
'use client'
import React, { useEffect, useState } from 'react';
import UpdateSchoolView from './UpdateSchool.view';
import { SchoolAPI } from '../../../api/schoolApi';
import { APIResponseSchool } from '../../../school.type';
import { useParams } from 'next/navigation';

const UpdateSchool: React.FC = () => {
  const [schoolData, setSchoolData] = useState<APIResponseSchool | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchSchoolData = async () => {
      if (id) {
        try {
          const data = await SchoolAPI.getById(id);
          setSchoolData(data);
        } catch (error) {
          console.error('Failed to fetch school data:', error);
        }
      }
    };

    fetchSchoolData();
  }, [id]);

  if (!schoolData) {
    return <div>Loading...</div>;
  }

  return <UpdateSchoolView initialData={schoolData} />;
};

export default UpdateSchool;