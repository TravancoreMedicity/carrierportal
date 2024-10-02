import { Box, IconButton, Table, Typography } from '@mui/joy'
import React, { lazy, memo, useCallback, useState } from 'react'
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { Paper } from '@mui/material';

const ViewModalCert = lazy(() => import('./CandidateEdit/ViewModalCertificate'))

const CandidateCertificate = ({ tableData }) => {

    const [file, setFile] = useState([])
    const [isModalOpenedu, setIsModalOpen] = useState(false)

    const EditData = useCallback((filename) => {
        setFile(filename)
        setIsModalOpen(true)
    }, [])

    return (
        <Paper
            variant="outlined" sx={{
                // backgroundColor: 'slate.50',
                padding: 3,
                overflowX: 'scroll',
                borderRadius: 'md',
                // boxShadow: 'lg',
                // marginTop: 2,
                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },
                ml: 1,
                height: window.innerHeight - 356,
            }}>
            <Box>
                <Box>
                    <Typography sx={{}} level="body-md" >
                        Certificate
                    </Typography>
                </Box>
                {tableData?.length > 0 ?
                    <Box sx={{ mt: 1 }}>
                        <Table aria-label="basic table" size="sm" sx={{
                            "--Table-headerUnderlineThickness": "1px",
                            "--TableCell-height": "0px",
                            "--TableCell-paddingX": "-11px"
                        }}>
                            <thead>
                                <tr>

                                    <th style={{ width: '40%' }}>Certificate</th>
                                    <th>Uploded date</th>
                                    <th>view</th>

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
                                            {/* <td>{slNo}</td> */}
                                            <td>{name}</td>
                                            <td>{uploadedDate}</td>
                                            <td>
                                                <IconButton sx={{}} size='small' color='primary' onClick={() => EditData(filename)}>
                                                    <ImageSearchIcon sx={{ color: '#FF76CE' }} />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Box> :
                    <Typography sx={{}} level="body-md" >
                        No Data Found
                    </Typography>
                }
            </Box>
            <ViewModalCert
                isModalOpenedu={isModalOpenedu}
                setIsModalOpen={setIsModalOpen}
                file={file}
            />
        </Paper>
    )
}

export default memo(CandidateCertificate)