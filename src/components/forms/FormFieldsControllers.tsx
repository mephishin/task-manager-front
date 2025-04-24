import {Control, useController} from "react-hook-form";
import {Autocomplete, FormControl, InputLabel, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

interface InputControllerProps {
    control: Control<any, any, any>,
    name: string
}

export function InputController({ control, name }: InputControllerProps) {
    const {
        field,
        // fieldState: { invalid, isTouched, isDirty },
        // formState: { touchedFields, dirtyFields },
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
            label={field.name}
            sx={{margin: 5}}
        />
    )
}

interface SelectControllerProps {
    control: Control<any, any, any>,
    name: string,
    options: string[]
}

export function SelectController({ control, name, options}: SelectControllerProps) {
    const {
        field,
        // fieldState: { invalid, isTouched, isDirty },
        // formState: { touchedFields, dirtyFields },
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
                labelId={"select-label"}
                label={field.name}
            >
                {options.map((option) => (
                    <MenuItem value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

interface AutocompleteControllerProps {
    control: Control<any, any, any>,
    name: string,
    options: string[]
}

export function AutocompleteController({ control, name, options}: AutocompleteControllerProps) {
    const {
        field,
        // fieldState: { invalid, isTouched, isDirty },
        // formState: { touchedFields, dirtyFields },
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
            options={options}
            renderInput={(params) => <TextField {...params} label={field.name}/>}
            sx={{margin: 5}}
        >
        </Autocomplete>
    )
}