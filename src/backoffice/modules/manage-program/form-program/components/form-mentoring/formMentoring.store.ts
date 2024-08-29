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
  idDefaultMentoring: string | null;
  setIdDefaultMentoring: (idMentoring: string) => void;
  defaultMentoring: IMentoring | null;
  setDefaultMentoring: (newMentoring: IMentoring) => void;
  clear: () => void;
}

export const useFormMentoringStore = create<IFormMentoringStore>((set) => ({
  clear: () =>
    set({
      timeStart: timeStartDef,
      timeEnd: timeEndDef,
      date: new Date().toString(),
      mentorings: null,
      idDefaultMentoring: null,
      defaultMentoring: null,
    }),
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
  idDefaultMentoring: null,
  setIdDefaultMentoring: (newDefaultId) =>
    set({ idDefaultMentoring: newDefaultId }),
  defaultMentoring: null,
  setDefaultMentoring: (newMentoring) =>
    set({ defaultMentoring: newMentoring }),
}));
