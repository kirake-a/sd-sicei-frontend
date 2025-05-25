import { apiInstance } from "./base.api";
import { Student } from "../interfaces/student_interface";

const API_URL = "/students";

export const getAllStudents = async (): Promise<Student[]> => {
    try {
        const response = await apiInstance.get<Student[]>(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching students: ", error);
        throw new Error("Failed to fetch all students");
    }
}

export const getStudentById = async (student_id: string): Promise<Student> => {
    try {
        const response = await apiInstance.get<Student>(`${API_URL}/${student_id}`);
        return response.data;
    } catch  (error) {
        console.error("Error fetching student: ", error);
        throw new Error("Failed to fetch student by ID");
    }
}

export const createStudent = async (student: Omit<Student, "id">): Promise<Student> => {
    try {
        const response = await apiInstance.post<Student>(API_URL, student);
        return response.data;
    } catch (error) {
        console.error("Error creating student: ", error);
        throw new Error("Failed to create student");
    }
}

export const updateStudent = async (studentId: string, studentData: Partial<Student>): Promise<Student> => {
    try {
        const response = await apiInstance.put<Student>(`${API_URL}/${studentId}`, studentData);
        return response.data;
    } catch (error) {
        console.error("Error updating student: ", error);
        throw new Error("Failed to update student");
    }
}

export const deleteStudent = async (studentId: string): Promise<void> => {
    try {
        await apiInstance.delete(`${API_URL}/${studentId}`);
    } catch (error) {
        console.error("Error deleting student: ", error);
        throw new Error("Failed to delete student");
    }
}
