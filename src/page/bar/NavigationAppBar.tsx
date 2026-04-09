import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Outlet} from "react-router-dom";
import {Box,} from "@mui/material";
import {NavigationButton} from './components/NavigationButton';
import {ProfileButton} from './components/ProfileButton';

export const NavigationAppBar = () => {
    return (
        <AppBar sx={{height: "100vh"}}>
            <Toolbar sx={{justifyContent: "space-between", height: "8vh"}}>
                <NavigationButton/>
                <ProfileButton/>
            </Toolbar>
            <Box sx={{backgroundColor: 'white', height: '92vh'}}>
                <Outlet/>
            </Box>
        </AppBar>
    );
}

