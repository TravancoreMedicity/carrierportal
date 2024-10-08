import { Backdrop, Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { memo } from 'react'

const CustomBackDrop = ({ open, text }) => {
    return (
        <Backdrop
            sx={{
                color: '#f8dcfa', zIndex: (theme) => theme.zIndex.drawer + 1,
                backdropFilter: 'blur(6px)', // Adjust the blur amount as needed
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            open={open}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row', }} >
                <Typography sx={{ mr: 2 }} >{text}</Typography>
                <CircularProgress size={20} sx={{ color: '#ed7af5' }} />
            </Box>
        </Backdrop>
    )
}

export default memo(CustomBackDrop)