import { fetchAxios } from '@/lib/fetchAxios';
import { Attendance, AttendancePayload } from '../detailMentoring.type';

export const addAttendance = async (payload: AttendancePayload) => {
  const response = await fetchAxios<{ data: Attendance }>({
    url: '/v1/attendance/',
    method: 'POST',
    formData: payload,
  });
  console.log('response: ', response);
  return { data: response };
};
