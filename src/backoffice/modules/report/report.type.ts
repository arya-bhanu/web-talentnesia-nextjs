import { agendaData } from './report.data';
export interface IReportViewProps {
  agendaCount: number;
  holidayCount: number;
  currentDate: Date;
  agendaData: typeof agendaData;
}