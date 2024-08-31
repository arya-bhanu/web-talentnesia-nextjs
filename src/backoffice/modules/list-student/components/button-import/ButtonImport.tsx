import React from 'react'
import { ButtonImportView } from './ButtonImport.view'
import { ButtonImportProps } from './buttonImport.type'

export const ButtonImport: React.FC<ButtonImportProps> = ({ onClick }) => {
  return (
    <ButtonImportView onClick={onClick} />
  )
}