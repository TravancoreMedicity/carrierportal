import { Box, Typography } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Paper } from '@mui/material';
import axioslogin from '../../../Axios/Axios';

const CandidateCertification = ({ ApplicationId, count, setcount }) => {

    const [tableData, setTableData] = useState([])

    const checkData = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
        }
    }, [ApplicationId])
    //FOR GETTING THE EMPLOYE DETAILS

    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.post('/career/Certification/get', checkData)
            const { success, data } = result.data
            if (success === 1 && data?.length > 0) {
                setcount(0)
                setTableData(data)
            }
            else {
                setTableData([])
            }
        }
        fetchData()
    }, [count])
    return (
        <Box

            sx={{
                ml: 1,
                borderRadius: 'md',
                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },
            }}>


            {tableData?.length > 0 ? (
                tableData?.map((item, index) => (
                    <Box key={index} sx={{ mt: 1, display: "flex", width: '100%' }}>
                        <Box sx={{
                            width: "100%",
                        }}>
                            <Box sx={{ display: 'flex', gap: 2, mt: 1, }}>
                                <Box sx={{ mt: 1 }}><WorkspacePremiumIcon sx={{ color: '#555555' }} /></Box>
                                <Box sx={{ mt: .5, display: 'flex', gap: 1 }}>
                                    <Box><Typography level="title-md" sx={{ wordBreak: 'break-word', fontFamily: "Bahnschrift", fontSize: 22, fontWeight: 450, color: '#555555' }}>{item?.certfication_name === null ? "not updated" : item?.certfication_name}</Typography></Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 5 }}>
                                <Box></Box>
                                <Box ><Typography level="body-sm" sx={{ wordBreak: 'break-word', fontFamily: "Bahnschrift", fontSize: 14, fontWeight: 350, color: '#555555' }}> {item?.courseName === null ? "not updated" : item?.courseName}</Typography> </Box>
                            </Box>
                        </Box>
                    </Box>
                ))
            ) : (
                <Typography level="body-sm">No  details found.</Typography>
            )}

        </Box>
    )
}

export default memo(CandidateCertification)