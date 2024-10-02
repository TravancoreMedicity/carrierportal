import { Box, Button, IconButton, Modal, ModalClose, ModalDialog, Option, Select, Table, Tooltip, Typography, } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
// import InputComponent from '../../../Muicomponents/InputComponent';
import { succesNofity, warningNofity } from '../../../CommonCode/CommonFunc';
import axioslogin from '../../../../Axios/Axios';
import DeleteIcon from '@mui/icons-material/Delete';
import imageCompression from 'browser-image-compression'
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

const ViewModalCert = lazy(() => import('../CandidateEdit/ViewModalCertificate'))


const CertificateModal = ({ setCareerModalOpenCertificate, isModalOpenCertificate, ApplicationId, count, setcount }) => {

    const [selectedFiles, setSelectedFiles] = useState([])
    const [tableData, setTableData] = useState([])
    // const [count, setCount] = useState(0)
    const [value, setvalue] = useState(0)
    const [countdata, setCountdata] = useState(0)


    const [file, setFile] = useState([])
    const [isModalOpenedu, setIsModalOpen] = useState(false)


    //already uploded file
    const checkData = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
        }
    }, [ApplicationId])

    useEffect(() => {
        const getJobSkills = async (checkData) => {
            const result = await axioslogin.post('/upload/filesCertificate', checkData)
            const { success, data } = result.data
            if (success === 1 && data.length > 0) {
                setCountdata(0)
                // setTableData(data[0])

                // Construct URLs for each file using the file names
                const fileUrls = data.map((fileName) => {
                    return `http://192.168.10.88/NAS/Career/Certificate/${ApplicationId}/${fileName}`;

                });
                // setFiles(fileNames)
                fileUrls.forEach((fileUrl) => {
                    setTableData(fileUrls)
                });
            }
            else {
                setTableData([])
            }
        }
        getJobSkills(checkData)

    }, [countdata, checkData])

    const handleFileChange = useCallback((e) => {
        const newFiles = [...selectedFiles]
        newFiles.push(e.target.files[0])
        setSelectedFiles(newFiles)
    }, [setSelectedFiles, selectedFiles])

    const handleRemoveFile = useCallback((index) => {
        const newFiles = [...selectedFiles]
        newFiles.splice(index, 1)
        setSelectedFiles(newFiles)
        // Reset the file input value to allow selecting the same file again
        const fileInput = document.getElementById('file-input')
        if (fileInput) {
            fileInput.value = null
        }
    }, [setSelectedFiles, selectedFiles])


    const handleImageUpload = useCallback(async (imageFile) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        const compressedFile = await imageCompression(imageFile, options)
        return compressedFile
    }, []);





    const EditData = useCallback((filename) => {
        setFile(filename)
        setIsModalOpen(true)
    }, [setIsModalOpen])

    const handleUpload = useCallback(
        async (event) => {
            event.preventDefault();

            if (value === 0) {
                warningNofity('Please select the certificate');
                return;
            }

            if (!selectedFiles?.length) {
                warningNofity('Please select files to upload.');
                return;
            }

            const allowedTypes = ['image/', 'application/pdf'];
            const formData = new FormData();
            formData.append('em_id', ApplicationId);
            formData.append('value', value);

            for (const file of selectedFiles) {
                const fileType = file.type.split('/')[0];

                if (allowedTypes.some(type => file.type.startsWith(type))) {
                    if (file.type.startsWith('image')) {
                        const compressedFile = await handleImageUpload(file);
                        formData.append('files', compressedFile, compressedFile.name);
                    } else {
                        formData.append('files', file, file.name);
                    }
                } else {
                    warningNofity('Unsupported file type ');
                    setSelectedFiles([]);
                    return;
                }
            }

            try {
                const result = await axioslogin.post('/upload/uploadmultipleCertificate', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const { success, message } = result.data;


                if (success === 1) {
                    setSelectedFiles([]);
                    setvalue(0);
                    setCountdata(countdata + 1);
                    succesNofity(message);
                    setcount(count + 1)
                    setCareerModalOpenCertificate(false)
                } else {
                    warningNofity(message);
                }
            } catch (error) {
                warningNofity('Upload failed. Please try again.');
                console.error('Upload error:', error);
            }
        },
        [selectedFiles, ApplicationId, handleImageUpload, countdata, value, count],
    );


    const DeleteItem = useCallback(async (file) => {
        // setFilename(file)
        const postdata = {
            ApplicationId: ApplicationId,
            filename: file,
        };
        const result = await axioslogin.post("/upload/deleteCertfile", postdata)
        const { success, message } = result?.data
        if (success === 1) {
            setCountdata(countdata + 1)
            succesNofity(message)
            setcount(count + 1)
            setCareerModalOpenCertificate(false)
        } else {
            warningNofity(message)
        }

    }, [countdata, count])

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setvalue(value)
        }
        else {
            setvalue(0)
        }
        return
    }, [setvalue])
    const onClose = useCallback((e) => {
        setCareerModalOpenCertificate(false)
    }, [setCareerModalOpenCertificate])
    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={isModalOpenCertificate}
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
                    <Box>
                        <Box

                            sx={{

                                borderRadius: 'md',
                                // boxShadow: 'lg',
                                marginTop: 2,
                                '@media screen and (max-width: 768px)': {
                                    padding: 1,
                                },
                            }}>
                            <Box sx={{}}>
                                <Typography sx={{
                                    fontFamily: "Bahnschrift",
                                    fontSize: 18,
                                    fontWeight: 450,
                                    color: '#555555',
                                }}  >
                                    Upload Certificate
                                </Typography>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <Select
                                    value={value}
                                    onChange={(event, newValue) => {
                                        Onclick(newValue);
                                    }}
                                    size='md'
                                    variant='outlined'
                                    placeholder="Attach Resume / Certificates etc."
                                    sx={{
                                        fontFamily: "Bahnschrift",
                                        fontSize: 16,
                                        fontWeight: 450,
                                        color: '#555555',
                                    }}
                                >
                                    <Option disabled value={0} sx={{
                                        fontFamily: "Bahnschrift",
                                        fontSize: 16,
                                        fontWeight: 450,
                                        color: '#555555',
                                    }}>Attach Resume / Certificates etc. </Option>
                                    <Option value={1} sx={{
                                        fontFamily: "Bahnschrift",
                                        fontSize: 16,
                                        fontWeight: 450,
                                        color: '#555555',
                                    }}>  10 th </Option>
                                    <Option value={2} sx={{
                                        fontFamily: "Bahnschrift",
                                        fontSize: 16,
                                        fontWeight: 450,
                                        color: '#555555',
                                    }}>  Plus two </Option>
                                    <Option value={3} sx={{
                                        fontFamily: "Bahnschrift",
                                        fontSize: 16,
                                        fontWeight: 450,
                                        color: '#555555',
                                    }}>  UG </Option>
                                    <Option value={4} sx={{
                                        fontFamily: "Bahnschrift",
                                        fontSize: 16,
                                        fontWeight: 450,
                                        color: '#555555',
                                    }}>  PG </Option>
                                    <Option value={5} sx={{
                                        fontFamily: "Bahnschrift",
                                        fontSize: 16,
                                        fontWeight: 450,
                                        color: '#555555',
                                    }}>  Other </Option>
                                    <Option value={6} sx={{
                                        fontFamily: "Bahnschrift",
                                        fontSize: 16,
                                        fontWeight: 450,
                                        color: '#555555',
                                    }}>  Resume </Option>

                                </Select>
                            </Box>
                            <Box
                                sx={{
                                    mt: 1,
                                    border: "3px dotted #DFDFDF",
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    width: '100%',
                                    p: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: '100%', sm: '13%' },
                                        mb: { xs: 1, sm: 0 },
                                    }}
                                >
                                    <label htmlFor="file-input">
                                        <Tooltip title="Upload file">
                                            <Button variant="outlined" component="label" size="small" color="primary" sx={{ p: .5 }}>
                                                Choose file
                                                <input
                                                    id="file-input"
                                                    type="file"
                                                    accept=".jpg, .jpeg, .png, .pdf"
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileChange}
                                                />
                                            </Button>
                                        </Tooltip>
                                    </label>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                        width: { xs: '100%', sm: '87%' },
                                    }}
                                >
                                    {selectedFiles.map((file, index) => (
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
                                                <Typography level='body-xs'>{file?.name}</Typography>
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
                                                    <Box sx={{ p: 0 }} aria-label="Close" onClick={() => handleRemoveFile(index)}>
                                                        <CloseSharpIcon fontSize='small' sx={{ color: "#FF76CE" }} />
                                                    </Box>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Button variant="outlined" size='sm' onClick={handleUpload} sx={{ width: '100%', color: "#555555" }}>
                                    Upload Your File
                                </Button>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Table aria-label="basic table" size="sm" sx={{
                                    "--Table-headerUnderlineThickness": "1px",
                                    "--TableCell-height": "0px",
                                    "--TableCell-paddingX": "-11px"
                                }}>
                                    <thead>
                                        <tr>

                                            <th style={{ width: '40%' }}>File Name</th>
                                            <th>date</th>
                                            <th>view</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData?.map((filename, index) => {

                                            const parts = filename?.split('/');
                                            const fileNamePart = parts[parts.length - 1];
                                            const fileNameWithoutExtension = fileNamePart.split('.')[0];
                                            const name = fileNameWithoutExtension.split('&')[0];
                                            const dateParts = fileNameWithoutExtension.split('&');
                                            const uploadedDate = dateParts[1];


                                            return (
                                                <tr key={index}>
                                                    <td>{name}</td>
                                                    <td>{uploadedDate}</td>

                                                    <td>
                                                        <IconButton sx={{}} size='small' color='primary' onClick={() => EditData(filename)}>
                                                            <ImageSearchIcon sx={{ color: "#555555" }} />
                                                        </IconButton>
                                                    </td>
                                                    <td>
                                                        <IconButton sx={{}} size='small' color='primary' onClick={() => DeleteItem(fileNamePart)} >
                                                            <DeleteIcon sx={{ color: "#555555" }} />
                                                        </IconButton>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>


                                </Table>
                            </Box>
                            <ViewModalCert
                                isModalOpenedu={isModalOpenedu}
                                setIsModalOpen={setIsModalOpen}
                                file={file}
                            />
                        </Box>
                    </Box>

                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(CertificateModal)