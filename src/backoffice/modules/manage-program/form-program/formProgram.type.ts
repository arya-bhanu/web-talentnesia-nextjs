import { IModalSelect } from '@/backoffice/components/modal-select/modalSelect.type';
import { Dispatch, SetStateAction } from 'react';

export interface FormProgramTabs {
  detail: 'detail';
  course: 'course';
  student: 'student';
}

export type IFormProgram = Pick<
  IModalSelect,
  'selected' | 'setSelected' | 'open' | 'setOpen'
> & {
  setMentors: Dispatch<SetStateAction<string[]>>;
  mentors: string[];
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
};
