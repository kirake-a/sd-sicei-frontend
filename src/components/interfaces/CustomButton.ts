export interface CustomButtonProps {
    id: string;
    category: string;
    onAction: (id: string) => Promise<void>;
}