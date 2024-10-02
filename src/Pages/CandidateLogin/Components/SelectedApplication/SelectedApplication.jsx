import { Box, Card, CardContent, Typography } from '@mui/joy';
import moment from 'moment';
import React, { memo } from 'react';

const SelectedApplication = ({ jobData }) => {
    return (
        <Box
            variant="outlined"
            sx={{
                padding: 14,
                mt: 1,
                borderRadius: 'md',
                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },
            }}
        >
            <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', }}>My Applications</Typography>

            {jobData?.length > 0 && jobData[0].desg_id !== null ? (
                <Box sx={{}}>
                    {jobData.map((item, index) => (
                        <Box key={index}>

                            <Box sx={{ mt: 2, borderBottom: '1px solid #DFDFDF', display: 'flex', justifyContent: 'center' }} />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                                    <Box sx={{ mt: 2, width: '100%', cursor: 'pointer' }}>
                                        <Card sx={{ borderRadius: 15, backgroundColor: '#FFFBF5' }}>
                                            <Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                    <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', }}>{item?.desg_name}</Typography>
                                                </Box>
                                                <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 13, fontWeight: 400, color: '#555555', }}>{item?.experiencefrom}-{item?.experienceto} Year Experience</Typography>
                                            </Box>

                                            <CardContent orientation="horizontal">
                                                <Box sx={{ width: '100%' }}>
                                                    <Typography level="body-xs" sx={{ wordBreak: 'break-word', fontFamily: "Bahnschrift", fontSize: 13, fontWeight: 400, color: '#555555', }}>
                                                        {item?.job_desc && item.job_desc[0] ? item.job_desc[0] : 'Not Updated'}
                                                    </Typography>

                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, flexWrap: 'wrap' }}>
                                                        <Typography level="body-xs" sx={{ wordBreak: 'break-word', fontFamily: "Bahnschrift", fontSize: 13, fontWeight: 400, color: '#555555', }}>
                                                            JOB ID: {item?.manpower_Request_slno}
                                                        </Typography>
                                                        <Typography level="body-xs" sx={{ wordBreak: 'break-word', color: '#FF76CE', fontFamily: "Bahnschrift", fontSize: 13, fontWeight: 400, }}>
                                                            Applied On: {moment(new Date(item?.create_date)).format('DD-MM-YYYY HH:mm a')}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography level="body-xs" sx={{ wordBreak: 'break-word', fontFamily: "Bahnschrift", fontSize: 13, fontWeight: 400, color: '#555555', }}>
                                                            Status: {item?.selected_status === null ? 'Pending' : item?.selected_status === 1 ? 'Selected' : item?.selected_status === 2 ? 'Rejected' : ''}
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
            ) : (
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography level="body-sm" sx={{ color: 'warning.main' }}>
                        You have not applied for any jobs or the application details are not available.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default memo(SelectedApplication);
