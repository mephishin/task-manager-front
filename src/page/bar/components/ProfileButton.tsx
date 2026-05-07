import * as React from "react";
import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {useAuth} from "../../../AuthProvider";

export const ProfileButton = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>();

    const {logout, getRoles, getUsername} = useAuth();

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
                anchorEl={anchorElUser}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={() => {
                    handleCloseUserMenu();
                    logout();
                }}>
                    <Typography sx={{textAlign: 'center'}}>Выйти</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography sx={{textAlign: 'center'}}>Никнейм: {getUsername()}</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography sx={{textAlign: 'center'}}>Роли: [{getRoles()}]</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}