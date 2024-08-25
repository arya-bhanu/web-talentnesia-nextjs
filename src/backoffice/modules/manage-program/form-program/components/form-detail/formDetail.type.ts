import { Mentor } from '@/backoffice/components/mentor-selector/mentorSelector.type';
import { FormEvent } from 'react';

export interface IFormDetail {
  programId?: string;
}

export interface IHandleFormDetail {
  handleSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
}

export interface IStateFormDetail {
  isLoadingMentors: boolean;
}

export type Schools = {
  id: string;
  name: string;
};

export interface APIDetailProgramIICP {
  id?: string;
  name: string;
  active: 0 | 1 | 2;
  mentors: Mentor[];
  image?: string | null;
  startDate: string;
  endDate: string;
  institutionId?: string | null;
  type: string;
  progress?: number;
}
