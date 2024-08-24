import { APIDetailForm } from './formDetail.type';

export const defaultDataFormDetail: APIDetailForm = {
  image: null,
  endDate: '',
  mentors: [{ id: '', name: '' }],
  name: '',
  startDate: '',
  active: 0,
  institutionId: '',
  type: 'iicp',
};
