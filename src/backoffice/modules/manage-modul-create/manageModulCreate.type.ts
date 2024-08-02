import { ChangeEvent, FormEvent } from 'react';

export interface IManageModulCreate {
  handleSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  onChangeSelectedStatus: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeModulName: (e: ChangeEvent<HTMLInputElement>) => void;
  state: ManageModulCreateObject;
}

export interface ManageModulCreateObject {
  modulName: string;
  status: string;
}
