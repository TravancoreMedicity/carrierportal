import { Box, Button, IconButton, Modal, ModalClose, ModalDialog, Textarea, Tooltip, Typography, } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
// import InputComponent from '../../../Muicomponents/InputComponent';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { succesNofity, warningNofity } from '../../../CommonCode/CommonFunc';
import axioslogin from '../../../../Axios/Axios';
import Files from 'react-files'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

const AboutModal = ({ setCareerModalOpenAbout, isModalOpenAbout, ApplicationId, count, setcount, Aboutme, Setaboutme }) => {

    const [exclusions, setExclusions] = useState(false)
    const [selectedFile, setSelectedFile] = useState([])

    // HANDLER
    const handleChange = (files) => {
        if (files.length > 1) {
            setExclusions(false)
        }
        // setFiles(files[0])
        setSelectedFile(files)
    }

    /**
     * Handles file upload errors based on the error code.

     * @param {Object} error - The error object containing the error code.
     * @param {File} file - The file that caused the error.
     * @return {void} No return value.
     */

    const handleError = (error, file) => {
        const { code } = error
        if (code === 1) {
            warningNofity('Upload failed. Invalid file type')
        } else if (code === 2) {
            warningNofity('Upload failed. File too large')
        } else if (code === 3) {
            warningNofity('Upload failed. File too small')
        } else {
            warningNofity('Upload failed. Maximum file count reached')
        }
    }
    const handleUpload = useCallback(
        async (event) => {
            event.preventDefault()

            try {
                if (!selectedFile?.length) {
                    warningNofity('Please select files to upload.')
                    return
                }
                const formData = new FormData()
                formData.append('em_id', ApplicationId)
                formData.append('files', selectedFile[0])
                const result = await axioslogin.post('/upload/uploadimage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                const { success, message } = result.data

                if (success === 1) {

                    setSelectedFile([])
                    setCareerModalOpenAbout(false)

                    setcount(count + 1)
                    succesNofity(message)
                } else {
                    warningNofity(message)
                }
            } catch (error) {
                warningNofity('An error occurred during file upload.')
            }
        },
        [selectedFile, ApplicationId, count],
    )

    const onClose = useCallback((e) => {
        setCareerModalOpenAbout(false)
    }, [setCareerModalOpenAbout])


    const handleRemoveFile = useCallback((index) => {
        const newFiles = [...selectedFile]
        newFiles.splice(index, 1)
        setSelectedFile(newFiles)
        // Reset the file input value to allow selecting the same file again
        const fileInput = document.getElementById('file-input')
        if (fileInput) {
            fileInput.value = null
        }
    }, [setSelectedFile, selectedFile])

    const checkData = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
            desc: Aboutme

        }
    }, [ApplicationId, Aboutme])
    const SubmitFormData = useCallback(
        async (event) => {
            event.preventDefault()
            const result = await axioslogin.post(`/career/updateAbout`, checkData)
            const { success, message } = result.data
            if (success === 2) {
                setcount(count + 1)
                setCareerModalOpenAbout(false)

                succesNofity(message)
            }
        }, [checkData, count])

    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={isModalOpenAbout}
                onClose={onClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog size='sm' sx={{
                    width: '50%', backgroundColor: '#FFFBF5',
                    '@media screen and (max-width: 768px)': {
                        width: '100%',

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
                    <Box sx={{ p: 1, height: window.innerHeight - 450, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Typography level="body-md" sx={{ fontFamily: "Bahnschrift", fontSize: 20, fontWeight: 350, color: '#555555', }}>About </Typography>
                            <EditIcon sx={{ color: "#555555" }} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 1 }}>
                            <Textarea
                                variant="plain"
                                placeholder={"Aboutme"}
                                type="text"
                                value={Aboutme}
                                name="Aboutme"
                                onChange={(e) => Setaboutme(e.target.value)}
                                size="sm"
                                minRows={2}
                            />

                        </Box>
                        <Box sx={{ mt: 2, textAlign: 'end' }}>
                            <Button variant="outlined" size='sm'
                                onClick={SubmitFormData}
                                sx={{
                                    color: '#555555',
                                    width: '100%',
                                    '@media screen and (max-width: 768px)': {
                                        width: '30%'

                                    },
                                }}>
                                Update
                            </Button>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Typography level="body-md" sx={{ fontFamily: "Bahnschrift", fontSize: 20, fontWeight: 350, color: '#555555', }}>Update Profile Picture </Typography>
                            <EditIcon sx={{ color: "#555555" }} />
                        </Box>


                        <Box sx={{ textAlign: 'center', justifyContent: 'center', mt: 1 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    width: { xs: '100%', },
                                }}
                            >
                                {selectedFile.map((file, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            borderRadius: 20,
                                            p: 0.5,
                                            alignItems: 'center',
                                            backgroundColor: '#E1E5EA',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography level='body-xs' sx={{ fontFamily: "Bahnschrift", fontSize: 14, fontWeight: 350, color: '#555555', }}>{file?.name}</Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                p: 0,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    color: '#FF6868',
                                                },
                                            }}
                                        >
                                            <Tooltip title="Close">
                                                <Box sx={{ p: 0 }} aria-label="Close"
                                                    onClick={() => handleRemoveFile(index)}
                                                >
                                                    <CloseSharpIcon fontSize='small' sx={{ color: "#555555" }} />
                                                </Box>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                            <Box sx={{ display: 'flex', mt: 1 }}>
                                <Box sx={{
                                    width: '10%',
                                }}>
                                    <Tooltip title="Upload Image">
                                        <IconButton size='sm' sx={{
                                            border: '1px solid #555555',
                                            borderRadius: '18px', width: '100%'
                                        }}  >
                                            <Files

                                                className='files-dropzone'
                                                onChange={handleChange}
                                                onError={handleError}
                                                accepts={['image/png', 'image/jpeg', 'image/jpg']}
                                                multiple={false}
                                                maxFileSize={2000000}
                                                minFileSize={0}
                                                clickable={!exclusions}
                                                style={{ width: '100%' }}
                                            >
                                                <Box sx={{ width: '100%', }}>

                                                    <FileUploadIcon sx={{ color: "#555555" }} />
                                                </Box>
                                            </Files>

                                        </IconButton>
                                    </Tooltip>
                                </Box>


                                <Box sx={{
                                    width: '10%',
                                }} onClick={handleUpload}>
                                    <Tooltip title="Save Image">
                                        <IconButton size='sm' sx={{
                                            border: '1px solid #555555',
                                            borderRadius: '18px', width: '100%'
                                        }}

                                        >
                                            <SaveIcon sx={{ color: "#555555" }} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>


                        </Box>
                    </Box>

                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(AboutModal)