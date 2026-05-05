import {Box, Stack, Typography} from "@mui/material";
import React from "react";

export const NoPage = () => {

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"92vh"}>
            <Stack>
                <Typography fontSize={20} color={"primary"}>Такой страницы не существует</Typography>
            </Stack>
        </Box>
    )
}