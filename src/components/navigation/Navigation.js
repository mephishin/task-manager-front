import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Outlet} from "react-router-dom";
import {Link} from "@mui/material";
import AuthService from "../../AuthService";

const pages = [
    {
        name: 'Something else',
        link: '/something_else'
    },
    {
        name: 'Tasks',
        link: '/tasks'
    }
];
const settings = [
    {
        name: 'Profile',
        link: '/profile'
    },
    {
        name: 'Account',
        link: '/account'

    },
    {
        name: 'Dashboard',
        link: '/dashboard'
    },
    {
        name: 'Logout',
        link: '/logout'

    }
];


export const Navigation = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar>
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                <Box>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        keepMounted
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} href={page.link}>
                                <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Box>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        keepMounted
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting.name} onClick={() => {
                                handleCloseUserMenu();
                                AuthService.doLogout();
                            }

                            }>
                                <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
            <Outlet />
        </AppBar>
    );
}
