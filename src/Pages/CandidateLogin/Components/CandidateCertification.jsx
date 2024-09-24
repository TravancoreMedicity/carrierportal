import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Paper } from '@mui/material';

const CandidateCertification = ({ tableData }) => {
    return (
        <Paper
            variant="outlined"
            sx={{
                // backgroundColor: 'slate.50',
                padding: 3,
                borderRadius: 'md',
                // boxShadow: 'lg',
                // marginTop: 2,
                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },
            }}>
            <Box>
                <Typography sx={{}} level="body-md" >
                    Certifications
                </Typography>
            </Box>

            {tableData?.length > 0 ? (
                tableData?.map((item, index) => (
                    <Box key={index} sx={{ mt: 1, display: "flex", width: '100%' }}>
                        <Box sx={{
                            width: "100%", borderTop: "1px solid #DFDFDF",
                            // width: "20%", '@media screen and (max-width: 768px)': {
                            //     width: "40%",
                            // },
                        }}>
                            <Box sx={{ display: 'flex', gap: 2, mt: 1, }}>
                                <Box><WorkspacePremiumIcon /></Box>
                                <Box sx={{ mt: .5, display: 'flex', gap: 1 }}>
                                    <Box><Typography level="title-md" sx={{ wordBreak: 'break-word', }}>{item?.certfication_name === null ? "not updated" : item?.certfication_name}</Typography></Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 5 }}>
                                <Box></Box>
                                <Box ><Typography level="body-sm" sx={{ wordBreak: 'break-word', }}> {item?.courseName === null ? "not updated" : item?.courseName}</Typography> </Box>
                            </Box>
                        </Box>
                    </Box>
                ))
            ) : (
                <Typography level="body-sm">No  details found.</Typography>
            )}

        </Paper>
    )
}

export default memo(CandidateCertification)