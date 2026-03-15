import AuthService from "../../AuthService";
import * as React from "react";
import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";

export const ProfileButton = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return(
        <Box>
            <Tooltip title="">
                <IconButton onClick={handleOpenUserMenu}>
                    <Avatar alt="Remy Sharp"/>
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem key="Logout" onClick={() => {
                    handleCloseUserMenu();
                    AuthService.doLogout();
                }}>
                    <Typography sx={{textAlign: 'center'}}>Выйти</Typography>
                </MenuItem>
                <MenuItem key="Role">
                    <Typography sx={{textAlign: 'center'}}>Роли: {AuthService.getRoles()}</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}