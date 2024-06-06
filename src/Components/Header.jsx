import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Typography from '@mui/joy/Typography';

// import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from 'react';
import { Link } from 'react-router-dom';

const pages = ['Products', 'Pricing', 'Blog'];

const Header = () => {

    // const { data: session } = useSession();
    // console.log(session)
    // const { email, image, name } = session?.user
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

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
        <AppBar position="sticky" variant='elevation' sx={{ backgroundColor: '#443460' }} >
            <Container maxWidth="xl" >
                <Toolbar disableGutters variant='dense' >
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, justifyContent: 'center', alignItems: 'inherit' }}  >
                        <IconButton
                            size='small'
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    {/* For small screen start here */}
                    <Box sx={{ flexGrow: { xs: 0, md: 1 }, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='small'
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
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" >{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* For small screen end here */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, flex: 1, mr: 1, justifyContent: 'center', alignItems: 'end' }}  >
                        <Typography >Travancore Medicity</Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }} >
                        <Box sx={{ display: 'block' }} ><Link to="/Home" ><Typography className='hover:text-cyan-700 transition duration-700 ease-in-out' textColor='common.white' level='body-sm' >Home</Typography></Link></Box>
                        {/* <Box sx={{ display: 'block' }} ><Link to="/Admission" ><Typography className='hover:text-cyan-700 transition duration-700 ease-in-out' textColor='common.white' level='body-ssm'>Admission</Typography></Link></Box> */}
                        {/* <Box sx={{ display: 'block' }} ><Link to="/NewsAndEvents" ><Typography className='hover:text-cyan-700 transition duration-700 ease-in-out' textColor='common.white' level='body-sm'>News & Events</Typography></Link></Box> */}
                        <Box sx={{ display: 'block' }} ><Link to="/Courses" ><Typography className='hover:text-cyan-700 transition duration-700 ease-in-out' textColor='common.white' level='body-sm'>Courses</Typography></Link></Box>
                        <Box sx={{ display: 'block' }} ><Link to="/CandidateLogin" ><Typography className='hover:text-cyan-700 transition duration-700 ease-in-out' textColor='common.white' level='body-sm'>Candidate Login</Typography></Link></Box>
                        {/* <Box sx={{ display: 'block' }} ><Link to="/AdminLogin" ><Typography className='hover:text-cyan-700 transition duration-700 ease-in-out' textColor='common.white' level='body-sm'>Official Login</Typography></Link></Box> */}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header