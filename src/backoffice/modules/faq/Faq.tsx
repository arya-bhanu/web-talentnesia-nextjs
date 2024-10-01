'use client';
import React, { useState, useMemo } from 'react';
import FaqView from './Faq.view';
import { FAQItem } from './faq.type';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import ModalForm from './components/modal-faq';

const columnHelper = createColumnHelper<FAQItem>();

const Faq: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    { id: '1', question: 'Apa itu LMS Talentnesia?', answer: 'LMS Talentnesia adalah Learning Management System yang dirancang untuk mendukung proses pembelajaran dan pengembangan keterampilan di berbagai industri.' },
  ]);

  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  const columns = useMemo<ColumnDef<FAQItem, any>[]>(
    () => [
      columnHelper.accessor('question', {
        header: 'Pertanyaan',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('answer', {
        header: 'Jawaban',
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  const handleAddFaq = () => {
    setEditingFaq(null);
    setIsModalOpen(true);
  };

  const handleEditFaq = (faq: FAQItem) => {
    setEditingFaq(faq);
    setIsModalOpen(true);
  };

  const handleSaveFaq = async (id: string | undefined, data: any) => {
    if (id) {
      setFaqs(faqs.map(faq => faq.id === id ? { ...faq, ...data } : faq));
    } else {
      const newFaq: FAQItem = {
        id: String(faqs.length + 1),
        ...data
      };
      setFaqs([...faqs, newFaq]);
    }
  };

  return (
    <>
      <FaqView
        data={faqs}
        filter={filter}
        setFilter={setFilter}
        columns={columns}
        onAddFaq={handleAddFaq}
        onEditFaq={handleEditFaq}
      />
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveFaq}
        initialData={editingFaq}
        id={editingFaq?.id}
        title={editingFaq ? 'Edit FAQ' : 'Add FAQ'}
      />
    </>
  );
};

export default Faq;
