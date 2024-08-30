import ProgramDetail from '@/backoffice/modules/program/program-detail/[id]';
import { programsData } from '@/backoffice/modules/program/program.data';

export async function generateStaticParams() {
  return programsData.map((program) => ({
    id: program.id,
  }));
}

export default function ProgramDetailPage({ params }: { params: { id: string } }) {
  return <ProgramDetail params={params} />;
}
