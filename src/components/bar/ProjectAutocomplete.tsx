import {Project} from "../../model/project/Project";
import * as React from "react";
import {Autocomplete, Box, FormControl, TextField} from "@mui/material";

interface ProjectAutocompleteProps {
    projects: Array<Project>;
    project: Project | null;
    setProject: (project: Project) => void;
    visible: boolean;
}

export const ProjectAutocomplete = ({projects, project, setProject, visible = true} : ProjectAutocompleteProps) => {
    const onChangeProjectHandler = (newValue: Project | null) => {
        if (newValue) {
            setProject(newValue);
        }
    };
    if (visible) {
        return(
            <Box>
                <FormControl sx={{minWidth: 300, backgroundColor: "white", borderRadius: 2, margin: 1, padding: 1}}>
                    <Autocomplete
                        value={project}
                        onChange={(event, newValue) => onChangeProjectHandler(newValue)}
                        options={projects}
                        getOptionLabel={(option: Project) => option.name}
                        renderInput={(params) => <TextField {...params} label="project"/>}
                    >
                    </Autocomplete>
                </FormControl>
            </Box>
        )
    }
}