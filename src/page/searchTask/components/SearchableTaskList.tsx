import React, { useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export interface TaskOption {
    id: string;
    name: string;
    project: string

}

interface SearchableTaskListProps {
    options: TaskOption[];
    label: string;
    onSelect: (selectedOption: TaskOption) => void;
}

const SearchableList: React.FC<SearchableTaskListProps> = ({ options, label, onSelect }) => {
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSelect = (option: TaskOption) => {
        console.log(option)
        onSelect(option);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 1000 }}>
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
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Project</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOptions.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                                    <Typography color="black">
                                        {row.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Link component="button"
                                        variant="body2"
                                        onClick={() => handleSelect(row)}>
                                        <Typography color="primary">
                                            {row.project}
                                        </Typography>
                                    </Link></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SearchableList;