import React from 'react';
import { useParams } from 'next/navigation';
import DetailSchoolPageView from './DetailSchoolPage.view';
import { SchoolData } from './detailSchoolPage.type';
import { SchoolAPI } from '../../../api/schoolApi';
import { getImageUrl } from '../../../api/minioApi';

const DetailSchoolPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [schoolData, setSchoolData] = React.useState<SchoolData | null>(null);
  const [fullImageUrl, setFullImageUrl] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchSchoolData = async () => {
      if (!id) {
        setError("No school ID provided");
        return;
      }

      try {
        const data = await SchoolAPI.getById(id);
        setSchoolData(data);

        if (data.imageUrl) {
          const imageUrl = await getImageUrl(data.imageUrl);
          setFullImageUrl(imageUrl);
        }
      } catch (error) {
        return;
      }
    };

    fetchSchoolData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!schoolData) {
    return;
  }

  return <DetailSchoolPageView schoolData={schoolData} fullImageUrl={fullImageUrl || '/img/manage-user/profile-template.svg'} />;
};

export default DetailSchoolPage;