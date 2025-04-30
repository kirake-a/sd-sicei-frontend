import { CustomButtonProps } from "../interfaces/CustomButton";
import { EditButton } from "@refinedev/mui";

export const CustomEditButton = ({
    id,
    category,
    onAction
}: CustomButtonProps) => {
    return <EditButton hideText />;
}