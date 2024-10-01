import React, { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from '@tanstack/react-table';
import { QuestionType, StudentType } from './cardAccordion.type';
import CardAccordionView from './CardAccordion.view';
import { useScoreStore } from '../../inputScore.store';
import { inputScore } from '../../api/inputScore.api';
import { useStatusModalStore } from '@/lib/store';
import AlertModal from '@/backoffice/components/alert-modal';

const columnHelper = createColumnHelper<QuestionType>();

interface CardAccordionProps {
  scoreData: StudentType[] | undefined;
  contentId: string;
}

const CardAccordion: React.FC<CardAccordionProps> = ({
  scoreData,
  contentId,
}) => {
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const { setScores, getScores } = useScoreStore();
  const { openModal: openModalToast } = useStatusModalStore();
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSubmitClick = async (studentId: string, contentId: string) => {
    setCurrentStudentId(studentId);
    setOpenAlertModal(true);
    if (isConfirmed) {
    await handleSubmit(studentId, contentId);
    }
  };

  useEffect(() => {
    if (isConfirmed && currentStudentId) {
      handleSubmit(currentStudentId, contentId);
      setIsConfirmed(false);
      setCurrentStudentId(null);
    }
  }, [isConfirmed, currentStudentId]);

  const handleScoreChange = (
    studentId: string,
    questionId: string,
    value: string,
  ) => {
    const numericValue =
      value === '' ? 0 : Math.min(Math.max(0, parseInt(value)), 100);
    const currentScores = getScores(studentId);
    const updatedScores = currentScores.map((score) =>
      score.questionId === questionId
        ? { ...score, score: numericValue }
        : score,
    );
    if (!updatedScores.some((score) => score.questionId === questionId)) {
      const question = scoreData
        ?.find((student) => student.userId === studentId)
        ?.questions.find((q) => q.id === questionId);
      updatedScores.push({
        questionId,
        answerId: question?.answers?.id || '-',
        score: numericValue ?? '',
      });
    }
    setScores(studentId, updatedScores);
  };

  const handleSubmit = async (studentId: string, contentId: string) => {
    const scores = getScores(studentId);
    try {
      await inputScore({
        contentId,
        userId: studentId,
        scores,
      });
      openModalToast({
        status: 'success',
        action: 'create',
        message: 'Scores submitted successfully',
      });
    } catch (error) {
      console.error('Error submitting scores');
      openModalToast({
        status: 'error',
        action: 'create',
        message: 'Error submitting scores',
      });
    }
  };

  const calculateTotalScore = (studentId: string) => {
    const storedScores = getScores(studentId);
    const student = scoreData?.find((s) => s.userId === studentId);
    let total = 0;

    if (student) {
      student.questions.forEach((question) => {
        const storedScore = storedScores.find(
          (s) => s.questionId === question.id,
        );
        if (storedScore) {
          total += storedScore.score;
        } else if (question.answers?.score) {
          total += parseFloat(question.answers.score);
        }
      });
    }

    return total;
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Soal',
        cell: (info) => (
          <div dangerouslySetInnerHTML={{ __html: info.getValue() }} />
        ),
      }),
      columnHelper.accessor('answers', {
        header: 'Jawaban',
        cell: (info) => info.getValue()?.text || '-',
      }),
      columnHelper.accessor('id', {
        header: 'Nilai',
        cell: ({ row }) => {
          const score = getScores(row.original.id).find(
            (s) => s.questionId === row.original.id,
          );
          return score ? score.score : '';
        },
      }),
    ],
    [getScores],
  );

  const tableInstance = useReactTable({
    data: scoreData?.[0]?.questions || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!scoreData) {
    return null;
  }

  return (
    <>
      <CardAccordionView
        studentData={scoreData}
        openAccordions={openAccordions}
        getScores={getScores}
        tableInstance={tableInstance}
        toggleAccordion={toggleAccordion}
        handleScoreChange={handleScoreChange}
        calculateTotalScore={calculateTotalScore}
        handleSubmit={handleSubmitClick}
        contentId={contentId}
      />
      <AlertModal
        openModal={openAlertModal}
        setOpenModal={setOpenAlertModal}
        setIsConfirmed={setIsConfirmed}
        messageText="Are you sure you want to submit the scores for this student?"
      />
    </>
  );
};

export default CardAccordion;
