import { Dispatch, SetStateAction } from 'react';

export interface CourseDetailProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  courseId: string;
}

export interface CourseData {
  id: string;
  code: string;
  name: string;
  active: number;
  startDate: string;
  endDate: string;
  image: string;
  description: string | null;
  createdBy: string | null;
  institutionId: string;
  type: string;
  progress: number;
  status: number;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  active: number;
  order: number;
  duration: string | null;
  description: string | null;
  chapterProgramId: string;
  createdBy: string | null;
  contents: Content[];
}

export interface Content {
  id: string;
  chapterId: string;
  title: string;
  type: string;
  date?: string;  // Make date optional
  duration: string;
  order: number;
  isexam: number;
  isComplered: number;
}

