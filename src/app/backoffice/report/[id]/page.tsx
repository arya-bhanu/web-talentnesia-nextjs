import { TableProgramData } from "@/backoffice/modules/report/components/table-program/tableProgram.data";
import ReportDetail from "@/backoffice/modules/report/course-detail/CourseDetail";

export async function generateStaticParams() {
  return TableProgramData.map((program) => ({
    id: program.id,
  }));
}

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  return <ReportDetail params={params} />;
}