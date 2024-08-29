import { IModalSelect } from '@/backoffice/components/modal-select/modalSelect.type';
import { Dispatch, SetStateAction } from 'react';

export interface SchoolData {
  id: string;
  imageUrl: string;
  name: string;
  pic: string;
  email: string;
  phone: string;
  address: string;
}

export interface IDetailSchoolView extends Pick<
  IModalSelect,
  'selected' | 'setSelected' | 'open' | 'setOpen' | 'columns' | 'rows'
> {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  schoolId: string;
}
