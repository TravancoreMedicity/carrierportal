import { Box, Divider } from '@mui/joy'
import React from 'react'

const Footer = () => {
    return (
        <Box className="flex flex-col justify-center items-center pb-7" >
            <Divider orientation='horizontal' sx={{ mx: '10%', backgroundColor: '#7c51a0', }} />
            <Box className="font-thin text-xs" >Copyright © 2024 Travancore Medicity. All Right Reserved.</Box>
        </Box>
    )
}

export default Footer