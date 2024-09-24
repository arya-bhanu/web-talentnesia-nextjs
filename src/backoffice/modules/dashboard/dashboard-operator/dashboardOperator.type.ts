export interface Agenda {
    date: string;
    title: string;
    startTime: string;
    endTime: string;
}

export interface DashboardOperatorData {
    totalStudent: number;
    totalIicp: number;
    totalClassroom: number;
    agenda: Agenda[];
}

export interface DashboardOperatorResponse {
    success: boolean;
    code: number;
    status: string;
    errors: null;
    messages: string;
    data: DashboardOperatorData;
}

export interface DashboardProgressItem {
    id: string;
    name: string;
    type: string;
    progress: number | null;
}

export interface DashboardProgressResponse {
    success: boolean;
    code: number;
    status: string;
    errors: null;
    messages: string;
    data: {
        items: DashboardProgressItem[];
        meta: {
            currentPage: number;
            lastPage: number;
            perPage: number;
            total: number;
        };
    };
}
