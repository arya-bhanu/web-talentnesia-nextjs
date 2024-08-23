import { IModalSelect } from '@/backoffice/components/modal-select/modalSelect.type';
import { Dispatch, SetStateAction } from 'react';

export type IAddSchoolView = Pick<
  IModalSelect,
  'selected' | 'setSelected' | 'open' | 'setOpen' | 'columns' | 'rows'
> & {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
};
