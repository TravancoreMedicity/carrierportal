import { Box, Typography } from '@mui/joy'
import moment from 'moment';
import React, { memo, useMemo } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WcIcon from '@mui/icons-material/Wc';
import { Paper } from '@mui/material';

const CandidateAbout = ({ personalData }) => {
    const empData = useMemo(() => personalData, [personalData]);


    return (
        <Paper
            variant="outlined"
            sx={{
                // backgroundColor: 'slate.50',
                padding: 3,
                borderRadius: 'md',
                // boxShadow: 'lg',
                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },
            }}>
            <Box>
                <Box>
                    <Typography sx={{}} level="body-md" >
                        Contact Information
                    </Typography>
                </Box>
                {personalData?.Education_details && personalData.Education_details.length > 0 ? (
                    <Box sx={{ mt: 1, borderTop: "1px solid #DFDFDF", }}>
                        <Box sx={{
                            // width: '50%'
                            width: "50%", '@media screen and (max-width: 768px)': {
                                width: "100%",
                            },
                        }}>
                            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                <Box sx={{}}><PersonIcon /></Box>
                                <Box sx={{ mt: .5 }}>
                                    <Typography level="body-sm" sx={{ wordBreak: 'break-word', textTransform: 'capitalize' }}> {empData?.first_name === '' ? "Not Updated" : empData?.first_name} {empData?.middle_name === '' ? "" : empData?.middle_name} {empData?.last_name === '' ? "" : empData?.last_name}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                <Box> <EmailIcon /></Box>
                                <Box sx={{ mt: .5 }}><Box> <Typography level="body-sm" sx={{ wordBreak: 'break-word' }}> {empData?.email === '' ? "Not Updated" : empData?.email}</Typography> </Box></Box>

                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                <Box><PhoneIcon /></Box>
                                <Box sx={{ mt: .5 }}><Typography level="body-sm" sx={{ wordBreak: 'break-word' }}> {empData?.mobile_num === '' ? "Not Updated" : empData?.mobile_num}</Typography>  </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                <Box>  <HomeIcon /></Box>
                                <Box sx={{ mt: .5 }}><Typography level="body-sm" sx={{ wordBreak: 'break-word', textTransform: 'capitalize' }}> {empData?.address1 === '' ? "Not Updated" : empData?.address1},{empData?.address2 === '' ? "Not Updated" : empData?.address2}</Typography>  </Box>

                            </Box>
                        </Box>

                    </Box>
                ) : (
                    <Typography level="body-sm">No data found.</Typography>
                )}
            </Box>
            <Box sx={{ mt: 2 }}>
                <Box>
                    <Typography sx={{}} level="body-md" >
                        Basic Information
                    </Typography>
                </Box>
                {personalData?.Education_details && personalData.Education_details.length > 0 ? (
                    <Box sx={{ mt: 1, display: "flex", borderTop: "1px solid #DFDFDF", }}>
                        <Box sx={{
                            width: "50%", '@media screen and (max-width: 768px)': {
                                width: "100%",
                            },
                        }}>
                            <Box level="body-sm" sx={{ display: 'flex', gap: 2, mt: 1 }} >
                                <Box><CalendarMonthIcon /></Box>
                                <Box sx={{ mt: .5 }}> <Typography level="body-sm" sx={{ wordBreak: 'break-word' }}> {moment(new Date(empData?.dob)).format('DD-MM-YYYY')}</Typography> </Box>
                            </Box>
                            <Box level="body-sm" sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                <Box><WcIcon /></Box>
                                <Box sx={{ mt: .5 }}> <Typography level="body-sm" sx={{ wordBreak: 'break-word' }}> {empData?.gender === 1 ? "Male" : empData?.gender === 2 ? "FeMale" : empData?.gender === 3 ? "Other" : 'Not Updated'}</Typography> </Box>

                            </Box>

                        </Box>

                    </Box>
                ) : (
                    <Typography level="body-sm">No data found.</Typography>
                )}
            </Box>
        </Paper>
    )
}

export default memo(CandidateAbout)