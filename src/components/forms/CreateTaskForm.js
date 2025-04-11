import React, {useEffect, useState} from "react";
import {createTask, getAllParticipants, getAllProjects, getTaskTypes} from "../../adapter/resources";
import {Autocomplete, FormControl, InputLabel, Select, Stack, TextField, Typography} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

export const CreateTaskForm = (props) => {
    const {control, handleSubmit} = useForm({})

    const [projects, setProjects] = useState([])
    const [types, setTypes] = useState([])
    const [participants, setParticipants] = useState([])

    const onSubmit = (data) => {
        createTask(data)
        props.handleClose()
    }

    useEffect(() => {
        getTaskTypes()
            .then(types => setTypes(types))
        getAllProjects()
            .then(projects => setProjects(projects))
        getAllParticipants()
            .then(participants => setParticipants(participants))
    }, [])

    return (
        <Box sx={{borderRadius: 20}}>
            <Stack sx={{backgroundColor: "white", margin: 5, borderRadius: 5}}>
                <Typography>Создание новой задачи</Typography>
                <Controller
                    name="name"
                    control={control}
                    render={({field}) => <TextField {...field} label="name" sx={{margin: 5}}/>}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => <TextField {...field} label="description" sx={{margin: 5}}/>}
                />
                <Controller
                    name="type"
                    control={control}
                    render={({field}) =>
                        <FormControl sx={{margin: 5}}>
                            <InputLabel id="type-select-label">type</InputLabel>
                            <Select
                                {...field}
                                labelId={"type-select-label"}
                                label="type"
                            >
                                {types.map((type) => (
                                    <MenuItem value={type.value}>
                                        <Typography>{type.value}</Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    }
                />
                <Controller
                    name="project"
                    control={control}
                    render={({field: {onChange, value, ...rest}}) =>
                        <Autocomplete
                            value={value}
                            onChange={(event, newValue) => onChange(newValue)}
                            disablePortal
                            options={projects.map(project => project.name)}
                            renderInput={(params) => <TextField {...params} label="project"/>}
                            displayEmpty
                            {...rest}
                            sx={{margin: 5}}
                        >
                        </Autocomplete>
                    }
                />
                <Controller
                    name="assignee"
                    control={control}
                    render={({field: {onChange, value, ...rest}}) =>
                        <Autocomplete
                            value={value}
                            onChange={(event, newValue) => onChange(newValue)}
                            disablePortal
                            options={participants.map(project => project.username)}
                            renderInput={(params) => <TextField {...params} label="assignee"/>}
                            displayEmpty
                            {...rest}
                            sx={{margin: 5}}
                        >
                        </Autocomplete>
                    }
                />
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Stack>
        </Box>
    )
}