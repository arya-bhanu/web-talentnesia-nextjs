import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from '@tanstack/react-table';
import { QuestionType, StudentType } from './cardAccordion.type';
import CardAccordionView from './CardAccordion.view';

const columnHelper = createColumnHelper<QuestionType>();

interface CardAccordionProps {
  scoreData: StudentType[] | undefined;
}

const CardAccordion: React.FC<CardAccordionProps> = ({ scoreData }) => {
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleScoreChange = (
    studentId: string,
    questionId: string,
    value: number,
  ) => {
    setScores((prev) => ({
      ...prev,
      [`${studentId}-${questionId}`]: value,
    }));
  };

  const calculateTotalScore = (studentId: string) => {
    const student = scoreData?.find((s) => s.userId === studentId);
    return student?.questions.reduce((sum, question) => {
      const score = scores[`${studentId}-${question.id}`] || 0;
      return sum + score;
    }, 0) || 0;
  };

  const columns = useMemo(() => [
    columnHelper.accessor('title', {
      header: 'Soal',
      cell: (info) => <div dangerouslySetInnerHTML={{ __html: info.getValue() }} />,
    }),
    columnHelper.accessor('id', {
      header: 'Jawaban',
      cell: () => 'Jawaban siswa',
    }),
    columnHelper.accessor('id', {
      header: 'Nilai',
      cell: ({ row, getValue }) => {
        const studentId = row.original.id;
        const questionId = getValue();
        return scores[`${studentId}-${questionId}`] || '';
      },
    }),
  ], [scores]);

  const tableInstance = useReactTable({
    data: scoreData?.[0]?.questions || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!scoreData) {
    return null;
  }

  return (
    <CardAccordionView
      studentData={scoreData}
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
