import { Box } from '@mui/joy'
import React, { memo } from 'react'

const CandidatePersonalInfo = () => {
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

        </Box>
    )
}

export default memo(CandidatePersonalInfo)