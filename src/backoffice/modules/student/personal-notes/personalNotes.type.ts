export interface PersonalNoteProps {
  id: string;
  title: string;
  body: string;
  programId: string;
  userId: string;
  createdBy: string;
  color?: string;
}

export interface PersonalNotesViewProps {
  notes: PersonalNoteProps[];
}

export interface ApiResponse {
  success: boolean;
  code: number;
  status: string;
  errors: null | any;
  messages: string;
  data: {
    items: PersonalNoteProps[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
    meta: {
      currentPage: number;
      from: number;
      lastPage: number;
      path: string;
      perPage: number;
      to: number;
      total: number;
    };
  };
}
