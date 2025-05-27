import { Report } from "@mui/icons-material";

export interface Report {
    id: string;
    students: ReportToShow[];
    average: number;
}

export interface ReportToShow {
    id: number;
    student: string;
    value: number;
}

export type CreateReport = Omit<Report, "id">;