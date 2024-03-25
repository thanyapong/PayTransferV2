import React from "react";
import { Grid } from "@mui/material";

const Home: React.FC = () => {
    const fullscreenImageStyle: React.CSSProperties = {
        backgroundColor: "#3199d0",
        height:"calc(100vh - 130px)"
    };

    const imageStyle: React.CSSProperties = {
        width: "auto",
        height: "100%",
        maxHeight:"50vh"
    };

    const imageUrl: string = "/images/siamsmile_logo.png";

    return (
        <Grid container justifyContent={"center"} alignItems={"center"} style={fullscreenImageStyle}>
            <img src={imageUrl} alt="Fullscreen" style={imageStyle} />
        </Grid>
    );
};

export default Home;