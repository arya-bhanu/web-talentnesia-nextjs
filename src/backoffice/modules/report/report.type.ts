import { APIChapterModul } from '../manage-modul/manageModul.type';
import { agendaData } from './report.data';
export interface IReportViewProps {
  agendaCount: number;
  holidayCount: number;
  currentDate: Date;
  agendaData: typeof agendaData;
}

export interface APIReportProgramDetail {
  id?: string;
  code: string;
  name: string;
  active: number;
  startDate: string;
  endDate: string;
  image: string;
  desription: string | null;
  createdBy: string | null;
  institutionId: string;
  type: string;
  progress: number;
  status: number;
  chapters: APIChapterModul[];
}

export interface APIReportChapter {
  id?: string;
  title: string;
  active: number;
  order: number;
  duration: string | null;
  description: string | null;
  chapterProgramId: string;
  createdBy: string | null;
  contents: APIReportContent[];
}

export interface APIReportContent {
  id?: string;
  chapterId: string;
  title: string;
  type: string;
  duration: string;
  order: number;
  isexam: number;
  isCompleted: null;
  body: string;
  date: null;
}
