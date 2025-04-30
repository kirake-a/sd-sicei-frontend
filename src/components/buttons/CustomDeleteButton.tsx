import { DeleteButton } from "@refinedev/mui";
import { useState } from "react";
import { CustomButtonProps } from "../interfaces/CustomButton";

export const CustomDeleteButton = ({
    id,
    category,
    onAction
}: CustomButtonProps) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        const confirm = window.confirm(`Are your sure you want to delete the ${category} with id ${id}?`);
        if (!confirm) return;

        try {
            setLoading(true);
            await onAction(id);
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    return <DeleteButton hideText loading={loading} onClick={handleClick} />;
}