'use client'

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchContent } from '../../components/form-course/api/formCourse.api';
import DetailDocument from './components/detail-document/DetailDocument';
import DetailVideo from './components/detail-video/DetailVideo';
import DetailImage from './components/detail-image/DetailImage';
import DetailLink from './components/detail-link/DetailLink';
import { DetailExam } from './components/detail-exam/DetailExam';
import DetailMentoring from './components/detail-mentoring/DetailMentoring';

export const DetailContent: React.FC = () => {
  const searchParams = useSearchParams();
  const contentId = searchParams.get('contentId');

  const { data: contentData, isLoading } = useQuery({
    queryKey: ['content', contentId],
    queryFn: () => fetchContent(contentId),
  });

  // console.log('contentData: ', contentData);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!contentData) {
    return <div>Content not found</div>;
  }

  const { type } = contentData.data.data;

  switch (type) {
    case '1':
      return <DetailDocument content={contentData.data} />;
    case '2':
      return <DetailVideo content={contentData.data} />;
    case '3':
      return <DetailImage content={contentData.data} />;
    case '4':
      return <DetailLink content={contentData.data} />;
    case '5':
      return <DetailExam content={contentData.data} />;
    case '6':
      return <DetailMentoring content={contentData.data} />;
    default:
      return <div>Unsupported content type</div>;
  }
};