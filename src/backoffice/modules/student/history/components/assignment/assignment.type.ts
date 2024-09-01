export interface AssignmentData {
    no: number;
    session: string;
    subsession: string;
    course: string;
    mentor: string;
    date: string;
    submisionDate: string;
    status: 'Attended' | 'Missed'; 
}
