import { Dispatch, FormEvent, SetStateAction } from 'react';

export interface IFormMentoring {
  chapterId: string;
}

export interface ITimeInputRange {
  timeStart: Date;
  setTimeStart: Dispatch<SetStateAction<Date>>;
  timeEnd: Date;
  setTimeEnd: Dispatch<SetStateAction<Date>>;
}

export interface IDateInput {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
}

export interface IHandler {}

export interface IMentor {
  email: string;
  id: string;
  name: string;
  phone: string | null;
  photoProfile: string | null;
}

export interface IMentoring {
  id?: string;
  chapterId?: string;
  title: string;
  mentorId: string;
  startTime: string;
  endTime: string;
  date: string;
  location: null;
  link: string;
}
