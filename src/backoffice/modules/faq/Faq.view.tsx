'use client';
import React from 'react';
import { IFaq } from './faq.type';
import Link from 'next/link';
import { DataTableAccordion } from './components/data-table-accordion';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';

const FaqView: React.FC<IFaq> = ({
  data,
  filter,
  setFilter,
  columns,
  onAddFaq,
  onEditFaq,
  onDeleteFaq,
}) => {
  return (
    <section>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={filter} onChange={setFilter} />
        <PermissionGranted roleable role="faq.create">
          <AddButton text="Add FAQ" onClick={onAddFaq} />
        </PermissionGranted>
      </div>
      <div className="mt-5">
        <PermissionGranted roleable role="faq.read">
          <DataTableAccordion
            data={data}
            columns={columns}
            filter={{ Filter: filter, setFilter: setFilter }}
            accordionProps={
              data.length > 0
                ? {
                    id: data[0]?.id ?? '',
                    question: data[0]?.question ?? '',
                    answer: data[0]?.answer ?? '', 
                  }
                : {
                    id: '',
                    question: '',
                    answer: '',
                  }
            }            
            handleEdit={(id: string) =>
              onEditFaq(data.find((faq) => faq.id === id)!)
            }
            handleDelete={onDeleteFaq}
          />
        </PermissionGranted>
      </div>
    </section>
  );
};export default FaqView;
