import { Box, Button, Modal, ModalClose, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useMemo } from 'react'
import axioslogin from '../../../../Axios/Axios';
import { succesNofity, warningNofity } from '../../../CommonCode/CommonFunc';

const JobModal = ({ isModalOpen, setIsModalOpen, SelectedData, personalData, setcount }) => {

    const postdata = useMemo(() => {
        return {
            desgid: SelectedData?.desg_id,
            application_slno: personalData?.application_slno
        }
    }, [SelectedData, personalData])
    //to save the all details in the application form
    const handleOnSave = useCallback(async (event) => {
        event.preventDefault()

        const result = await axioslogin.post('/Career/updateJob', postdata)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
            setIsModalOpen(false)
            setcount(1)
        } else {
            warningNofity(message)
        }
    }, [postdata])
    return (
        <Box>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '30%',
                        '@media screen and (max-width: 768px)': {
                            width: "80%",
                        },
                        backgroundColor: '#FFFBF5',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 10,

                    }}
                ><ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Box>
                        <Box sx={{ backgroundColor: "lightblue" }}>
                            <Typography level="body-lg" sx={{ textAlign: 'center', fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', }}>Apply Now</Typography>
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 24, fontWeight: 400, color: '#555555', }}>Job Position</Typography>
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Typography level="body-xs" sx={{ textTransform: 'capitalize', fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', }}>{SelectedData?.desg_name?.toLowerCase()}</Typography>
                        </Box>

                        <Box sx={{}}>
                            <Typography level="body-xs" sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', }}>Experience :({SelectedData?.experiencefrom}-{SelectedData?.experienceto})</Typography>
                        </Box>


                    </Box>

                    <Box sx={{ mt: 2, display: 'flex', gap: 1, width: "100%", }}>
                        <Tooltip title="Save">
                            <Button
                                variant="outlined"
                                component="label"
                                size="md"
                                color="primary"
                                sx={{ width: '100%', fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', }}
                                onClick={handleOnSave}
                            >

                                Apply for Job
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
            </Modal >
        </Box>
    )
}

export default memo(JobModal)