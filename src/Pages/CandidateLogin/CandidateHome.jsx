import { Box } from '@mui/joy'
import React, { Suspense, lazy } from 'react'
import { Outlet, useLocation } from 'react-router'
import Loader from '../../Components/Loader'

const CadidateHeader = lazy(() => import('./Components/CandidateHeader'))
const AdmissionProcedure = lazy(() => import('./Components/AdmissionProcedure'))


const CandidateHome = () => {

    const { pathname } = useLocation()

    return (
        <>
            <CadidateHeader />
            <div className='flex flex-1 flex-col overflow-hidden' >
                <Suspense fallback={<Loader />} >
                    <Box className="flex flex-1 justify-center" >
                        {
                            pathname === '/CandidateHome' ? <AdmissionProcedure /> : <Outlet />
                        }
                    </Box>
                </Suspense>
            </div>
        </>
    )
}

export default CandidateHome