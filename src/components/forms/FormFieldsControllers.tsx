import { Control, FieldErrors, useController } from "react-hook-form";
import { Autocomplete, Box as Stack, Button, FormControl, FormHelperText, InputLabel, Select, styled, TextField, SxProps, Box } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MenuItem from "@mui/material/MenuItem";
import { Theme } from "@emotion/react";
import { ComponentPropsWithoutRef } from "react";

const VisuallyHiddenInput = styled('input')({
    //     clip: 'rect(0 0 0 0)',
    //     clipPath: 'inset(50%)',
    //     height: 1,
    //     overflow: 'hidden',
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 0,
    //     whiteSpace: 'nowrap',
    //     width: 1,
    //     position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0, // Делаем невидимым
    cursor: 'pointer', // Показываем курсор при наведении
    zIndex: 1, // Кладем поверх кнопки
});

interface InputControllerProps {
    control: Control<any, any, any>,
    name: string,
    label: string
    errors?: FieldErrors<any>,
}

type ComposedInputControllerProps = InputControllerProps & ComponentPropsWithoutRef<typeof TextField>;

export function InputController({ label, control, name, errors, ...textFieldProps }: ComposedInputControllerProps) {
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

export function InputFileController({ label, control, name, errors, ...buttonProps }: ComposedInputFileControllerProps) {
    const { field } = useController({ name, control, })

    return (
        <Box sx={{ position: 'relative' }}>
            <Button role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                {...buttonProps}
            >
                {label}
            </Button>
            <input
                type="file"
                multiple
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0, // Делаем невидимым
                    cursor: 'pointer', // Показываем курсор при наведении
                    zIndex: 1, // Кладем поверх кнопки
                }}
                onChange={(event) => event.target.files ? field.onChange(Array.from(event.target.files)) : field.onChange([])} // Передаем обработчик изменения
            />
        </Box>

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
    } = useController({
        name,
        control
    })

    return (
        <FormControl sx={{ margin: 5 }} error={!!errors?.[name]}>
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

interface AutocompleteControllerProps {
    control: Control<any, any, any>
    name: string
    options: Options[]
    label: string
    errors?: FieldErrors<any>
}

export function AutocompleteController({ label, control, name, options, errors }: AutocompleteControllerProps) {
    const {
        field,
    } = useController({
        name,
        control
    })


    return (
        <Autocomplete
            value={field.value}
            onChange={(event, newValue) => {
                field.onChange(newValue)
            }}
            onBlur={field.onBlur}
            getOptionLabel={(option) => option.label ?? ''}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
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

export function SearchProjectAutocompleteController({ label, control, name, options, errors }: SearchProjectAutocompleteControllerProps) {
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
                helperText={errors?.[name]?.message?.toString()} />}
            sx={{ margin: 5 }}
        >
        </Autocomplete>
    )
}

interface MultipleAutocompleteControllerProps {
    control: Control<any, any, any>,
    name: string,
    options: Options[],
    label: string,
    errors?: FieldErrors<any>
}

export function MultipleAutocompleteController({ label, control, name, options, errors }: MultipleAutocompleteControllerProps) {
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
            onChange={(event, newValue) => {
                field.onChange(newValue)
            }}
            onBlur={field.onBlur}
            getOptionLabel={(option) => option.label ?? ''}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
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