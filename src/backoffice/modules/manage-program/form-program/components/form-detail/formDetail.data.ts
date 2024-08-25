import { APIDetailProgramIICP } from './formDetail.type';

export const defaultDataFormDetail: APIDetailProgramIICP = {
  image: null,
  endDate: '',
  mentors: [{ id: '', name: '' }],
  name: '',
  startDate: '',
  active: 0,
  institutionId: '',
  type: 'iicp',
};
