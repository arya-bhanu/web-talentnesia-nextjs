import { create } from 'zustand';
import { IAPIStudentProgram } from './tableStudents.type';

export interface ITableStudentsStore {
  dataStudentsJoined: IAPIStudentProgram[] | null;
  dataSchoolStudents: IAPIStudentProgram[] | null;
  setDataStudentsJoined: (newData: IAPIStudentProgram[]) => void;
  setDataSchoolStudents: (newData: IAPIStudentProgram[]) => void;
}

export const useTableStudentStore = create<ITableStudentsStore>((set) => ({
  dataStudentsJoined: null,
  setDataStudentsJoined: (newData) => set({ dataStudentsJoined: newData }),
  dataSchoolStudents: null,
  setDataSchoolStudents: (newData) => set({ dataSchoolStudents: newData }),
}));
