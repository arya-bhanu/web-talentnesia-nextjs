import { Dispatch, SetStateAction } from 'react';

export interface IAddNewProgramView {
  setMentors: Dispatch<SetStateAction<string[]>>;
  mentors: string[];
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}
