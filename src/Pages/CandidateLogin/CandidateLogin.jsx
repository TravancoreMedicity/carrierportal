import React, { Suspense, lazy } from 'react'
import { Box, Divider } from '@mui/joy'
import Loader from '../../Components/Loader'

const NewsandEventCarousel = lazy(() => import('../../Components/NewsandEventCarousel'))
const CandidateLogincmp = lazy(() => import('./Components/CandidateLogin'))


const CandidateLogin = () => {
    return (
        <Box className="flex flex-1 flex-col sm:flex-col md:flex-row p-1" >
            <Box className="flex flex-1 p-5 justify-center items-center " >
                <Suspense fallback={<Loader />} >
                    <NewsandEventCarousel />
                </Suspense>
            </Box>
            <Divider orientation='vertical' sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }, width: 3, my: 10, backgroundColor: '#7c51a0' }} />
            <Box className="flex flex-1 p-5 justify-center items-center" >
                <CandidateLogincmp />
            </Box>
        </Box>
    )
}

export default CandidateLogin