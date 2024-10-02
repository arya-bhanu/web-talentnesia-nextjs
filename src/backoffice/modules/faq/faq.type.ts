import { Dispatch, SetStateAction } from 'react';
import { ColumnDef } from '@tanstack/react-table';

export interface IFaq {
  data: FAQItem[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  columns: ColumnDef<FAQItem>[];
  onAddFaq: () => void;
  onEditFaq: (faq: FAQItem) => void;
  onDeleteFaq: (id: string) => Promise<void>;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface APIResponseFAQ {
  id: string;
  question: string;
  answer: string;
  active: string;
}
