import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from '@tanstack/react-table';
import { QuestionType, StudentType } from './cardAccordion.type';
import CardAccordionView from './CardAccordion.view';
import { useScoreStore } from '../../inputScore.store';
import { inputScore } from '../../api/inputScore.api';

const columnHelper = createColumnHelper<QuestionType>();

interface CardAccordionProps {
  scoreData: StudentType[] | undefined;
  contentId: string;
}

const CardAccordion: React.FC<CardAccordionProps> = ({ scoreData, contentId }) => {
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const { setScores, getScores } = useScoreStore()

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleScoreChange = (
    studentId: string,
    questionId: string,
    value: string,
  ) => {
    const numericValue = Math.min(Math.max(0, parseInt(value) || 0), 100);
    const currentScores = getScores(studentId);
    const updatedScores = currentScores.map(score => 
      score.questionId === questionId 
        ? { ...score, score: numericValue } 
        : score
    );
    if (!updatedScores.some(score => score.questionId === questionId)) {
      updatedScores.push({
        questionId,
        answerId: null,
        score: numericValue
      });
    }
    setScores(studentId, updatedScores);
  };
  
  const handleSubmit = async (studentId: string, contentId: string) => {
    const scores = getScores(studentId).map(score => ({
      questionId: score.questionId,
      answerId: score.answerId || "-",
      score: score.score
    }));
  
    try {
      await inputScore({
        contentId,
        userId: studentId,
        scores
      });
      // Handle success (e.g., show success message, clear scores, etc.)
    } catch (error) {
      // Handle error
      console.error('Error submitting scores:', error);
    }
  };

  const calculateTotalScore = (studentId: string) => {
    const scores = getScores(studentId);
    return scores.reduce((sum, score) => sum + score.score, 0);
  };

  const columns = useMemo(() => [
    columnHelper.accessor('title', {
      header: 'Soal',
      cell: (info) => <div dangerouslySetInnerHTML={{ __html: info.getValue() }} />,
    }),
    columnHelper.accessor('answer', {
      header: 'Jawaban',
      cell: (info) => info.getValue() || '-',
    }),
    columnHelper.accessor('id', {
      header: 'Nilai',
      cell: ({ row }) => {
        const score = getScores(row.original.id).find(s => s.questionId === row.original.id);
        return score ? score.score : '';
      },
    }),
  ], [getScores]);

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
      getScores={getScores}
      tableInstance={tableInstance}
      toggleAccordion={toggleAccordion}
      handleScoreChange={handleScoreChange}
      calculateTotalScore={calculateTotalScore}
      handleSubmit={handleSubmit}
      contentId={contentId}
    />
  );
};

export default CardAccordion;
