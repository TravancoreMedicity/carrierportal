import { Box, } from '@mui/joy'
import React, { lazy, memo, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../../Redux/LoginSlice'
import axioslogin from '../../Axios/Axios'


const CadidateHeader = lazy(() => import('./Components/CandidateHeader'))
const CadidateDashBoard = lazy(() => import('./Components/CandidateDashBoard'))

const CareerHome = () => {
    const [count, setcount] = useState(0)

    const [personalData, SetPersonalData] = useState([])
    const [SkillData, SetSkillData] = useState([])
    const [pageToShow, SetPageToShow] = useState(0)
    const [jobData, setJobData] = useState([])
    const [EditCount, setEditCount] = useState(0)
    const [vaccancyData, setVaccancyData] = useState([]);

    const loggedInfo = useSelector((state) => getUser(state))
    const data = JSON.parse(loggedInfo)
    const ApplicationId = data?.id;

    const checkData = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
        }
    }, [ApplicationId])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.get(`/common/PersonalData/${ApplicationId}`)
            const { success, data } = result.data
            if (success === 1 && data?.length > 0) {
                SetPersonalData(data[0]);
                setcount(0)
                const result = await axioslogin.post('/career/skills/get', checkData)
                const { success: skillsucess, data: skilldata } = result.data
                if (skillsucess === 1) {
                    SetSkillData(skilldata)
                } else {
                    SetSkillData([])

                }
            } else {
                SetPersonalData([]);
                setcount(0)
            }
        }
        fetchData()
    }, [count])
    return (


        <Box className='flex flex-1 flex-col justify-items-center  ' >
            <Box className="flex flex-1 flex-col justify-items-center bg-slate-50 p-4 " sx={{
                '@media screen and (max-width: 768px)': {
                    padding: 1,

                },
            }}>
                <Box sx={{}}>
                    {/* navbar */}
                    <Box>
                        <CadidateHeader setVaccancyData={setVaccancyData} SetPageToShow={SetPageToShow} setJobData={setJobData}
                            setEditCount={setEditCount} personalData={personalData} vaccancyData={vaccancyData} />
                    </Box>
                    {/* main dashboard */}
                    <Box>
                        <CadidateDashBoard personalData={personalData} count={count} setcount={setcount} SkillData={SkillData} vaccancyData={vaccancyData}
                            pageToShow={pageToShow} SetPageToShow={SetPageToShow} jobData={jobData} EditCount={EditCount} setEditCount={setEditCount} />
                    </Box>

                </Box>

            </Box>
        </Box >

    )
}

export default memo(CareerHome) 