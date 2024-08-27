import { DetailStudent } from '@/backoffice/modules/list-student/detail-student/DetailStudent';
import { ListStudentData } from '@/backoffice/modules/list-student/listStudent.data';
import { DetailStudentProps } from '@/backoffice/modules/list-student/listStudent.type';

export async function generateStaticParams() {
  return ListStudentData.map((student) => ({
    id: student.id,
  }));
}

export default function DetailStudentPage({ params }: { params: { id: string } }) {
  const student = ListStudentData.find((student) => student.id === params.id) as DetailStudentProps;

  if (!student) {
    return <div>Student not found</div>;
  }

  return <DetailStudent student={student} />;
}
