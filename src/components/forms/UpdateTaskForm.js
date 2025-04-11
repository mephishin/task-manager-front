import React, {useEffect, useState} from "react";
import {Autocomplete, FormControl, InputLabel, Select, Stack, TextField, Typography} from "@mui/material";
import {Controller, useController, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {data} from "react-router-dom";

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
                defaultValue={field.value}
                name={field.name} // send down the input name
                inputRef={field.ref} // send input ref, so we can focus on input when error appear
                labelId={"select-label"}
                label="status"
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

export const UpdateTaskForm = (props) => {
    const {taskKey, task, statuses, participants, types} = props;
    const {control, handleSubmit, reset, setValue, getValues, register, setFocus} = useForm()

    useEffect(() => {
        console.log(task)
        reset({
            name: task.name,
            status: task.status,
            type: task.type
        })
    }, [task])

    const onSubmit = (data) => {

        console.log(data)
    }


    return (
        <Box sx={{borderRadius: 20}}>
            <Stack sx={{backgroundColor: "white", margin: 5, borderRadius: 5}}>
                <Input control={control} name={"name"}/>
                <CustomSelect control={control} name={"status"} options={statuses.map((status) => status.value)}/>
                <CustomSelect control={control} name={"type"} options={types.map((type) => type.value)}/>
                {/*<Controller*/}
                {/*    name="assignee"*/}
                {/*    control={control}*/}
                {/*    render={({field: {onChange, value, ...rest}}) =>*/}
                {/*        <Autocomplete*/}
                {/*            value={value}*/}
                {/*            onChange={(event, newValue) => {*/}
                {/*                onChange(newValue)*/}
                {/*            }}*/}
                {/*            // disablePortal*/}
                {/*            options={participants.map(project => project.username)}*/}
                {/*            renderInput={(params) => <TextField {...params} label="assignee"/>}*/}
                {/*            // displayEmpty*/}
                {/*            {...rest}*/}
                {/*            sx={{margin: 5}}*/}
                {/*        >*/}
                {/*        </Autocomplete>*/}
                {/*    }*/}
                {/*/>*/}
                {/*<Button onClick={handleSubmit(onSubmit)}>Submit</Button>*/}
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Stack>
        </Box>
    )
}