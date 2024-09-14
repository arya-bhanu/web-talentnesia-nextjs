import { FormEvent } from 'react';
import { APIResponseManageModul } from '../../manageModul.type';

export interface IManageModulForm {
  handleSubmitForm: (e: FormEvent<HTMLFormElement>, action?: 'edit' | 'addContent') => void;
  populatedDatas?: {
    data: APIResponseManageModul | undefined | null;
    isLoading: boolean;
  };
  id?: string;
}

export interface ISubmitType {
  type: 'nextSubmit' | 'defaultSubmit';
}
