import { apiInstance } from "./base.api";
import { Student } from "../interfaces/student_interface";
import { Subject } from "../interfaces/subject_interface";
import { Grade, CreateGrade } from "../interfaces/grade_interface";

const API_URL_GRADES = "/grades";
const API_URL_STUDENTS = "/students";
const API_URL_SUBJECTS = "/subjects";

export const populateGradesByStudentId = async (
    studentId: string,
    semester: number
): Promise<void> => {
    try {
        const subjectsBySemester = await apiInstance.get<Subject[]>(`${API_URL_SUBJECTS}/semester/${semester}`);

        if (subjectsBySemester.data.length === 0) {
            return;
        }

        for (const subject of subjectsBySemester.data) {
            const gradeData: CreateGrade = {
                student_id: studentId,
                subject_id: subject.id,
                value: 0
            };

            try {
                await createGrade(gradeData);
            } catch (error) {
                console.error(`Failed to create grade for student ${studentId} in subject ${subject.id}:`, error);
            }
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.log(`No subjects found (404) for semester ${semester}, skipping grade creation.`);
            return;
        }
        console.error("Error fetching subjects by semester: ", error);
        throw new Error("Failed to fetch subjects by semester");
    }
};

export const populateGradesBySubjectId = async (
    subjectID: string,
    semester: number
): Promise<void> => {

    try{
        const studentsBySemester = await apiInstance.get<Student[]>(`${API_URL_STUDENTS}/semester/${semester}`);

        if (studentsBySemester.data.length === 0) {
            return;
        }

        for (const student of studentsBySemester.data) {
            const gradeData: CreateGrade = {
                student_id: student.id,
                subject_id: subjectID,
                value: 0
            };

            try {
                await createGrade(gradeData);
            } catch (error) {
                console.error(`Failed to create grade for student ${student.id} in subject ${subjectID}:`, error);
            }
        }

    } catch(error: any) {
        if (error.response && error.response.status === 404) {
            console.log(`No subjects found (404) for semester ${semester}, skipping grade creation.`);
            return;
        }
        console.error("Error fetching subjects by semester: ", error);
        throw new Error("Failed to fetch subjects by semester");
    }
};

const createGrade = async (gradeData: CreateGrade): Promise<Grade> => {
    try {
        const response = await apiInstance.post<Grade>(`${API_URL_GRADES}`, gradeData);
        return response.data;
    } catch (error) {
        console.error("Error creating grade: ", error);
        throw new Error("Failed to create grade");
    }
}