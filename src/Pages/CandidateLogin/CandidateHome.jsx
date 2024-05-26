import { Box } from '@mui/joy'
import React, { lazy } from 'react'
import { Outlet } from 'react-router'

const CadidateHeader = lazy(() => import('./Components/CandidateHeader'))

const CandidateHome = () => {
    return (
        <div className='flex flex-1 flex-col' >
            <CadidateHeader />
            <Box className="flex flex-1 justify-center" >
                <Outlet />
            </Box>
        </div>
    )
}

export default CandidateHome