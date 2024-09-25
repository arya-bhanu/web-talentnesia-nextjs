import React from 'react'
import { ButtonGenerateView } from './ButtonGenerate.view'
import { ButtonGenerateProps } from './buttonGenerate.type'

export const ButtonGenerate: React.FC<ButtonGenerateProps> = ({ onClick }) => {
  return (
    <ButtonGenerateView onClick={onClick} />
  )
}