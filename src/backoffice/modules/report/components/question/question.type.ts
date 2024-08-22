export interface IQuestion {
  text: string;
  attachment?: string;
  attachmentName?: string;
}

export interface IQuestionProps {}

export interface IQuestionViewProps {
  questions: IQuestion[];
}
