import React from 'react'
import { TableView } from './Table.view'
import { TableProps } from './Table.type'

export function Table<T>({ 
  data, 
  columns, 
  sorting, 
  initialColumnOrder,
  filter: { Filter, setFilter }
}: TableProps<T>) {
  return (
    <TableView
      data={data}
      columns={columns}
      sorting={sorting}
      initialColumnOrder={initialColumnOrder}
      filter={{ Filter, setFilter }} 
    />
  )
}