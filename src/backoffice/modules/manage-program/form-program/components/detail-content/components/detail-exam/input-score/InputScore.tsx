'use client';

import React from 'react';
import { ExamListProps } from '../detailExam.type';
import DynamicButton from '../components/dynamic-button/DynamicButton';
import FilterMenu from '@/backoffice/modules/student/history/components/filter/FilterMenu';
import SearchBar from '@/portal/components/search-bar';
import { SearchTable } from '@/backoffice/components/search-table';
import CardAccordion from '../components/card-accordion/CardAccordion';

export const InputScore: React.FC<{ content?: { data: ExamListProps } }> = ({
  content,
}) => {
  console.log('exam', content?.data.exams);
  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <label htmlFor="title" className='text-xl font-semibold'>Input Score</label>
        <div className="space-x-4 flex flex-col-3 items-center">
          <SearchTable onChange={() => {}} value={''} />
          <FilterMenu onFilterChange={() => {}} />
            <DynamicButton text="Lihat Nilai" className='w-[50%]'/>
        </div>
      </div>
        <CardAccordion />
    </div>
  );
};
