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

const CandidateHeader = () => {

    const loggedInfo = useSelector((state) => getUser(state))
    const data = JSON.parse(loggedInfo)
    const imageUrl = data?.image[0]?.value

    const navigate = useNavigate()

    return (
        <Box sx={{ flexGrow: 0 }}>
            <AppBar position="static" color='inherit' >
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
                            <Avatar alt="Logged User Info" src={imageUrl} />
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default CandidateHeader