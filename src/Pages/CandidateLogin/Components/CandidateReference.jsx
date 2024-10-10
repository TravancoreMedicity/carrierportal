import { Box, Typography } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import axioslogin from '../../../Axios/Axios';

const CandidateReference = ({ ApplicationId, count, setcount }) => {
    const [tableData, setTableData] = useState([])

    const checkData = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
        }
    }, [ApplicationId])
    //FOR GETTING THE EMPLOYE DETAILS

    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.post('/career/reference/get', checkData)
            const { success, data } = result.data
            if (success === 1 && data?.length > 0) {
                setTableData(data)
                setcount(0)
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
                borderRadius: 'md',
                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },
                ml: 1,
            }}>
            <Box>

                {tableData?.length > 0 ? (
                    tableData?.map((item, index) => (
                        <Box key={index} sx={{ mt: 2, display: "flex", width: '100%' }}>
                            <Box sx={{
                                width: "100%",
                            }}>

                                <Box sx={{ display: 'flex', gap: 2, }}>
                                    <Box sx={{}}><ConnectWithoutContactIcon sx={{ color: '#555555' }} /></Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Box>
                                            <Typography level="title-md" sx={{
                                                wordBreak: 'break-word', textTransform: 'capitalize',
                                                fontFamily: "Bahnschrift",
                                                fontSize: 16,
                                                fontWeight: 450,
                                                color: '#555555',
                                            }}>{item?.name === null ? "not updated" : item?.name}</Typography></Box>
                                        <Box ><Typography level="body-sm" sx={{
                                            wordBreak: 'break-word', textTransform: 'capitalize',
                                            fontFamily: "Bahnschrift",
                                            fontSize: 13,
                                            fontWeight: 450,
                                            color: '#555555',
                                        }}>( {item?.designation === null ? "not updated" : item?.designation})</Typography> </Box>

                                    </Box>
                                </Box>
                                {/* <Box sx={{ display: 'flex', gap: 5 }}>
                                    <Box></Box>
                                </Box> */}
                                <Box sx={{ display: 'flex', gap: 5 }}>
                                    <Box></Box>
                                    <Box ><Typography level="body-sm" sx={{
                                        wordBreak: 'break-word', textTransform: 'capitalize', fontFamily: "Bahnschrift",
                                        fontSize: 13,
                                        fontWeight: 450,
                                        color: '#555555',
                                    }}> {item?.number === null ? "not updated" : item?.number}</Typography> </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 5 }}>
                                    <Box></Box>
                                    <Box ><Typography level="body-sm" sx={{
                                        wordBreak: 'break-word', textTransform: 'capitalize', fontFamily: "Bahnschrift",
                                        fontSize: 13,
                                        fontWeight: 450,
                                        color: '#555555',
                                    }}> {item?.mail_id === null ? "not updated" : item?.mail_id}</Typography> </Box>
                                </Box>
                            </Box>

                        </Box>
                    ))
                ) : (
                    <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 15, fontWeight: 350, color: '#555555', }}>No  details found.</Typography>
                )}

            </Box>
        </Box>
    )
}

export default memo(CandidateReference)