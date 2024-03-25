import { Button, ButtonProps } from "@mui/material";
import { Link } from "react-router-dom";
import { VITE_DOCSTORAGE_URL } from "../../../../../Const";

export type PreviewButtonProps = { documentId: string; children?: React.ReactNode } & Omit<
    ButtonProps<"a">,
    "LinkComponent" | "href" | "target"
>;

const PreviewButton = ({
    documentId,
    children = "Scan",
    startIcon = "dcument_scanner",
    ...rest
}: PreviewButtonProps) => {
    const url = `${VITE_DOCSTORAGE_URL}/preview/${documentId}/`;

    return (
        <Button LinkComponent={Link} href={url} target="_blank" startIcon={startIcon} {...rest}>
            {children}
        </Button>
    );
};

export default PreviewButton;
