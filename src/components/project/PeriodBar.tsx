import {usePeriodGet} from "../../hooks/query/period/usePeriod";
import {Project} from "../../model/project/Project";
import {Box, CircularProgress, Typography} from "@mui/material";
import React from "react";

interface PeriodBarProps {
    project: Project
}

export const PeriodBar = ({project}: PeriodBarProps) => {
    const period = usePeriodGet(project);

    if (!period.isPending) {
        return(
            <Box>
                <Typography>{period.data?.name}</Typography>
            </Box>
        )
    } else return <CircularProgress color={"warning"}/>
}