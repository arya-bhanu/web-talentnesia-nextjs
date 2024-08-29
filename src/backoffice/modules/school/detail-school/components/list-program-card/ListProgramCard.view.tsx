import React, { useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { ListProgramCardType, ProgramDetail } from './listProgramCard.type';
import { format, isValid } from 'date-fns';
import { id } from 'date-fns/locale';
import CourseSidebar from '../../../components/course-sidebar/CourseSidebar';
import { getImageUrl } from '../../../api/minioApi';
import { ListProgramCardAPI } from './api/listProgramCardApi';

interface ProgramCardViewProps {
  data: ListProgramCardType;
}

export const ListProgramCardView: React.FC<ProgramCardViewProps> = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [programDetail, setProgramDetail] = useState<ProgramDetail | null>(null);

  console.log('data', data);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (data.imageUrl) {
        const url = await getImageUrl(data.imageUrl);
        setImageUrl(url);
      }
    };
    fetchImageUrl();
  }, [data.imageUrl]);

  const formatDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!isValid(start) || !isValid(end)) {
      return 'Invalid date range';
    }

    const formattedStart = format(start, 'dd MMMM yyyy', { locale: id });
    const formattedEnd = format(end, 'dd MMMM yyyy', { locale: id });

    return `Periode ${formattedStart} - ${formattedEnd}`;
  };

  const handleOpenSidebar = async () => {
    try {
      const response = await ListProgramCardAPI.fetchDetailProgram(data.id);
      setProgramDetail(response.data);
      setSidebarVisible(false);
    } catch (error) {
      console.error('Error fetching program details:', error);
    }
  };


  return (
    <>
      <div className="block p-4 shadow-sm shadow-indigo-100 cursor-pointer" onClick={handleOpenSidebar}>
        <img
          alt={data.name}
          src={imageUrl || '/placeholder-image.jpg'}
          className="h-[150px] w-full rounded-t-xl object-cover"
        />
        <div className="mt-2">
          <dl className="flex justify-between items-center">
            <div>
              <dd className="font-medium">{data.name}</dd>
              <dd className="text-xs mt-2 text-gray-500">
                {formatDate(data.startDate, data.endDate)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <Modal show={sidebarVisible} onClose={() => setSidebarVisible(false)} size="7xl">
        <Modal.Header>Course Sidebar</Modal.Header>
        <Modal.Body>
          {programDetail && (
            <CourseSidebar
              isSidebarVisible={sidebarVisible}
              setIsSidebarVisible={setSidebarVisible}
              content={programDetail}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
