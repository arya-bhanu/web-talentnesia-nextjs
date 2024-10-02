'use client';
import React from 'react';
import { DataTableAccordionView } from './DataTableAccordion.view';
import { DataTableAccordionProps } from './dataTableAccordion.type';
import { FAQItem } from '../../faq.type';

export function DataTableAccordion({
  data,
  columns,
  sorting,
  initialColumnOrder,
  filter,
  accordionProps,
  handleEdit,
  handleDelete,
}: DataTableAccordionProps<FAQItem> & {
  handleEdit: (id: string) => void;
}) {
  return (
    <DataTableAccordionView
      data={data}
      columns={columns}
      sorting={sorting}
      initialColumnOrder={initialColumnOrder}
      filter={filter}
      accordionProps={accordionProps}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
