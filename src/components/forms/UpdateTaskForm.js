import React, {useEffect} from "react";
import {Autocomplete, FormControl, InputLabel, Select, Stack, TextField, Typography} from "@mui/material";
import {useController, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {updateTaskByTaskKey} from "../../adapter/resources";

function Input({ control, name }) {
    const {
        field,
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields },
    } = useController({
        name,
        control,
        // rules: { required: true },
    })

    return (
        <TextField
            onChange={field.onChange} // send value to hook form
            onBlur={field.onBlur} // notify when input is touched/blur
            value={field.value || ''} // input value
            name={field.name} // send down the input name
            inputRef={field.ref} // send input ref, so we can focus on input when error appear
            label={field.name}
            sx={{margin: 5}}
        />
    )
}

function CustomSelect({ control, name, options}) {
    const {
        field,
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields },
    } = useController({
        name,
        control,
        // rules: { required: true },
    })

    return (
        <FormControl sx={{margin: 5}}>
            <InputLabel id={"select-label"}>{field.name}</InputLabel>
            <Select
                onChange={field.onChange} // send value to hook form
                onBlur={field.onBlur} // notify when input is touched/blur
                value={field.value || ''} // input value
                name={field.name} // send down the input name
                inputRef={field.ref} // send input ref, so we can focus on input when error appear
                labelId={"select-label"}
                label={field.name}
            >
                {options.map((option) => (
                    <MenuItem value={option}>
                        <Typography>{option}</Typography>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

function AutocompleteController({ control, name, options}) {
    const {
        field,
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields },
    } = useController({
        name,
        control,
        // rules: { required: true },
    })

    return (
        <Autocomplete
            value={field.value || ''}
            onChange={(event, newValue) => {
                field.onChange(newValue)
            }}
            onBlur={field.onBlur}
            inputRef={field.name}
            name={field.name}
            options={options}
            renderInput={(params) => <TextField {...params} label={field.name}/>}
            sx={{margin: 5}}
        >
        </Autocomplete>
    )
}

export const UpdateTaskForm = (props) => {
    const {taskKey, task, statuses, participants, types, updateTask} = props;
    const {control, handleSubmit, reset} = useForm()

    const onSubmit = (data) => {
        data.key = taskKey
        console.log(data)
        updateTask(data)
    }

    useEffect(() => {
        console.log(task)
        reset({
            name: task.name,
            description: task.description,
            status: task.status,
            type: task.type,
            assignee: task.assignee
        })
    }, [task, reset])

    return (
        <Box sx={{borderRadius: 20}}>
            <Stack sx={{backgroundColor: "white", margin: 5, borderRadius: 5}}>
                <Input control={control} name={"name"}/>
                <Input control={control} name={"description"}/>
                <CustomSelect control={control} name={"status"} options={statuses.map((status) => status.value)}/>
                <CustomSelect control={control} name={"type"} options={types.map((type) => type.value)}/>
                <AutocompleteController control={control} name={"assignee"} options={participants.map((participant) => participant.username)}/>
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Stack>
        </Box>
    )
}