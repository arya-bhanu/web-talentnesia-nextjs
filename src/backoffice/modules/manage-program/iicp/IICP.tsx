import React, { useEffect, useState } from 'react';
import IICPView from './IICP.view';
import { useQuery } from '@tanstack/react-query';
import { fetchIICPProgram } from './api/iicp.api';
import { useIICPStore } from './iicp.store';

const IICP = () => {
  const [popoverIndex, setPopoverIndex] = useState(0);
  const { setPrograms } = useIICPStore();
  const { data: dataProgramsIICP, isLoading: isLoadingPrograms } = useQuery({
    queryKey: ['programs'],
    queryFn: fetchIICPProgram,
  });
  useEffect(() => {
    if (dataProgramsIICP?.data?.data?.items) {
      setPrograms(dataProgramsIICP.data.data.items);
    }
  }, [JSON.stringify(dataProgramsIICP?.data)]);

  return (
    <IICPView popoverIndex={popoverIndex} setPopoverIndex={setPopoverIndex} />
  );
};

export default IICP;
