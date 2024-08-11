import { ChangeEvent, FormEvent } from 'react';
import { APIResponseManageModul } from '../../manageModul.type';

export interface IManageModulForm {
  handleSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  populatedDatas?: APIResponseManageModul;
  id?: string;
}
