import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../../../assets/logo.png"
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { getUser } from '../../../Redux/LoginSlice'
import Avatar from '@mui/joy/Avatar';
import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy';
import LogoutIcon from '@mui/icons-material/Logout';
import CustBackDropWithState from '../../../Components/CustBackDropWithState';

const CandidateHeader = () => {

    const loggedInfo = useSelector((state) => getUser(state))
    const data = JSON.parse(loggedInfo)
    const imageUrl = data?.image[0]?.value
    const emal = data?.email[0]?.value

    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);

    const handleLogout = () => {
        setOpen(true)
        setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/CandidateLogin")
            setOpen(false)
        }, 1000);
    }


    return (
        // <Box sx={{ flexGrow: 0 }}>
        <AppBar position="sticky" variant='elevation' color='inherit' sx={{ zIndex: 10 }} >
            <CustBackDropWithState open={open} handleClose={setOpen} />
            <Toolbar variant="dense" className='flex items-baseline' >
                {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton> */}
                <Box className='flex items-center ' >
                    {/* <img src="https://travancoremedicity.com/wp-content/uploads/2024/01/Logo-black.svg" alt='Travancore' /> */}
                    <img src={Logo} alt='Travancore' width={30} height={30} />
                    <Typography level="h4" component="div" className='pt-2' >
                        Travancore Medicity
                    </Typography>
                </Box>
                <Box className='flex flex-1 gap-3 ml-16 pt-2'  >
                    <Box className='cursor-pointer' onClick={() => navigate('Registration')} >
                        <Typography level="body-sm" fontWeight="lg" component="div" className='hover:text-[#7c51a1]' >
                            Registration
                        </Typography>
                    </Box>
                    <Box className='cursor-pointer' onClick={() => navigate('ApplicationFeePayment')} >
                        <Typography level="body-sm" fontWeight="lg" component="div" className='hover:text-[#7c51a1]' >
                            Application Fee Payment
                        </Typography>
                    </Box>
                    <Box className='cursor-pointer' onClick={() => navigate('Application')}>
                        <Typography level="body-sm" component="div" fontWeight="lg" className='hover:text-[#7c51a1]' >
                            Application
                        </Typography>
                    </Box >
                    <Box className='cursor-pointer' onClick={() => navigate('CourseSelection')}>
                        <Typography level="body-sm" component="div" fontWeight="lg" className='hover:text-[#7c51a1]' >
                            Course Selection
                        </Typography>
                    </Box>
                    <Box className='cursor-pointer' onClick={() => navigate('ApplicationView')}>
                        <Typography level="body-sm" component="div" fontWeight="lg" className='hover:text-[#7c51a1]' >
                            Application View
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Typography level="body-sm" component="div" fontWeight="lg" >{data?.name}</Typography>
                        <Dropdown>
                            <MenuButton
                                slots={{ root: Avatar }}
                                sx={{ borderRadius: 40 }}
                            >
                                <Avatar alt="Logged User Info" src={imageUrl} />
                            </MenuButton>
                            <Menu
                                placement='left-end'
                                size='sm'
                                variant="outlined"
                                invertedColors
                                aria-labelledby="apps-menu-demo"
                                sx={{
                                    '--List-padding': '0.5rem',
                                    '--ListItemDecorator-size': '3rem',
                                    display: 'flex',
                                    width: 300,
                                    zIndex: 100,
                                    gap: 1,
                                    position: 'absolute',
                                    m: 10
                                }}
                            >
                                <MenuItem className=' w-[100%]' component={Box} >
                                    <Box className="flex flex-1 justify-center items-center flex-col rounded-md" >
                                        <Typography level="body-sm" component="div" fontWeight="lg" className='text-center py-3' >{emal}</Typography>
                                        <Avatar sx={{ width: 100, height: 100 }} alt="Logged User Info" src={imageUrl} />
                                        <Typography
                                            level="title-md" component="div" fontWeight="lg" className='text-center py-3 '
                                            sx={{ color: '#555e7c' }}
                                        >{data?.name}</Typography>
                                    </Box>
                                </MenuItem>
                                <MenuItem
                                    onClick={handleLogout}
                                    className='flex justify-center rounded-lg'
                                    component={Box}
                                >
                                    <LogoutIcon sx={{ color: '#555E7C' }} />
                                    <Typography level="body-md" component="div" fontWeight="lg" sx={{ color: '#555E7C' }}  >Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Dropdown>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
        // </Box>
    )
}

export default CandidateHeader