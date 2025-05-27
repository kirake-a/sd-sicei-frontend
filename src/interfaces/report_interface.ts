export interface ReportStudent {
    id: string;
    students: ReportToShowStudent[];
    average: number;
}

export interface ReportToShowStudent  {
    id: number;
    student: string;
    value: number;
}

export interface ReportSubject {
    id: string;
    subjects: ReportToShowSubject[];
    average: number;
}

export interface ReportToShowSubject {
    id: number;
    subject: string;
    value: number;
}

export type CreateReportStudent = Omit<ReportStudent, "id">;

export type CreateReportSubject = Omit<ReportStudent, "id">;