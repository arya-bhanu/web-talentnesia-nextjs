import { create } from 'zustand';
import { APIDetailProgramIICP } from './formDetail.type';
import {
  defaultDataFormDetail,
  defaultDataFormDetailEdit,
} from './formDetail.data';
import { Mentor } from '@/backoffice/components/mentor-selector/mentorSelector.type';
import { Schools } from '@/backoffice/modules/manage-program/form-program/components/form-detail/formDetail.type';

export interface IFormDetailStore {
  data: APIDetailProgramIICP;
  defaultData: Omit<APIDetailProgramIICP, 'mentors'> & { mentors: string[] };
  defaultMentors: Mentor[];
  defaultSchools: Schools[];
  setDefaultSchools: (schools: Schools[]) => void;
  setDefaultMentors: (mentors: Mentor[]) => void;
  setData: (
    newData:
      | APIDetailProgramIICP
      | ((prevData: APIDetailProgramIICP) => APIDetailProgramIICP),
  ) => void;
  setDefaultData: (
    data: Omit<APIDetailProgramIICP, 'mentors'> & { mentors: string[] },
  ) => void;
  resetStore: () => void;
}

export const useFormDetailStore = create<IFormDetailStore>((set) => ({
  data: defaultDataFormDetail,
  defaultData: defaultDataFormDetailEdit,
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
  resetStore: () =>
    set(() => ({
      data: defaultDataFormDetail,
      defaultData: defaultDataFormDetailEdit,
      defaultMentors: [],
      defaultSchools: [],
    })),
  setData: (newData) =>
    set((state) => ({
      data: typeof newData === 'function' ? newData(state.data) : newData,
    })),
  setDefaultData: (data) => set({ defaultData: data }),
}));
