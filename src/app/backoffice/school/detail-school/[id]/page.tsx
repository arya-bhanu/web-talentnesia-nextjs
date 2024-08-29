import DetailSchool from '@/backoffice/modules/school/detail-school';
import { SchoolAPI } from '@/backoffice/modules/school/api/schoolApi';
import React from 'react';

export async function generateStaticParams() {
  try {
    const response = await SchoolAPI.fetch();
    // Ensure this returns all possible IDs that will be used in the dynamic routes
    return response.map((school) => ({
      id: school.id,
    }));
  } catch (error) {
    console.error('Failed to fetch school IDs:', error);
    return [];
  }
}

export default async function AddSchoolProgram({ params }: { params: { id: string } }) {
  let initialData = null;

  try {
    initialData = await SchoolAPI.getById(params.id);
  } catch (error) {
    console.error('Failed to fetch school data:', error);
  }
  
  if (!initialData) {
    return;
  }

  return (
    <>
      <DetailSchool schoolId={params.id} />
    </>
  );
};
