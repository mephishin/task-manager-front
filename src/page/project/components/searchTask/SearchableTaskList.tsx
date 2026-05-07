import React, {useMemo, useState} from 'react';
import Box from '@mui/material/Box';
import {
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import {useNavigate} from "@tanstack/react-router";

export interface TaskOption {
    id: string;
    name: string;
    status: string;
}

interface SearchableTaskListProps {
    options: TaskOption[];
    label: string;
}

const SearchableList: React.FC<SearchableTaskListProps> = ({options, label}) => {
    const [searchQuery, setSearchQuery] = useState('');


    const filteredOptions = useMemo(() => {
        if (!searchQuery) {
            return options;
        }
        const queryLower = searchQuery.toLowerCase();
        return options.filter(option =>
            option.name.toLowerCase().includes(queryLower)
        );
    }, [searchQuery, options]);

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSelect = (option: TaskOption) => {
        // @ts-ignore
        navigate({to: `/task/${option.id}`});
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <TextField
                fullWidth
                label={label}
                variant="outlined"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Начните вводить текст..."
            />

            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ключ задачи</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell>Статус</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOptions.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell>
                                    <Link component="button"
                                          variant="body2"
                                          onClick={() => handleSelect(row)}>
                                        <Typography color="primary">
                                            {row.id}
                                        </Typography>
                                    </Link></TableCell>
                                <TableCell>
                                    <Typography color='#656565'>
                                        {row.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color='#656565'>
                                        {row.status}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SearchableList;