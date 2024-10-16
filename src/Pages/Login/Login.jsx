import { Box, Modal, ModalClose, ModalDialog, Typography, useTheme } from '@mui/joy'
import React, { memo, useCallback, useEffect } from 'react'
import Google from '../../assets/Google.png'
import { login } from '../../Redux/LoginSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from '@mui/material'
import { Url } from '../../Constant/Static'
import { useSpring, animated } from '@react-spring/web';
import { Backdrop } from '@mui/material';


const Fade = React.forwardRef((props, ref) => {
    const { in: open, children, ownerState, ...other } = props
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

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
                // closeaftertransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
                onClose={onClose}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    // backgroundColor: 'red'
                }}
            >
                <ModalDialog size='sm'
                    layout="center"
                    sx={{
                        backgroundColor: '#FFFBF5',
                        width: '25%',


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
                    <Box className="flex flex-1 flex-col justify-items-center  p-4 rounded-lg bg-opacity-90" sx={{}} >
                        {/* <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}> */}
                        {/* <Box sx={{ width: "100%", display: 'flex', p: 1 }} className="shadow-lg">
                            <Box className="flex  items-center space-x-2  " >
                                <Box className="flex" sx={{}} >
                                    <img
                                        src={Google}
                                        alt='Google Image'
                                        width={35}
                                        height={35}
                                    />
                                </Box>
                                <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 22, fontWeight: 400, }}>Sign in with Google</Typography>

                            </Box>
                        </Box> */}

                        <Box sx={{ mt: 1 }}>
                            <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 21, fontWeight: 500, }} >Sign up or sign in to Travancore Career  </Typography>
                        </Box>
                        <Box sx={{ mt: 1, }}>
                            <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 13, fontWeight: 300, color: '#555555', }} >To Continue,Google will share your name, email, address, and profile picture with Travancore Career .  </Typography>
                        </Box>
                        {/* for responsive */}
                        {isMobile ? (<Box
                            className="flex cursor-pointer items-center   border  bg-gradient-to-r "
                            onClick={googleRedirectToGoogle} sx={{
                                borderRadius: 20,
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
                                    borderRadius: 20,
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
                                <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 22, fontWeight: 400, }} >Sign in with Google</Typography>
                            </Box>)}

                        {/* </Box> */}

                    </Box>
                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(Login)