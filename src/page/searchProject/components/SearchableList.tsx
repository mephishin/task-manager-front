import React, { useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { Link, Typography } from '@mui/material';

export interface OptionType {
    id: string | number;
    label: string;
}

interface SearchableListProps {
    options: OptionType[];
    label: string;
    onSelect: (selectedOption: OptionType) => void;
}

const SearchableList: React.FC<SearchableListProps> = ({ options, label, onSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');


    const filteredOptions = useMemo(() => {
        if (!searchQuery) {
            return options;
        }
        const queryLower = searchQuery.toLowerCase();
        return options.filter(option =>
            option.label.toLowerCase().includes(queryLower)
        );
    }, [searchQuery, options]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSelect = (option: OptionType) => {
        console.log(option)
        onSelect(option);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 500 }}>
            <TextField
                fullWidth
                label={label}
                variant="outlined"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Начните вводить текст..."
            />

            <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                        <ListItem disablePadding key={option.id}>
                            <ListItemText sx={{ color: "black" }}>
                                <Link component="button"
                                    variant="body2"
                                    onClick={() => handleSelect(option)}>
                                    <Typography color="primary">
                                        {option.label}
                                    </Typography>
                                </Link>
                            </ListItemText>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="Ничего не найдено" sx={{ opacity: 0.7 }} />
                    </ListItem>
                )}
            </List>
        </Box>
    );
};

export default SearchableList;