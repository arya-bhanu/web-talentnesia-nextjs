export interface APIContentChapterProps {
  chapterId: string;
  title: string;
  type: string;
  date?: string | null;
  duration: string;
  body?: string;
  id: string;
  isexam: 0 | 1;
  order: number;
}