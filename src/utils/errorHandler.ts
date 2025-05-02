import axios from 'axios';

export const errorHandler = (error: unknown, action: string) => {
    if (axios.isAxiosError(error)) {
        console.error(`API Error during ${action}: `, error.response?.data ?? error.message);
        return new Error(error.response?.data?.message ?? `Error during ${action}`);
    } else {
        console.error(`Unexpected Error during ${action}: `, error);
        return new Error(`Unexpected error during ${action}`);
    }
}