import {SearchTask} from "../../model/task/SearchTask";
import * as React from "react";
import {Autocomplete, Box, FormControl, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSearchTaskGet} from "../../hooks/query/task/useTask";

export const TaskAutocomplete = () => {
    const searchTasks = useSearchTaskGet();
    const navigate = useNavigate();
    const onChangeSearchTaskHandler = (newValue: SearchTask | null) => {
        if (newValue) {
            navigate(`/task/${newValue.key}`)
        }
    };

    return(
        <Box>
            <FormControl sx={{minWidth: 300, backgroundColor: "white", borderRadius: 2, margin: 1, padding: 1}}>
                <Autocomplete
                    options={searchTasks.data}
                    loading={searchTasks.isLoading}
                    onChange={(event, newValue) => onChangeSearchTaskHandler(newValue)}
                    getOptionLabel={(option: SearchTask) => option.name}
                    renderInput={(params) => <TextField {...params} label="task"/>}
                    filterOptions={(options: Array<SearchTask>, state: any) => {
                        return options.filter((option: SearchTask) =>
                            option.key.includes(state.inputValue) || option.name.includes(state.inputValue) || option.description.includes(state.inputValue))
                    }}
                >
                </Autocomplete>
            </FormControl>
        </Box>
    )
}