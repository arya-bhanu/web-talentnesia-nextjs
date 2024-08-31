import UpdateSchool from '@/backoffice/modules/school/add-school/components/update-school/UpdateSchool';
import { SchoolAPI } from '@/backoffice/modules/school/api/schoolApi';
import React from 'react';

export async function generateStaticParams() {
  try {
    const response = await SchoolAPI.fetch();
    const schoolIds = response.map((school) => ({ id: school.id }));
    return schoolIds;
  } catch (error) {
    console.error('Failed to fetch school IDs:', error);
    return [];
  }
}

export default async function EditSchoolProgramPage({ params }: { params: { id: string } }) {
  let initialData = null;

  try {
    initialData = await SchoolAPI.getById(params.id);
  } catch (error) {
    console.error('Failed to fetch school data:', error);
  }

  return <UpdateSchool />;
};
