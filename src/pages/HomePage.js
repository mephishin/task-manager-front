import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HomePage() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
                HOME PAGE
            </Typography>
        </Box>
    );
}