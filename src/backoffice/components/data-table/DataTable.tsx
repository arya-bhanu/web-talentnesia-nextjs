import React from 'react'
import { DataTableView } from './DataTable.view'
import { DataTableProps } from './DataTable.type'

export function DataTable<T>({ 
  data, 
  columns, 
  sorting, 
  initialColumnOrder,
  filter: { Filter, setFilter }
}: DataTableProps<T>) {
  return (
    <DataTableView
      data={data}
      columns={columns}
      sorting={sorting}
      initialColumnOrder={initialColumnOrder}
      filter={{ Filter, setFilter }} 
    />
  )
}