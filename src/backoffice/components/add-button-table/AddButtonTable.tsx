import React from 'react'
import { AddButtonView } from './AddButtonTable.view'
import { AddButtonProps } from './addButtonTable.type'

export const AddButton: React.FC<AddButtonProps> = ({ onClick, text }) => {
  return (
    <AddButtonView onClick={onClick} text={text} />
  )
}