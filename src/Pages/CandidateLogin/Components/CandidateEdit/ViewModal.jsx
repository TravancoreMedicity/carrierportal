import { Box, Card, Modal, ModalClose } from '@mui/joy'
import React from 'react'

const ViewModal = ({ isModalOpenedu, setIsModalOpen, file }) => {
    return (
        <Box>
            <Modal open={isModalOpenedu} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        '@media screen and (max-width: 768px)': {
                            width: "80%",
                        },
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 10,
                        // border: 1
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

                    {/* <CustmTypog title={'Add your Educational Information'} /> */}
                    <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>
                        <Card>

                            <iframe
                                src={file}
                                type="application/pdf"
                                style={{ width: '100%' }}
                                title="PDF Viewer"
                                height={window.innerHeight - 250}

                            />
                        </Card>
                    </Box>
                </Box>
            </Modal >
        </Box>
    )
}

export default ViewModal