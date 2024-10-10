import { Box, } from '@mui/joy'
import React, { lazy, memo, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../../Redux/LoginSlice'
import axioslogin from '../../Axios/Axios'


const CadidateHeader = lazy(() => import('./Components/CandidateHeader'))
const CadidateDashBoard = lazy(() => import('./Components/CandidateDashBoard'))
const ContactInformation = lazy(() => import('./Components/ApplicationForm/ContactInformation'))

const CareerHome = () => {
    const [count, setcount] = useState(0)


    const [personalData, SetPersonalData] = useState([])
    // const [SkillData, SetSkillData] = useState([])
    const [pageToShow, SetPageToShow] = useState(0)
    const [loginpage, Setloginpage] = useState(0)
    const [jobData, setJobData] = useState([])
    const [EditCount, setEditCount] = useState(0)
    const [vaccancyData, setVaccancyData] = useState([]);
    const [profilePic, setFiles] = useState('');


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
            if (ApplicationId === undefined) {
                Setloginpage(0)

            } else {


                const result = await axioslogin.get(`/common/PersonalData/${ApplicationId}`)
                const { success, data } = result.data
                if (success === 1 && data?.length > 0) {
                    Setloginpage(2)
                    SetPersonalData(data[0]);
                    setcount(0)
                    // const result = await axioslogin.post('/career/skills/get', checkData)
                    // const { success: skillsucess, data: skilldata } = result.data
                    // if (skillsucess === 1) {
                    //     SetSkillData(skilldata)
                    // } else {
                    //     SetSkillData([])
                    // }
                } else {

                    Setloginpage(1)
                    SetPersonalData([]);
                    setcount(0)
                }

                const resultimg = await axioslogin.post('/upload/profilePic', checkData)
                const { successimg, dataimg } = resultimg.data
                if (successimg === 1 && dataimg?.length > 0) {
                    setcount(0)


                    // Construct URLs for each file using the file names
                    const fileUrls =
                        `https://192.168.10.88/NAS/Career/profilePicture/${ApplicationId}/${dataimg}`;
                    // `http://192.168.22.5/Career/profilePicture/${ApplicationId}/${dataimg}`;

                    setFiles(fileUrls)
                }
                else {
                    setFiles('')
                }
            }
        }
        fetchData()
    }, [count])
    return (


        <Box className='flex flex-1 flex-col justify-items-center  '
            sx={{ backgroundColor: '#FFFBF5', }}
        >
            <Box className="flex flex-1 flex-col justify-items-center p-1 " sx={{
                '@media screen and (max-width: 768px)': {
                    padding: 1,
                    backgroundColor: '#FFFBF5',
                },
            }}>
                {loginpage === 1 ?
                    <Box sx={{ backgroundColor: '#FFFBF5', }}>
                        {/* navbar */}
                        <Box>
                            <CadidateHeader setVaccancyData={setVaccancyData} SetPageToShow={SetPageToShow} setJobData={setJobData} jobData={jobData}
                                setEditCount={setEditCount} personalData={personalData} vaccancyData={vaccancyData} profilePic={profilePic} />
                        </Box>
                        {/* main dashboard */}
                        <Box>
                            <ContactInformation ApplicationId={ApplicationId} count={count} setcount={setcount} Setloginpage={Setloginpage} />
                        </Box>
                    </Box>
                    : loginpage === 2 ?
                        <Box sx={{ backgroundColor: '#FFFBF5', }}>
                            {/* navbar */}
                            <Box>
                                <CadidateHeader setVaccancyData={setVaccancyData} SetPageToShow={SetPageToShow} setJobData={setJobData} jobData={jobData}
                                    setEditCount={setEditCount} personalData={personalData} vaccancyData={vaccancyData} profilePic={profilePic} />
                            </Box>
                            {/* main dashboard */}
                            <Box>
                                <CadidateDashBoard personalData={personalData} count={count} setcount={setcount} vaccancyData={vaccancyData}
                                    pageToShow={pageToShow} SetPageToShow={SetPageToShow} jobData={jobData} EditCount={EditCount} setEditCount={setEditCount}
                                    profilePic={profilePic} />
                            </Box>
                        </Box>
                        : ''}
            </Box>
        </Box >

    )
}

export default memo(CareerHome) 