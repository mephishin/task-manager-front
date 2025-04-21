import {useController} from "react-hook-form";
import {Autocomplete, FormControl, InputLabel, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export function InputController({ control, name }) {
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
            name={field.name} // send down the input name
            inputRef={field.ref} // send input ref, so we can focus on input when error appear
            label={field.name}
            sx={{margin: 5}}
        />
    )
}

export function SelectController({ control, name, options}) {
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
                name={field.name} // send down the input name
                inputRef={field.ref} // send input ref, so we can focus on input when error appear
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

export function AutocompleteController({ control, name, options}) {
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
            inputRef={field.name}
            name={field.name}
            options={options}
            renderInput={(params) => <TextField {...params} label={field.name}/>}
            sx={{margin: 5}}
        >
        </Autocomplete>
    )
}