'use client';
import React, { useState, useMemo } from 'react';
import FaqView from './Faq.view';
import { FAQItem } from './faq.type';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import ModalForm from './components/modal-form-faq';

const columnHelper = createColumnHelper<FAQItem>();

const Faq: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    { id: '1', question: 'Apa itu LMS Talentnesia?', answer: 'LMS Talentnesia adalah Learning Management System yang dirancang untuk mendukung proses pembelajaran dan pengembangan keterampilan di berbagai industri.' },
    { id: '2', question: 'Apa saja fitur utama dari LMS Talentnesia?', answer: 'Anda akan menerima email dengan nomor pelacakan setelah pesanan Anda dikirim.' },
    { id: '3', question: 'Siapa yang dapat menggunakan LMS Talentnesia?', answer: 'Ya, silakan hubungi tim penjualan kami untuk harga grosir.' },
    { id: '4', question: 'Apakah LMS Talentnesia mendukung pembelajaran jarak jauh?', answer: 'Ya, silakan hubungi tim penjualan kami untuk harga grosir.' },
    { id: '5', question: 'Apakah saya bisa membeli barang dalam jumlah besar?', answer: 'Ya, silakan hubungi tim penjualan kami untuk harga grosir.' },
    { id: '6', question: 'Apakah saya bisa membeli barang dalam jumlah besar?', answer: 'Ya, silakan hubungi tim penjualan kami untuk harga grosir.' },
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
      // Edit existing FAQ
      setFaqs(faqs.map(faq => faq.id === id ? { ...faq, ...data } : faq));
    } else {
      // Add new FAQ
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
