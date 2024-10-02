import { Box, Typography } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axioslogin from '../../../Axios/Axios';
import Logo from "../../../assets/free-pdf-upload-icon-3389-thumb.png"

const ViewModal = lazy(() => import('./CandidateEdit/ViewModal'))

const CandidateResume = ({ ApplicationId, count, setcount }) => {
    const [tableData, setTableData] = useState([])

    const checkData = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
        }
    }, [ApplicationId])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.post('/upload/filesCertificate', checkData)
            const { success, data } = result.data
            if (success === 1 && data?.length > 0) {
                setcount(0)
                const fileUrls = data.map((fileName) => {
                    return `http://192.168.10.88/NAS/Career/Certificate/${ApplicationId}/${fileName}`;
                    // return `http://192.168.22.5/Career/Certificate/${ApplicationId}/${fileName}`;


                });
                // setFiles(fileNames)
                fileUrls?.forEach((fileUrl) => {
                    setTableData(fileUrls)
                });

            }
            else {
                setTableData([])
            }
        }
        fetchData()
    }, [count])

    const [file, setFile] = useState([])
    const [isModalOpenedu, setIsModalOpen] = useState(false)

    const EditData = useCallback((filename) => {
        setFile(filename)
        setIsModalOpen(true)
    }, [])
    return (
        <Box

            sx={{
                // overflowX: 'scroll',
                // padding: 3,
                borderRadius: 'md',
                // boxShadow: 'lg',
                // marginTop: 2,
                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },
                ml: 1,
                // height: window.innerHeight - 356,
            }}>
            <Box>

                {tableData?.length > 0 ?
                    <Box >
                        <Box sx={{ mt: 1, display: 'flex', width: '100%' }}>
                            <Box sx={{ mt: 1 }}>
                                <AddPhotoAlternateIcon fontSize='large' sx={{ color: '#555555' }} />
                            </Box>

                            <Box sx={{ mt: 1, width: '100%' }}>
                                <Box sx={{ mt: 1, ml: 1 }}>
                                    <Typography level="title-md" sx={{
                                        wordBreak: 'break-word', textTransform: 'capitalize',
                                        fontFamily: "Bahnschrift",
                                        fontSize: 16,
                                        fontWeight: 450,
                                        color: '#555555',
                                    }}>Attach Resume / Certificates etc.</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', mt: 1, gap: 2 }}>
                            {tableData?.map((filename, index) => {
                                const parts = filename?.split('/');
                                const fileNamePart = parts[parts.length - 1];
                                const fileNameWithoutExtension = fileNamePart.split('.')[0];
                                const name = fileNameWithoutExtension.split('&')[0];
                                const dateParts = fileNameWithoutExtension.split('&');
                                const uploadedDate = dateParts[1];
                                return (
                                    <Box key={index} sx={{}}>
                                        <Box sx={{ display: { md: 'flex' }, mr: 1 }} onClick={() => EditData(filename)}>
                                            <img src={Logo} alt='Travancore' width={100} height={100} />
                                        </Box>
                                        <Box sx={{ textAlign: 'center' }} >
                                            <Typography level="title-md" sx={{
                                                wordBreak: 'break-word', textTransform: 'capitalize',
                                                fontFamily: "Bahnschrift",
                                                fontSize: 14,
                                                fontWeight: 450,
                                                color: '#555555',
                                            }}>{name}</Typography>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box> :
                    <Box>
                        <AddPhotoAlternateIcon fontSize='large' />

                        <Typography sx={{}} level="body-md" >
                            No Data Found
                        </Typography>
                    </Box>

                }
            </Box>
            <ViewModal
                isModalOpenedu={isModalOpenedu}
                setIsModalOpen={setIsModalOpen}
                file={file}
            />
        </Box>
    )
}

export default memo(CandidateResume)