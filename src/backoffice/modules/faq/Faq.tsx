'use client';
import React, { useState } from 'react';
import FaqView from './Faq.view';
import { FAQItem } from './faq.type';
import ModalForm from './components/modal-faq';
import { useFaqActions } from './hooks/useFaqAction';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { faqAPI } from './api/faqApi';

const Faq: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  const queryClient = useQueryClient();

  const { data: faqs, isLoading, isError } = useQuery<FAQItem[]>({
    queryKey: ['faqs'],
    queryFn: faqAPI.fetch,
  });

  const { handleAddFaq, handleEditFaq, handleDeleteFaq } = useFaqActions();

  const handleEditFaqClick = (faq: FAQItem) => {
    setEditingFaq(faq);
    setIsModalOpen(true);
  };

  const handleSaveFaq = async (id: string | undefined, data: any) => {
    if (id) {
      await handleEditFaq(id, data.question, data.answer);
      queryClient.setQueryData(['faqs'], (oldFaqs: FAQItem[] | undefined) =>
        oldFaqs?.map(faq => faq.id === id ? { ...faq, ...data } : faq)
      );
    } else {
      const newFaq = await handleAddFaq(data.question, data.answer);
      queryClient.setQueryData(['faqs'], (oldFaqs: FAQItem[] | undefined) => [...(oldFaqs || []), newFaq]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteFaqClick = async (id: string) => {
    await handleDeleteFaq(id);
    queryClient.setQueryData(['faqs'], (oldFaqs: FAQItem[] | undefined) =>
      oldFaqs?.filter(faq => faq.id !== id)
    );
  };

  if (isLoading) return <div>Memuat...</div>;
  if (isError) return <div>Terjadi kesalahan saat memuat data</div>;

  const columns = [
    { header: 'Question', accessor: 'question' },
    { header: 'Answer', accessor: 'answer' },
    { header: 'Actions', accessor: 'actions' },
  ];

  return (
    <>
      <FaqView
        data={faqs || []}
        filter={filter}
        setFilter={setFilter}
        onAddFaq={() => setIsModalOpen(true)}
        onEditFaq={handleEditFaqClick}
        onDeleteFaq={handleDeleteFaqClick}
        columns={columns}
      />
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingFaq(null);
        }}
        onSave={handleSaveFaq}
        initialData={editingFaq}
        id={editingFaq?.id}
        title={editingFaq ? 'Edit FAQ' : 'Tambah FAQ'}
      />
    </>
  );
};

export default Faq;
