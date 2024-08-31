export interface ListProgramCardType {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  length: number;
  durationMinute: number;
}

export interface ChapterContent {
  id: string;
  chapterId: string;
  title: string;
  type: string;
  duration: string;
  order: number;
  isexam: number;
  isCompleted: number | null;
  body: string | null;
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
  contents: ChapterContent[];
}

export interface ProgramDetail {
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

