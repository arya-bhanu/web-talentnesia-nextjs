import React from 'react'
import { UniversalTableView } from './UniversalTable.view'
import { TableProps } from './universalTable.type'

export function UniversalTable<T>({ 
  data, 
  columns, 
  initialSorting, 
  initialColumnOrder,
  globalFilter,
  setGlobalFilter
}: TableProps<T>) {
  return (
    <UniversalTableView
      data={data}
      columns={columns}
      initialSorting={initialSorting}
      initialColumnOrder={initialColumnOrder}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  )
}