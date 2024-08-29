import { create } from 'zustand';
import { IMentor, IMentoring } from './formMentoring.type';

const timeStartDef = new Date();
timeStartDef.setHours(7);
timeStartDef.setMinutes(0);

const timeEndDef = new Date();
timeEndDef.setHours(8);
timeEndDef.setMinutes(0);

export interface IFormMentoringStore {
  mentors: IMentor[] | null;
  setMentors: (newMentors: IMentor[]) => void;
  timeStart: Date;
  timeEnd: Date;
  setTimeStart: (newTime: Date) => void;
  setTimeEnd: (newTime: Date) => void;
  date: string;
  setDate: (newDate: string) => void;
  mentorings: IMentoring[] | null;
  setMentorings: (newMentorings: IMentoring[]) => void;
}

export const useFormMentoringStore = create<IFormMentoringStore>((set) => ({
  mentors: null,
  setMentors: (newMentors) => set({ mentors: newMentors }),
  date: new Date().toString(),
  setDate: (newDate) => set({ date: newDate }),
  timeEnd: timeEndDef,
  timeStart: timeStartDef,
  setTimeEnd: (newTimeEnd) => set({ timeEnd: newTimeEnd }),
  setTimeStart: (newTimeStart) => set({ timeStart: newTimeStart }),
  mentorings: null,
  setMentorings: (newMentorings) => set({ mentorings: newMentorings }),
}));
