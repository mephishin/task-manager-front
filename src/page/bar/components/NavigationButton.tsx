import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import {Box, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { Project } from "../../../model/project/Project";

const pages = [
    {
        name: 'Мой проект',
        link: '/'
    }
];

interface NavigationButtonProps {
    authUserProject: Project
}

export const NavigationButton = ({authUserProject} : NavigationButtonProps) => {
    const navigate = useNavigate();
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>();
    const handleCloseNavMenu1 = () => {
        navigate(`project/${authUserProject.key}`)
        setAnchorElNav(null);
    };

    return(
        <Box>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id={authUserProject.key}
                anchorEl={anchorElNav}
                keepMounted
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu1}
            >
                {pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu1}>
                        <Typography sx={{textAlign: 'center'}}>{page.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}