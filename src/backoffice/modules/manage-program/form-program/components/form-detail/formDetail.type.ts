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

export interface APIDetailForm {
  name: string;
  active: number;
  mentors: Mentor[];
  image?: File | null;
  startDate: string;
  endDate: string;
  institutionId?: string | null;
  type: string;
}
