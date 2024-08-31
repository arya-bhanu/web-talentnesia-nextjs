export interface IListMentoring {
  className?: string;
  chapterId: string;
}

export interface IListMentoringHandler {
  handleDeleteMentoring: (mentoringId: string) => void;
}
