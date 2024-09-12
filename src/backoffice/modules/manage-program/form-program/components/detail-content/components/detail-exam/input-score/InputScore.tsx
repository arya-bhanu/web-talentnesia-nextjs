'use client';

import React from 'react';
import { ExamListProps } from '../detailExam.type';
import FilterMenu from '@/backoffice/modules/student/history/components/filter/FilterMenu';
import { SearchTable } from '@/backoffice/components/search-table';
import CardAccordion from './components/card-accordion/CardAccordion';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchScore } from './api/inputScore.api';
import { StudentType } from './components/card-accordion/cardAccordion.type';

export const InputScore: React.FC<{ content?: { data: ExamListProps } }> = ({
  content,
}) => {
  const contentId = useSearchParams().get('contentId');
  const { data: scoreData } = useQuery({
    queryKey: ['score', contentId],
    queryFn: () => fetchScore(contentId),
    enabled: !!contentId,
    select: (data) => data?.data as StudentType[] | undefined,
  });
  

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <label htmlFor="title" className="text-xl font-semibold">
          Input Score
        </label>
        <div className="space-x-4 flex flex-col-3 items-center">
          <SearchTable onChange={() => {}} value={''} />
          <FilterMenu onFilterChange={() => {}} />
        </div>
      </div>
      <CardAccordion scoreData={scoreData} contentId={contentId as string} />
    </div>
  );
};
