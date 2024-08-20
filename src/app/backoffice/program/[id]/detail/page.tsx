import { programsData } from '@/backoffice/modules/program/program.data';
import DetailView from '@/backoffice/modules/program/program-detail/courses-detail/Detail.view';

export async function generateStaticParams() {
  return programsData.map((program) => ({
    id: program.id,
  }));
}

export default function DetailPage({ params }: { params: { id: string } }) {
  return <DetailView params={params} />;
}
