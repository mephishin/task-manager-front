import {Box, Typography} from "@mui/material";
import React from "react";
import {useParams} from "react-router-dom";

export const ProjectPage = () => {
    const [value, setValue] = React.useState(0);

    const {inviteKey} = useParams();

    return (
        <Box display={'flex'}>

        </Box>
    );
}

