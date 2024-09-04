import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'

const CandidatePersonal = () => {
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
                        No Data Found
                    </Typography>
                </Box>

            </Box>
        </Box>
    )
}

export default memo(CandidatePersonal)