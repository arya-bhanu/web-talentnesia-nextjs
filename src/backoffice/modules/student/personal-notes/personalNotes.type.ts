export interface PersonalNoteProps {
  id: string;
  title: string;
  content: string;
  date: string;
  backgroundColor?: string;  // Menambahkan properti untuk warna background
}


export interface PersonalNotesViewProps {
  notes: PersonalNoteProps[];
}
