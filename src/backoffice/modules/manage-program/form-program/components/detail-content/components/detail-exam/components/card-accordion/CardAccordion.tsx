import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import { studentData, questionData } from '../../input-score/inputScore.data';
import { SoalType } from './cardAccordion.type';
import CardAccordionView from './CardAccordion.view';

const columnHelper = createColumnHelper<SoalType>();

const CardAccordion: React.FC = () => {
  const [openAccordions, setOpenAccordions] = useState<number[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const toggleAccordion = (id: number) => {
    setOpenAccordions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleScoreChange = (
    studentId: number,
    questionId: number,
    value: number,
  ) => {
    setScores((prev) => ({
      ...prev,
      [`${studentId}-${questionId}`]: value,
    }));
  };

  const calculateTotalScore = (studentId: number) => {
    return questionData.reduce((sum, question) => {
      const score = scores[`${studentId}-${question.id}`] || 0;
      return sum + score;
    }, 0);
  };

  const columns = [
    columnHelper.accessor('pertanyaan', {
      header: 'Soal',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('jawaban', {
      header: 'Jawaban',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('nilai', {
      header: 'Nilai',
      cell: ({ row }) => {
        const studentId = row.original.id;
        const questionId = row.original.id;
        return scores[`${studentId}-${questionId}`] || '';
      },
    }),
    columnHelper.accessor('totalNilai', {
      header: 'Total Nilai',
      cell: (info) => info.getValue(),
    }),
  ];

  const tableInstance = useReactTable({
    data: questionData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <CardAccordionView
      studentData={studentData}
      openAccordions={openAccordions}
      scores={scores}
      tableInstance={tableInstance}
      toggleAccordion={toggleAccordion}
      handleScoreChange={handleScoreChange}
      calculateTotalScore={calculateTotalScore}
    />
  );
};

export default CardAccordion;
