import {Control, FieldErrors, useController} from "react-hook-form";
import {
    Autocomplete,
    Box as Stack,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    TextField,
    Typography, List
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, {ComponentPropsWithoutRef} from "react";
import ListItemText from "@mui/material/ListItemText";

interface InputControllerProps {
    control: Control<any, any, any>,
    name: string,
    label?: string
    errors?: FieldErrors<any>,
}

type ComposedInputControllerProps = InputControllerProps & ComponentPropsWithoutRef<typeof TextField>;

export function InputController({label, control, name, errors, ...textFieldProps}: ComposedInputControllerProps) {
    const {
        field,
    } = useController({
        name,
        control,
    })

    return (
        <TextField
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value || ''}
            label={label}
            error={!!errors?.[name]}
            helperText={errors?.[name]?.message?.toString()}
            {...textFieldProps}
        />
    )
}

type InputFileControllerProps = {
    control: Control<any, any, any>;
    name: string;
    label: string;
    errors?: FieldErrors<any>;
}

type ComposedInputFileControllerProps = InputFileControllerProps & ComponentPropsWithoutRef<typeof Button>;

export function InputFileController({label, control, name, errors, ...buttonProps}: ComposedInputFileControllerProps) {
    const {field} = useController({name, control,})

    const fileInput = React.useRef<HTMLInputElement>(null);

    return (
        <Stack>
            <Button
                variant="contained"
                color="primary"
                onClick={() => fileInput?.current?.click()}
                {...buttonProps}
            >
                {"Добавить файлы"}
            </Button>

            <input
                multiple
                ref={fileInput}
                type="file"
                style={{display: 'none'}}
                onChange={(event) => event.target.files ? field.onChange(Array.from(event.target.files)) : field.onChange([])}
            />
            {field.value &&
                <List sx={{mx: 1}}>
                    {field.value.map((file: File) =>
                        <ListItemText>
                            <Typography sx={{lineHeight: '10px'}} align={"center"} color="primary"
                                        variant="caption">
                                {file.name}
                            </Typography>
                        </ListItemText>
                    )}
                </List>}
        </Stack>
    )
}

interface SelectControllerProps {
    control: Control<any, any, any>
    name: string
    options?: Array<string>
    label: string
    errors?: FieldErrors<any>
}

export function SelectController({label, control, name, options, errors}: SelectControllerProps) {
    const {
        field,
    } = useController({
        name,
        control
    })

    return (
        <FormControl sx={{margin: 5}} error={!!errors?.[name]}>
            <InputLabel id={"select-label"}>{label}</InputLabel>
            <Select
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value || ''}
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

interface AutocompleteControllerProps<T> {
    control: Control<any, any, any>
    name: string
    options: T[]
    getLabel: (option: T) => string,
    getId: (option: T) => string,
    label: string
    errors?: FieldErrors<any>
}

export function AutocompleteController<T, >({
                                                label,
                                                control,
                                                name,
                                                options,
                                                errors,
                                                getLabel,
                                                getId
                                            }: AutocompleteControllerProps<T>) {
    const {
        field,
    } = useController({
        name,
        control,
    })

    return (
        <Autocomplete
            value={field.value}
            onChange={(_, newValue) => {
                field.onChange(newValue)
            }}
            onBlur={field.onBlur}
            getOptionLabel={getLabel}
            isOptionEqualToValue={(option: T, value: T) => getId(option) === getId(value)}
            options={options}
            renderInput={(params) => <TextField
                {...params}
                label={label}
                error={!!errors?.[name]}
                helperText={errors?.[name]?.message?.toString()}/>}
            sx={{margin: 5}}
        >
        </Autocomplete>
    )
}


type Options = {
    label: string,
    id: string
}

interface SearchProjectAutocompleteControllerProps {
    control: Control<any, any, any>
    name: string
    options: Options[]
    label: string
    errors?: FieldErrors<any>
}

export function SearchProjectAutocompleteController({
                                                        label,
                                                        control,
                                                        name,
                                                        options,
                                                        errors
                                                    }: SearchProjectAutocompleteControllerProps) {
    const {
        field,
    } = useController({
        name,
        control
    })

    return (
        <Autocomplete
            value={field.value}
            onChange={(_, newValue) => {
                field.onChange(newValue.id)
            }}
            onBlur={field.onBlur}
            options={options}
            getOptionLabel={(option) => option.label ?? ''}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            renderInput={(params) => <TextField
                {...params}
                label={label}
                error={!!errors?.[name]}
                helperText={errors?.[name]?.message?.toString()}/>}
            sx={{margin: 5}}
        >
        </Autocomplete>
    )
}

interface MultipleAutocompleteControllerProps<T> {
    control: Control<any, any, any>,
    name: string,
    options: T[],
    getLabel: (option: T) => string,
    getId: (option: T) => string,
    label: string,
    errors?: FieldErrors<any>
}

export function MultipleAutocompleteController<T, >({
                                                        label,
                                                        control,
                                                        name,
                                                        options,
                                                        errors,
                                                        getId,
                                                        getLabel
                                                    }: MultipleAutocompleteControllerProps<T>) {
    const {
        field,
    } = useController({
        name,
        control
    })


    return (
        <Autocomplete
            multiple
            value={field.value}
            onChange={(_, newValue) => {
                field.onChange(newValue);
            }}
            onBlur={field.onBlur}
            getOptionLabel={getLabel}
            isOptionEqualToValue={(option: T, value: T) => getId(option) === getId(value)}
            options={options}
            renderInput={(params) => <TextField
                {...params}
                label={label}
                error={!!errors?.[name]}
                helperText={errors?.[name]?.message?.toString()}/>}
            sx={{margin: 5}}
        >
        </Autocomplete>
    )
}