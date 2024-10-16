import { Box, Modal, ModalDialog, Typography } from '@mui/joy'
import React, { memo, useCallback, } from 'react'
import ModalClose from '@mui/joy/ModalClose';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
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
const CareerModal = ({ setIsModalOpenmain, isModalOpenmain, SelectedData, isModalOpen, setIsModalOpen }) => {


    const onClose = useCallback((e) => {
        setIsModalOpenmain(false)
    }, [setIsModalOpenmain])


    const handleonclick = useCallback(async (e) => {
        setIsModalOpen(true)
    }, [setIsModalOpen]);

    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={isModalOpenmain}
                onClose={onClose}
                // closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog size='sm' sx={{ width: '70%', backgroundColor: '#FFFBF5', }}>
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
                    <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1, display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ width: '80%' }}>
                            <Box sx={{ borderBottom: '1px solid #DFDFDF', }}>
                                <Typography textAlign="center" sx={{
                                    fontFamily: "Bahnschrift", color: '#555555',
                                    fontSize: {
                                        xs: 20,
                                        sm: 40,
                                    },
                                    fontWeight: {
                                        xs: 20,
                                        sm: 10,
                                    },
                                }}>{SelectedData?.desg_name}</Typography>
                            </Box>


                            <Box sx={{ mt: 2 }}>
                                <Typography textAlign="center" level="body-md" sx={{ color: '#FF76CE', fontFamily: "Bahnschrift" }}>JOB DESCRIPTION</Typography>
                            </Box>

                            <Box sx={{ mt: 1 }}>
                                {/* Check if job_descriptions exists and is an array */}
                                {SelectedData?.job_descriptions && Array.isArray(SelectedData?.job_descriptions) ? (
                                    SelectedData.job_descriptions.map((description, index) => (

                                        <Typography key={index} sx={{ mb: 1, fontFamily: "Bahnschrift", }}>
                                            <ArrowRightIcon />  {description}
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography level="body-sm">
                                        No job descriptions available.
                                    </Typography>
                                )}
                            </Box>


                            <Box sx={{ mt: 2 }}>
                                <Typography textAlign="center" level="body-md" sx={{ color: '#FF76CE', fontFamily: "Bahnschrift" }}>Skills</Typography>
                            </Box>

                            <Box sx={{ mt: 1 }}>
                                {/* Check if job_descriptions exists and is an array */}
                                {SelectedData?.skills && Array.isArray(SelectedData?.skills) ? (
                                    SelectedData?.skills.map((skills, index) => (
                                        <Typography key={index} sx={{ mb: 1, fontFamily: "Bahnschrift", }}>
                                            <ArrowRightIcon /> {skills}
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography level="body-sm" sx={{ fontFamily: "Bahnschrift", color: '#555555', }}>
                                        No job descriptions available.
                                    </Typography>
                                )}
                            </Box>

                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{
                                    border: '1px solid #FF76CE', width: "200px", p: 1,
                                    '&:hover': {
                                        border: '1px solid #F70776',
                                        cursor: 'pointer'
                                    },
                                }} onClick={(e) => handleonclick(e,)}>
                                    <Typography textAlign="center" level="body-md" sx={{ fontFamily: "Bahnschrift", color: '#555555', }}>APPLAY NOW</Typography>

                                </Box>
                            </Box>

                        </Box>

                    </Box>

                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(CareerModal)