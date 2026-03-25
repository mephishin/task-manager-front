import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Project } from "../../../model/project/Project";
import { usePeriodGet } from "../../../hooks/query/period/usePeriod";

interface PeriodBarProps {
    projectId: string
}

const style = {
    p: 1,
    m: 1,
    color: '#6B778C'
}

export const PeriodBar = ({ projectId }: PeriodBarProps) => {
    const period = usePeriodGet(projectId);

    if (!period.isPending) {
        return <Box sx={{ backgroundColor: '#F4F5F7', display: 'flex', flexDirection: 'row', p: 1, m: 1, justifyContent: "space-between", borderRadius: 2 }}>
            <Typography sx={style}>{period.data?.name}</Typography>
            <Typography sx={style}>{period.data?.project}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                <Typography sx={style}>{period.data?.started}</Typography>
                <Typography sx={style}>{period.data?.ended}</Typography>
            </Box>
        </Box>
    } else return <CircularProgress color={"warning"} />
}