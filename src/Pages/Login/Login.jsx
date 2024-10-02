import { Box, Modal, ModalClose, ModalDialog, Typography, useTheme } from '@mui/joy'
import React, { memo, useCallback, useEffect } from 'react'
import Google from '../../assets/Google.png'
import { login } from '../../Redux/LoginSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from '@mui/material'
import { Url } from '../../Constant/Static'

const Login = ({ setIsModalOpen, isModalOpen }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const onClose = useCallback((e) => {
        setIsModalOpen(false)
    }, [setIsModalOpen])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const googleRedirectToGoogle = () => {
        // window.location.href = 'https://localhost:5000/auth/google';
        window.location.href = `http://travancoremedicity.in:5003/auth/google`;
    };
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('usdsa');
        const info = query.get('info');
        if (token !== null) {
            localStorage.setItem('token', token);
            dispatch(login({ token, info }));
            navigate('/CareerHome', { replace: true });
            // navigate('/Career', { replace: true });
        }
    }, [])
    return (

        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={isModalOpen}
                onClose={onClose}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    // backgroundColor: 'red'
                }}
            >
                <ModalDialog size='sm'
                    layout="center"
                    sx={{
                        // backgroundColor: 'red',
                        width: '25%',
                        animation: isModalOpen ? 'fadeInScale 0.1s ease forwards' : 'none',
                        '@keyframes fadeInScale': {
                            '0%': {
                                opacity: 0,
                                transform: 'scale(1.2)',
                            },
                            // '100%': {
                            //     opacity: 1,
                            //     // transform: 'scale(1)',
                            // },
                        },

                    }}>
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Box className="flex flex-1 flex-col justify-items-center bg-slate-50 p-4 rounded-lg bg-opacity-90" sx={{}} >
                        {/* <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}> */}
                        <Box sx={{ width: "100%", display: 'flex', p: 1 }} className="shadow-lg">
                            <Box className="flex  items-center space-x-2  " >
                                <Box className="flex" sx={{}} >
                                    <img
                                        src={Google}
                                        alt='Google Image'
                                        width={35}
                                        height={35}
                                    />
                                </Box>
                                <Typography level='body-lg' >Sign in with Google</Typography>

                            </Box>
                        </Box>

                        <Box sx={{ mt: 1 }}>
                            <Typography level='h4' >Sign up or sign in to Travancore Career  </Typography>
                        </Box>
                        <Box sx={{ mt: 1, }}>
                            <Typography level='body-sm' >To Continue,Google will share your name, email, address, and profile picture with Travancore Career .  </Typography>
                        </Box>
                        {/* for responsive */}
                        {isMobile ? (<Box
                            className="flex cursor-pointer items-center   border  bg-gradient-to-r "
                            onClick={googleRedirectToGoogle} sx={{
                                mt: 3, gap: .5, '&:hover': {
                                    border: '1px solid #F70776',

                                },
                            }}
                        >
                            <Box className="flex" sx={{}} >
                                <img
                                    src={Google}
                                    alt='Google Image'
                                    width={35}
                                    height={35}
                                />
                            </Box>
                            <Typography level='h4' >Sign in with Google</Typography>
                        </Box>
                        ) : (
                            <Box
                                className="flex cursor-pointer items-center space-x-2 px-10  border  bg-gradient-to-r "
                                onClick={googleRedirectToGoogle} sx={{
                                    mt: 3, justifyContent: 'center', '&:hover': {
                                        border: '1px solid #F70776',

                                    },
                                }}
                            >
                                <Box className="flex" sx={{}} >
                                    <img
                                        src={Google}
                                        alt='Google Image'
                                        width={45}
                                        height={45}
                                    />
                                </Box>
                                <Typography level='h4' >Sign in with Google</Typography>
                            </Box>)}

                        {/* </Box> */}

                    </Box>
                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(Login)