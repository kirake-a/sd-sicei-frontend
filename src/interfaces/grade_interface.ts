import { Grade } from "@mui/icons-material";

export interface Grade {
    id: string;
    student_id: string;
    subject_id: string;
    value: number;
}

export interface GradeToShow {
    id: number;
    subject: string;
    value: number;
}

export type CreateGrade = Omit<Grade, "id">;