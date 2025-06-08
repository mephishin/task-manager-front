import {Project} from "../../model/project/Project";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {Autocomplete, Box, FormControl, TextField} from "@mui/material";

interface ProjectAutocompleteProps {
    projects: Array<Project>;
    project: Project | null;
    setProject: (project: Project) => void;
    authParticipantProject: Project;
}

export const ProjectAutocomplete = ({projects, project, setProject, authParticipantProject} : ProjectAutocompleteProps) => {
    const navigate = useNavigate();
    const onChangeProjectHandler = (newValue: Project | null) => {
        if (newValue) {
            setProject(newValue);
            navigate(`/project/${newValue.name}`);
        }
    };

    if (project === null) {
        setProject(authParticipantProject)

    }

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