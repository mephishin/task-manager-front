import * as React from "react";
import {
    Box,
    Grid2,
    Typography
} from "@mui/material";
import CreateTaskForm from "./CreateTaskForm";

const gridElemStyle = {
    backgroundColor: "white",
    borderRadius: 1,
};

interface CreateTaskMenuItemProps {
}

export const CreateTaskTab = ({}: CreateTaskMenuItemProps) => {
    return <Box sx={{backgroundColor: '#F4F5F7', borderRadius: 1, p: 1}}>
            <Grid2 container spacing={2}>
                <Grid2 size={12} sx={gridElemStyle}>
                    <Typography sx={{m: 2, color: '#656565'}} variant="h6">
                        Создание новой задачи
                    </Typography>
                </Grid2>
                <Grid2 size={12} sx={gridElemStyle}>
                    <CreateTaskForm/>
                </Grid2>
            </Grid2>
        </Box>

}