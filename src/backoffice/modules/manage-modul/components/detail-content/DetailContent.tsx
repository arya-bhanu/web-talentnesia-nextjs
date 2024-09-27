'use client'

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import DetailDocument from './components/detail-document/DetailDocument';
import DetailVideo from './components/detail-video/DetailVideo';
import DetailImage from './components/detail-image/DetailImage';
import DetailLink from './components/detail-link/DetailLink';
import { DetailExam } from './components/detail-exam/DetailExam';
import Loading from '@/components/loading';
import { fetchContent } from '../../api/manageModelApi';

const contentComponents = {
  '1': DetailDocument,
  '2': DetailVideo,
  '3': DetailImage,
  '4': DetailLink,
  '5': DetailExam,
};

export const DetailContent: React.FC = () => {
  const contentId = useSearchParams().get('contentId');
  console.log('contentId', contentId);

  const { data: contentData, isLoading } = useQuery({
    queryKey: ['content', contentId],
    queryFn: () => fetchContent(contentId as string),
    enabled: !!contentId,
  });

  console.log('contentData', contentData);

  if (!contentId) {
    return <div>Content ID not provided</div>;
  }

  return (
    <Loading isLoading={isLoading}>
      {contentData ? (
        (() => {
          const Component = contentComponents[contentData.data.type as keyof typeof contentComponents];
          return Component ? <Component content={contentData.data} isLoading={isLoading} /> : <div>Unsupported content type</div>;
        })()
      ) : (
        <div>Content not foundadawdawd</div>
      )}
    </Loading>
  );
};