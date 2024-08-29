import React, { useEffect, useState } from 'react';
import FormMentoringView from './FormMentoring.view';
import { useQuery } from '@tanstack/react-query';
import { fetchMentoring, fetchMentors } from './api/formMentoring.api';
import { useFormMentoringStore } from './formMentoring.store';

const FormMentoring = ({
  isModalOpen,
  chapterId,
}: {
  isModalOpen: boolean;
  chapterId: string;
}) => {
  const {
    setMentors,
    timeStart,
    setTimeStart,
    setDate,
    date,
    setTimeEnd,
    timeEnd,
    setMentorings,
  } = useFormMentoringStore();
  const [timestartState, setTimeStartState] = useState(timeStart);
  const [timeEndState, setTimeEndState] = useState(timeEnd);
  const [dateIn, setDateIn] = useState<string>(date);

  const { data: mentors, isLoading: isLoadingMentors } = useQuery({
    queryKey: ['mentors', isModalOpen],
    queryFn: fetchMentors,
  });
  const { data: mentorings, isLoading: isLoadingMentorings } = useQuery({
    queryKey: ['mentoring', 'list', chapterId],
    queryFn: () => fetchMentoring(chapterId),
    enabled: chapterId !== null || chapterId !== undefined,
  });

  useEffect(() => {
    if (mentorings?.data?.data?.items) {
      setMentorings(mentorings?.data?.data?.items);
    }
  }, [mentorings?.data?.data]);

  useEffect(() => {
    if (mentors?.data?.data?.items) {
      setMentors(mentors.data.data.items);
    }
  }, [mentors?.data?.data]);

  useEffect(() => {
    setDate(dateIn);
  }, [dateIn]);

  useEffect(() => {
    setTimeStart(timestartState);
  }, [timestartState]);

  useEffect(() => {
    setTimeEnd(timeEndState);
  }, [timeEndState]);

  return (
    <FormMentoringView
      setTimeEnd={setTimeEndState}
      setTimeStart={setTimeStartState}
      timeEnd={timeEndState}
      timeStart={timestartState}
      date={dateIn}
      setDate={setDateIn}
      chapterId={chapterId}
    />
  );
};

export default FormMentoring;
