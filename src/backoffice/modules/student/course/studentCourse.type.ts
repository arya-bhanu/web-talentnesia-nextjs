export interface StudentCourseCardProps {
  title: string;
  status: 'On Going' | 'Complete';
  startDate: string;
  endDate: string;
  progress: number;
  image: string;
}

export interface APIResponseCourseItem {
  id: string;
  name: string;
  image: string;
  startDate: string;
  endDate: string;
  userId: string;
  progress: number;
  status: number;
}

export interface APIResponseCourseLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface APIResponseCourseMeta {
  currentPage: number;
  from: number;
  lastPage: number;
  path: string;
  perPage: number;
  to: number;
  total: number;
}

export interface APIResponseCourseData {
  items: APIResponseCourseItem[];
  links: APIResponseCourseLinks;
  meta: APIResponseCourseMeta;
}

export interface APIResponseCourse {
  success: boolean;
  code: number;
  status: string;
  errors: null;
  messages: string;
  data: APIResponseCourseData;
}
