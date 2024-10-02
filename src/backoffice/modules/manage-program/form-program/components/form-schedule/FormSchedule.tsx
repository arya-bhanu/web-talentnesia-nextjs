import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import FormScheduleView from './FormSchedule.view';
import { useQuery } from '@tanstack/react-query';
import { fetchContent } from '../form-course/api/formCourse.api';
import { useFormScheduleStore } from './formSchedule.store';
import {
  convertDateToStr,
  convertHHmmTime,
  convertStrToTime,
  YMDIntoDate,
} from '@/helpers/formatter.helper';

const FormSchedule = ({ contentId }: { contentId?: string }) => {
  const [time, setTime] = useState(new Date());
  const [dateState, setDateState] = useState(new Date());
  const { setContent, content } = useFormScheduleStore();
  const { data: schedule, isLoading: isLoadingSchedule } = useQuery({
    queryKey: ['schedule', contentId],
    queryFn: () => fetchContent(contentId),
    enabled: contentId !== null || contentId !== undefined,
  });
  useEffect(() => {
    if (schedule?.data?.data) {
      setContent(schedule?.data?.data);
      const time = convertStrToTime(schedule.data.data.duration);
      const date = schedule.data.data?.date;
      setTime(time);
      if (date) {
        setDateState(YMDIntoDate(date));
      }
    }
  }, [JSON.stringify(schedule?.data?.data)]);
  useEffect(() => {
    if (content) {
      const { duration, ...rest } = content;
      setContent({ ...rest, duration: convertHHmmTime(time) });
    }
  }, [time]);
  useEffect(() => {
    if (content && dateState) {
      const { date, ...rest } = content;
      setContent({ ...rest, date: convertDateToStr(dateState) });
    }
  }, [dateState, JSON.stringify(content)]);
  return (
    <FormScheduleView
      timeInputState={{ setTime, time }}
      dateInputState={{ date: dateState, setDate: setDateState as Dispatch<SetStateAction<Date | null>> }}
    />
  );
};

export default FormSchedule;
