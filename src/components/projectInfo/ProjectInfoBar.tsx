import {Box, CircularProgress, Link, Stack, Typography} from "@mui/material";
import React from "react";
import { Project } from "../../model/project/Project";
import { useProjectsFilesGet } from "../../hooks/query/project/useProject";
import { ProjectFile } from "../../model/project/ProjectFile";

interface ProjectInfoBarProps {
    project: Project
}

export const ProjectInfoBar = ({project}: ProjectInfoBarProps) => {
    const projectFiles = useProjectsFilesGet(project);

    const downloadFile = (file: ProjectFile) => {
      const blob = new Blob([file.bytes], { type: file.extension });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    if (!projectFiles.isPending) {
        return(
            <Stack sx={{backgroundColor: '#F4F5F7', display: 'flex', p: 1, m:1, borderRadius: 2}}>
            <Typography color="gray">Устав проекта</Typography>
                {projectFiles.data.map((file) => (
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => downloadFile(file)}
                    >
                      • {file.name}
                    </Link>
                ))}
            </Stack>
        )
    } else return <CircularProgress color={"warning"}/>
}