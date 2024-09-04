import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const CandidateHobbies = ({ tableData }) => {
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
                <Typography sx={{}} level="body-md" >
                    Hobbies
                </Typography>
            </Box>
            {tableData?.length > 0 ? (
                <Box sx={{ mt: 1, borderTop: "1px solid #DFDFDF", }}>
                    {tableData.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <Box sx={{}}><ArrowRightIcon fontSize='small' /></Box>
                            <Box sx={{}}>
                                <Typography level='body-sm' sx={{ wordBreak: 'break-word' }}>
                                    {item?.hobbies === null ? "not updated" : item?.hobbies}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography variant="body1">
                    No Data Found
                </Typography>
            )}


        </Box>
    )
}

export default memo(CandidateHobbies)