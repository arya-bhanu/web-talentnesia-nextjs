'use client';
import React from 'react';
import { DataTableAccordionView } from './DataTableAccordion.view';
import { DataTableAccordionProps } from './dataTableAccordion.type';

export function DataTableAccordion<T>({
  data,
  columns,
  sorting,
  initialColumnOrder,
  filter,
  accordionProps,
}: DataTableAccordionProps<T>) {
  const handleEdit = (id: string) => {
    console.log('Edit FAQ:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete FAQ:', id);
  };

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
