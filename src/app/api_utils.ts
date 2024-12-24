import { Advocate } from '@/types/advocate';

export const fetchAdvocates = async (): Promise<Advocate[]> => {
    try {
        const response = await fetch("/api/advocates");
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch advocates:", error);
        return [];
    }
};