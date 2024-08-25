import { create } from 'zustand';
import { APIDetailForm } from './formDetail.type';
import { defaultDataFormDetail } from './formDetail.data';
import { Mentor } from '@/backoffice/components/mentor-selector/mentorSelector.type';
import { Schools } from '@/backoffice/modules/manage-program/form-program/components/form-detail/formDetail.type';

export interface IFormDetailStore {
  data: APIDetailForm;
  defaultMentors: Mentor[];
  defaultSchools: Schools[];
  setDefaultSchools: (schools: Schools[]) => void;
  setDefaultMentors: (mentors: Mentor[]) => void;
  setData: (newData: APIDetailForm) => void;
}

export const useFormDetailStore = create<IFormDetailStore>((set) => ({
  data: defaultDataFormDetail,
  defaultMentors: [],
  defaultSchools: [],
  setDefaultSchools: (schools) =>
    set(() => ({
      defaultSchools: schools,
    })),
  setDefaultMentors: (mentors) =>
    set(() => ({
      defaultMentors: mentors,
    })),
  setData: (newData) => set(() => ({ data: newData })),
}));
