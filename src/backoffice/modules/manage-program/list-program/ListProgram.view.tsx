'use client';

import { CustomCard } from '@/backoffice/components/program-card/programCard';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/loading';
import { fetchIicpListProgram } from './api/listProgram.api';
import { listProgramDataResponse } from './listProgram.type';

export const ListProgramView = () => {
  const { data: programsData, isLoading } = useQuery({
    queryKey: ['iicp-programs'],
    queryFn: fetchIicpListProgram,
  });

  console.log('programsData', programsData);

  return (
    <Loading isLoading={isLoading}>
      <h1 className="font-poppins font-semibold text-[25px] mb-6">
        List Program
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {programsData?.data?.data?.items.map(
          (program: listProgramDataResponse) => (
            <CustomCard key={program.id} {...program} />
          ),
        )}
      </div>
    </Loading>
  );
};
