import { APIDetailProgram } from './formDetail.type';

export const defaultDataFormDetail: APIDetailProgram = {
  image: null,
  endDate: '',
  mentors: [{ id: '', name: '' }],
  name: '',
  startDate: '',
  active: 0,
  institutionId: '',
  type: '',
};

export const defaultDataFormDetailEdit: Omit<
  APIDetailProgram,
  'mentors'
> & { mentors: string[] } = {
  image: null,
  endDate: '',
  mentors: [''],
  name: '',
  startDate: '',
  active: 0,
  institutionId: '',
  type: '',
};
