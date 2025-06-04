import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import {Box, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Project} from "../../model/project/Project";

const pages = [
    {
        name: 'My project',
        link: '/project'
    }
];

interface NavigationButtonProps {
    setProject: (value: (((prevState: (Project | null)) => (Project | null)) | Project | null)) => void
}

export const NavigationButton = ({setProject} : NavigationButtonProps) => {
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>();
    const navigate = useNavigate();
    const handleCloseNavMenu = () => {
        navigate(`/project`)
        setProject(null)
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
                id="menu-appbar"
                anchorEl={anchorElNav}
                keepMounted
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
            >
                {pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                        <Typography sx={{textAlign: 'center'}}>{page.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}