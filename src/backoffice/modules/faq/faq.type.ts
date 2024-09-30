import { Dispatch, SetStateAction } from 'react';
import { ColumnDef } from '@tanstack/react-table';

export interface IFaq {
  data: FAQItem[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  columns: ColumnDef<FAQItem>[];
  onAddFaq: () => void;
  onEditFaq: (faq: FAQItem) => void;
}


export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
