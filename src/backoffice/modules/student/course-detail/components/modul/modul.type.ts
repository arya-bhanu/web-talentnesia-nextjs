import { Dispatch, SetStateAction } from 'react';

export type IModulView = {
  setMentors: Dispatch<SetStateAction<string[]>>;
  mentors: string[];
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
};
