import { Box, Typography } from '@mui/joy'
import moment from 'moment'
import React, { memo } from 'react'
import WorkIcon from '@mui/icons-material/Work';


const CandidateExp = ({ personalData }) => {
    return (
        <Box sx={{
            backgroundColor: 'slate.50',
            padding: 4,
            borderRadius: 'md',
            boxShadow: 'lg',
            marginTop: 2,
            '@media screen and (max-width: 768px)': {
                padding: 1,
            },
        }}>
            <Box>
                <Box>
                    <Typography sx={{}} level="body-md" >
                        Experience Information
                    </Typography>
                </Box>
                {personalData?.Experience_details && personalData?.Experience_details.length > 0 ? (
                    personalData?.Experience_details?.map((exp, index) => (
                        <Box key={index} sx={{ mt: 1, display: "flex", width: '100%' }}>
                            <Box sx={{
                                width: "100%", borderTop: "1px solid #DFDFDF",

                            }}>

                                <Box sx={{ display: 'flex', gap: 2, mt: 1, }}>
                                    <Box><WorkIcon /></Box>
                                    <Box sx={{ mt: .5, display: 'flex', gap: 1 }}>
                                        <Box><Typography level="title-md" sx={{ wordBreak: 'break-word', textTransform: 'capitalize' }}> {exp?.jobexp}</Typography></Box>
                                        <Box>   <Typography level="body-sm" sx={{ wordBreak: 'break-word', }}>(  {moment(new Date(exp?.expstartdate)).format('DD-MM-YYYY')} -  {moment(new Date(exp?.expenddate)).format('DD-MM-YYYY')})</Typography></Box>

                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 5 }}>
                                    <Box></Box>
                                    <Box ><Typography level="body-sm" sx={{ wordBreak: 'break-word', textTransform: 'capitalize' }}> {exp?.Employer}</Typography> </Box>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 5 }}>
                                    <Box></Box>
                                    <Box><Typography level="body-sm" sx={{ wordBreak: 'break-word', textTransform: 'capitalize' }}> {exp?.Additionalinf}</Typography>  </Box>
                                </Box>

                            </Box>

                        </Box>
                    ))
                ) : (
                    <Typography level="body-sm">No experience details found.</Typography>
                )}
            </Box>
        </Box>
    )
}

export default memo(CandidateExp) 