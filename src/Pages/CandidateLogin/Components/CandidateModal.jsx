import { Box, Modal, ModalClose, ModalDialog, } from '@mui/joy'
import React, { lazy, memo, useCallback } from 'react'


const ContactInformation = lazy(() => import('../Components/ApplicationForm/ContactInformation'))


const CandidateModal = ({ setCareerModalOpen, isModalOpen, ApplicationId, count, setcount }) => {


    const onClose = useCallback((e) => {
        setCareerModalOpen(false)
    }, [setCareerModalOpen])


    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={isModalOpen}
                onClose={onClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}
            >
                <ModalDialog size='sm' sx={{ width: '85%' }}>
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

                    <ContactInformation ApplicationId={ApplicationId} setCareerModalOpen={setCareerModalOpen} count={count} setcount={setcount} />
                    {/* </Box> */}
                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(CandidateModal)