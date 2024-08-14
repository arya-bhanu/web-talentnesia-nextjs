import React from 'react'
import { UniversalTableView } from './Table.view'
import { TableProps } from './Table.type'

export function UniversalTable<T>({ 
  data, 
  columns, 
  Sorting, 
  initialColumnOrder,
  filter: { Filter, setFilter }
}: TableProps<T>) {
  return (
    <UniversalTableView
      data={data}
      columns={columns}
      Sorting={Sorting}
      initialColumnOrder={initialColumnOrder}
      filter={{ Filter, setFilter }} 
    />
  )
}