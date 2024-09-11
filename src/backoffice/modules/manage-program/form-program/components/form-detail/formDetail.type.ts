import { Mentor } from '@/backoffice/components/mentor-selector/mentorSelector.type';
import { FormEvent } from 'react';

export interface IFormDetail {
  programId?: string;
  handleFileChange: (fileUrl: string) => Promise<void>;
  fullImageUrl: string;
  programType?: string;
}

export interface IHandleFormDetail {
  handleSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
}

export interface IStateFormDetail {
  isLoadingMentors: boolean;
  selectedSchool: string;
  setSelectedSchool: React.Dispatch<React.SetStateAction<string>>;
}

export type Schools = {
  id: string;
  name: string;
};

export interface APIDetailProgram {
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
