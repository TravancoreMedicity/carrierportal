import { Box, Card, CardContent, Typography } from '@mui/joy'
import moment from 'moment'
import React, { memo } from 'react'

const SelectedApplication = ({ jobData }) => {

    return (
        <Box sx={{
            backgroundColor: 'slate.50',
            padding: 3,
            borderRadius: 'md',
            boxShadow: 'lg',
            '@media screen and (max-width: 768px)': {
                padding: 1,

            },

        }}>
            {jobData?.length > 0 ?
                <Box sx={{
                    height: window.innerHeight - 350, overflowX: "auto",
                }}>
                    {jobData?.map((item, index) => (
                        <Box key={index} >
                            <Box sx={{ mt: 2, borderBottom: '1px solid #DFDFDF', display: 'flex', justifyContent: 'center' }}>

                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                {/* First Box */}
                                <Box sx={{ width: "80%", display: 'flex', justifyContent: 'space-around' }}>
                                    <Box sx={{ mt: 2, width: '80%', cursor: 'pointer' }}>
                                        <Card sx={{ borderRadius: 15 }}>
                                            <Box sx={{}}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                    <Typography level="body-sm">{item?.desg_name}</Typography>

                                                </Box>
                                                <Typography level="body-xs">{item?.experiencefrom}-{item?.experienceto} Year Experience</Typography>
                                            </Box>

                                            <CardContent orientation="horizontal">
                                                <Box sx={{ width: '100%' }}>
                                                    <Typography level="body-xs" sx={{ wordBreak: 'break-word' }}>
                                                        {item?.job_desc && item.job_desc[0] ? item.job_desc[0] : "Not Updated"}
                                                    </Typography>


                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, flexWrap: 'wrap' }}>
                                                        <Typography level="body-xs" sx={{ wordBreak: 'break-word' }}>
                                                            JOB ID: {item?.manpower_Request_slno}
                                                        </Typography>
                                                        <Typography level="body-xs" sx={{ wordBreak: 'break-word', color: '#FF76CE' }}>
                                                            Applyed On: {moment(new Date(item?.create_date)).format('DD-MM-YYYY HH MM a')}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography level="body-xs" sx={{ wordBreak: 'break-word' }} >
                                                            Status:{item?.selected_status === null ? "Pending" : item?.selected_status === 1 ? "Selected" : item?.selected_status === 2 ? "Rejected" : ''}
                                                        </Typography>
                                                    </Box>

                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Box>

                                </Box>
                            </Box>

                        </Box>
                    ))}
                </Box>
                : <Box>
                    <Typography level="body-sm">You are not applied any Job</Typography>
                </Box>}
        </Box>
    )
}

export default memo(SelectedApplication)