import { Paper } from "@mui/material";

type MainPaperProps = {
    children: React.ReactNode;
};

const MainPaper = ({ children }: MainPaperProps) => {
    return (
        <Paper elevation={1} sx={{ p: "1.5rem", lineHeight: "50px", mb: "1.5rem" }}>
            {children}
        </Paper>
    );
};

export default MainPaper;
