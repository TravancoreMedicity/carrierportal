import { Box, Typography } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import axioslogin from '../../../Axios/Axios';

const CandidateHobbies = ({ ApplicationId, count, setcount }) => {
    const [tableData, setTableData] = useState([])

    const checkData = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
        }
    }, [ApplicationId])
    //FOR GETTING THE EMPLOYE DETAILS

    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.post('/career/Hobbies/get', checkData)
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

            {tableData?.length > 0 ? (
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {tableData.map((item, index) => (
                        <Box key={index} sx={{
                            width: '15%', textAlign: 'center',
                            '@media screen and (max-width: 768px)': {
                                width: '30%',

                            },
                        }} >

                            <Typography level='body-sm' sx={{
                                wordBreak: 'break-word',
                                wordBreak: 'break-word',
                                fontFamily: "Bahnschrift",
                                fontSize: 14,
                                fontWeight: 450,
                                color: '#555555',
                                border: '1px solid #555555',
                                borderRadius: '18px',
                            }}>
                                {item?.hobbies === null ? "not updated" : item?.hobbies}
                            </Typography>

                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography variant="body1">
                    No Data Found
                </Typography>
            )
            }


        </Box >
    )
}

export default memo(CandidateHobbies)