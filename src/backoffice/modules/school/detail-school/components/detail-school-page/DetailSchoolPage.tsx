'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import DetailSchoolPageView from './DetailSchoolPage.view';
import { SchoolData } from './detailSchoolPage.type';
import { SchoolAPI } from '../../../api/schoolApi';
import { getImageUrl } from '../../../api/minioApi';

const DetailSchoolPage: React.FC = () => {
  const params = useSearchParams();
  const schoolId = params.get('schoolId')!;
  const [schoolData, setSchoolData] = React.useState<SchoolData | null>(null);
  const [fullImageUrl, setFullImageUrl] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchSchoolData = async () => {
      if (!schoolId) {
        setError("No school ID provided");
        return;
      }

      try {
        const data = await SchoolAPI.getById(schoolId);
        setSchoolData(data);

        if (data.imageUrl) {
          const imageUrl = await getImageUrl(data.imageUrl);
          setFullImageUrl(imageUrl);
        }
      } catch (error) {
        console.error('Failed to fetch school data:', error);
        setError('Failed to fetch school data');
      }
    };

    fetchSchoolData();
  }, [schoolId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!schoolData) {
    return null;
  }

  return (
    <DetailSchoolPageView
      schoolData={schoolData}
      fullImageUrl={fullImageUrl || '/img/manage-user/profile-template.svg'}
    />
  );
};

export default DetailSchoolPage;
