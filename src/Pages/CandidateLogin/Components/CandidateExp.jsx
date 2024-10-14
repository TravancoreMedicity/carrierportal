import { Box, Typography } from '@mui/joy'
import moment from 'moment'
import React, { memo } from 'react'
import WorkIcon from '@mui/icons-material/Work';



const CandidateExp = ({ personalData }) => {


    // const experienceDetails = personalData?.Experience_details?.map(exp => JSON.parse(exp)) || [];

    return (
        <Box

            sx={{
                ml: 1,
                // height: window.innerHeight - 356,
                overflowX: 'scroll',
                // padding: 3,
                borderRadius: 'md',
                // boxShadow: 'lg',
                // marginTop: 2,
                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },
            }}>
            <Box>

                {personalData?.Experience_details && personalData?.Experience_details.length > 0 ? (
                    personalData?.Experience_details?.map((exp, index) => (
                        <Box key={index} sx={{ mt: 1, display: "flex", width: '100%' }}>
                            <Box sx={{
                                width: "100%",

                            }}>

                                <Box sx={{ display: 'flex', gap: 2, mt: 1, }}>
                                    <Box sx={{ mt: 1 }}><WorkIcon sx={{ color: '#555555' }} /></Box>
                                    <Box sx={{ display: 'flex', gap: 1, p: 0, m: 0 }}>
                                        <Box><Typography sx={{ wordBreak: 'break-word', textTransform: 'capitalize', fontFamily: "Bahnschrift", fontSize: 22, fontWeight: 450, color: '#555555' }}> {exp?.Employer}</Typography></Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 5, }}>
                                    <Box></Box>
                                    <Box ><Typography sx={{ wordBreak: 'break-word', textTransform: 'capitalize', fontFamily: "Bahnschrift", fontSize: 14, fontWeight: 350, color: '#555555' }}> {exp?.jobexp}</Typography> </Box>
                                    <Box sx={{}}><Typography level="body-sm" sx={{ wordBreak: 'break-word', fontFamily: "Bahnschrift", fontSize: 14, fontWeight: 350, color: '#555555' }}>  {moment(new Date(exp?.expstartdate)).format('DD-MM-YYYY')} -  {moment(new Date(exp?.expenddate)).format('DD-MM-YYYY')}</Typography></Box>

                                </Box>
                                {/* 
                <Box sx={{ display: 'flex', gap: 5 }}>
                    <Box></Box>
                    <Box><Typography level="body-sm" sx={{ wordBreak: 'break-word', textTransform: 'capitalize' }}> {exp?.Additionalinf}</Typography>  </Box>
                </Box> */}

                            </Box>

                        </Box>
                    ))
                ) : (
                    <Typography sx={{
                        fontFamily: "Bahnschrift",
                        fontSize: 15,
                        fontWeight: 350,
                        color: '#555555',
                    }}>
                        No experience details found.
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

export default memo(CandidateExp) 