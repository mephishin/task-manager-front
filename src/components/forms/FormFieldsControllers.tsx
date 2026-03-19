import { Control, FieldErrors, useController } from "react-hook-form";
import { Autocomplete, FormControl, FormHelperText, InputLabel, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

interface InputControllerProps {
    control: Control<any, any, any>,
    name: string,
    label: string
    errors?: FieldErrors<any>
}

export function InputController({ label, control, name, errors }: InputControllerProps) {
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
            label={label}
            sx={{ margin: 5 }}
            error={!!errors?.[name]}
            helperText={errors?.[name]?.message?.toString()}
        />
    )
}

interface SelectControllerProps {
    control: Control<any, any, any>
    name: string
    options?: Array<string>
    label: string
    errors?: FieldErrors<any>
}

export function SelectController({ label, control, name, options, errors }: SelectControllerProps) {
    const {
        field,
        // fieldState: { invalid, isTouched, isDirty },
        // formState: { touchedFields, dirtyFields },
    } = useController({
        name,
        control
        // rules: { required: true },
    })

    return (
        <FormControl sx={{ margin: 5 }} error={!!errors?.[name]}>
            <InputLabel id={"select-label"}>{label}</InputLabel>
            <Select
                onChange={field.onChange} // send value to hook form
                onBlur={field.onBlur} // notify when input is touched/blur
                value={field.value || ''} // input value
                labelId={"select-label"}
                label={label}
            >
                {options?.map((option) => (
                    <MenuItem value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{errors?.[name]?.message?.toString()}</FormHelperText>
        </FormControl>
    )
}

interface AutocompleteControllerProps {
    control: Control<any, any, any>
    name: string
    options: Array<string | unknown>
    label: string
    errors?: FieldErrors<any>
}

export function AutocompleteController({ label, control, name, options, errors }: AutocompleteControllerProps) {
    const {
        field,
        // fieldState: { invalid, isTouched, isDirty },
        // formState: { touchedFields, dirtyFields },
    } = useController({
        name,
        control
        // rules: { required: true },
    })


    return (
        <Autocomplete
            value={field.value}
            onChange={(event, newValue) => {
                field.onChange(newValue)
            }}
            onBlur={field.onBlur}
            options={options}
            renderInput={(params) => <TextField
                {...params}
                label={label}
                error={!!errors?.[name]}
                helperText={errors?.[name]?.message?.toString()}/>}
            sx={{ margin: 5 }}
        >
        </Autocomplete>
    )
}

interface MultipleAutocompleteControllerProps {
    control: Control<any, any, any>,
    name: string,
    options: Array<string | unknown>,
    label: string,
    errors?: FieldErrors<any>
}

export function MultipleAutocompleteController({ label, control, name, options, errors }: MultipleAutocompleteControllerProps) {
    const {
        field,
        // fieldState: { invalid, isTouched, isDirty },
        // formState: { touchedFields, dirtyFields },
    } = useController({
        name,
        control
        // rules: { required: true },
    })


    return (
        <Autocomplete
            multiple
            value={field.value}
            onChange={(event, newValue) => {
                field.onChange(newValue)
            }}
            onBlur={field.onBlur}
            options={options}
            renderInput={(params) => <TextField
                {...params}
                label={label}
                error={!!errors?.[name]}
                helperText={errors?.[name]?.message?.toString()} />}
            sx={{ margin: 5 }}
        >
        </Autocomplete>
    )
}