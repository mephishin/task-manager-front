import {Box, Stack, Typography} from "@mui/material";
import React from "react";

export const NoAccessPage = () => {

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"92vh"}>
            <Stack>
                <Typography fontSize={20} color={"primary"}>У вас нет доступа до этой страницы</Typography>
            </Stack>
        </Box>
    )
}