// content.type.ts
export interface ContentData {
  title: string;
  paragraphs: string[];
  lists?: string[];
}

export interface ContentViewProps {
  content: ContentData[];
  className?: string;
}
