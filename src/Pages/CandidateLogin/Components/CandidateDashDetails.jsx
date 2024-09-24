import { Box, Typography } from '@mui/joy';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React, { lazy, memo, useCallback, useMemo, useState } from 'react';
import { Paper, useMediaQuery } from '@mui/material';
import axioslogin from '../../../Axios/Axios';

const CandidateAbout = lazy(() => import('./CandidateAbout'))
const CandidateAccademic = lazy(() => import('./CandidateAccademic'))
const CandidateExp = lazy(() => import('./CandidateExp'))
const CandidateCertification = lazy(() => import('./CandidateCertification'))
const CandidateSkill = lazy(() => import('./CandidateSkills'))
const CandidateLang = lazy(() => import('./CandidateLang'))
// const CandidatePersonal = lazy(() => import('./CandidatePersonal'))
const CandidateHobbies = lazy(() => import('./CandidateHobbies'))
const CandidateReference = lazy(() => import('./CandidateReference'))
const CandidateResume = lazy(() => import('./CandidateResume'))
const CandidateCertificate = lazy(() => import('./CandidateCertificate'))
const CandidateDashEdit = lazy(() => import('./CandidateDashEdit'))
const CandidateModal = lazy(() => import('./CandidateModal'))
const SelectedApplication = lazy(() => import('./SelectedApplication/SelectedApplication'))
const VaccancyListEmp = lazy(() => import('./VaccancyListEmp/VaccancyListEmp'))



const CandidateDashDetails = ({ emal, name, ApplicationId, personalData, count, setcount, pageToShow, SetPageToShow, jobData, vaccancyData, setEditCount, EditCount }) => {
    const isVerticalOrientation = useMediaQuery('(max-width: 768px)');
    const [isModalOpen, setCareerModalOpen] = useState(false)


    const [tableData, setTableData] = useState([])

    const handleChange = useCallback(async (e) => {
        setCareerModalOpen(true)
    }, []);
    const handleChangeEdit = useCallback(async (e) => {
        // setCareerModalOpen(true)
        setEditCount(1)
        SetPageToShow(4)

    }, [SetPageToShow]);
    const handleChangeHome = useCallback(async (e) => {
        // setCareerModalOpen(true)
        setEditCount(0)
        SetPageToShow(0)
    }, [SetPageToShow]);

    const checkData = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
        }
    }, [ApplicationId])
    const handleTabChange = useCallback(async (event, newValue) => {

        if (newValue === 2) {
            setTableData([])
            const result = await axioslogin.post('/career/Certification/get', checkData)
            const { success, data } = result.data
            if (success === 1 && data?.length > 0) {
                setTableData(data)
            }
            else {
                setTableData([])
            }
        } else if (newValue === 4) {
            setTableData([])
            const result = await axioslogin.post('/career/skills/get', checkData)
            const { success, data } = result.data
            if (success === 1 && data?.length > 0) {
                setTableData(data)

            }
            else {
                setTableData([])
            }
        } else if (newValue === 5) {
            setTableData([])
            const result = await axioslogin.post('/career/lang/get', checkData)
            const { success, data } = result.data
            if (success === 1 && data?.length > 0) {
                setTableData(data[0])

            }
            else {
                setTableData([])
            }
        } else if (newValue === 6) {
            setTableData([])
            const result = await axioslogin.post('/career/Hobbies/get', checkData)
            const { success, data } = result.data
            if (success === 1 && data?.length > 0) {
                setTableData(data)

            }
            else {
                setTableData([])
            }
        } else if (newValue === 7) {
            setTableData([])
            const result = await axioslogin.post('/career/reference/get', checkData)
            const { success, data } = result.data
            if (success === 1 && data?.length > 0) {
                setTableData(data)

            }
            else {
                setTableData([])
            }
        } else if (newValue === 8) {
            setTableData([])
            const result = await axioslogin.post('/upload/files', checkData)
            const { success, data } = result.data
            if (success === 1 && data?.length > 0) {
                const fileUrls = data.map((fileName) => {
                    return `http://192.168.10.88/NAS/Career/Resume/${ApplicationId}/${fileName}`;

                });
                // setFiles(fileNames)
                fileUrls?.forEach((fileUrl) => {
                    setTableData(fileUrls)
                });

            }
            else {
                setTableData([])
            }
        } else if (newValue === 9) {
            setTableData([])
            const result = await axioslogin.post('/upload/filesCertificate', checkData)
            const { success, data } = result.data
            if (success === 1 && data?.length > 0) {
                const fileUrls = data.map((fileName) => {
                    return `http://192.168.10.88/NAS/Career/Certificate/${ApplicationId}/${fileName}`;

                });
                // setFiles(fileNames)
                fileUrls?.forEach((fileUrl) => {
                    setTableData(fileUrls)
                });

            }
            else {
                setTableData([])
            }
        } else {
            setTableData([])
        }

    }, [checkData, setTableData]);

    return (
        <Box>
            <Paper
                variant="outlined"
                sx={{
                    // backgroundColor: 'slate.50',
                    // border: "1px solid #B7B7B7",

                    padding: 4,
                    borderRadius: 'md',
                    // boxShadow: 'lg',
                    '@media screen and (max-width: 768px)': {
                        padding: 1,

                    },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                    <Typography level='h3' sx={{}}>{name}</Typography>
                    <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon fontSize='small' />
                        {/* <Typography level='body-sm'>{personalData?.address2}</Typography> */}
                        <Typography level='body-xs'>{personalData?.length !== 0 ? personalData?.address2 : "Not Updated"}</Typography>

                    </Box>
                    {personalData?.length !== 0 ?
                        <Box
                            onClick={(e) => handleChangeEdit(e)}
                        >
                            <Typography level='body-sm' sx={{ color: 'primary.main', cursor: 'pointer', }} className='hover:text-[#7c51a1]'>
                                Edit Portfolio
                            </Typography>
                        </Box> :
                        <Box
                            onClick={(e) => handleChange(e)}
                        >
                            <Typography level='body-sm' sx={{ color: 'primary.main', cursor: 'pointer', }} className='hover:text-[#7c51a1]'>
                                Add Portfolio
                            </Typography>
                        </Box>
                    }
                    {EditCount === 1 ?
                        <Box
                            onClick={(e) => handleChangeHome(e)}
                        >
                            <Typography level='body-sm' sx={{ color: 'primary.main', cursor: 'pointer', }} className='hover:text-[#7c51a1]'>
                                Home
                            </Typography>
                        </Box>
                        :
                        ''
                    }

                </Box>
                <Box sx={{ borderBottom: '1px solid #DFDFDF', marginTop: 1 }}>
                    <Typography level='body-sm'>{emal}</Typography>
                </Box>
            </Paper>
            {/* {EditCount ===2 } */}
            <Box>
                {pageToShow === 1 ?
                    <Box>
                        <SelectedApplication jobData={jobData} />
                    </Box> :
                    pageToShow === 2 ?
                        <Box>
                            <VaccancyListEmp vaccancyData={vaccancyData} personalData={personalData} setcount={setcount} />
                        </Box> :
                        pageToShow === 0 ?
                            <Paper
                                variant="outlined"
                                sx={{
                                    // backgroundColor: 'slate.50',
                                    // border: "1px solid #AAAAAA",
                                    mt: 1,
                                    padding: 3,
                                    borderRadius: 'md',
                                    // boxShadow: 'lg',
                                    '@media screen and (max-width: 768px)': {
                                        padding: 1,

                                    },

                                }}
                            >

                                <Tabs aria-label="Basic tabs" defaultValue={0}
                                    size="sm"
                                    orientation="vertical"
                                    sx={{}}
                                    // value={tabIndex}
                                    onChange={handleTabChange}
                                >
                                    <TabList disableUnderline tabFlex={1} sx={{
                                        display: 'flex',
                                        // flexDirection: isVerticalOrientation ? 'column' : 'row',
                                        // flexDirection: 'column'

                                    }}>
                                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>About</Tab>
                                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Academic</Tab>
                                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Certifications</Tab>
                                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Experience</Tab>
                                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Skills</Tab>
                                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Language</Tab>
                                        {/* <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>PersonalInfo </Tab> */}
                                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Hobbies</Tab>
                                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Reference</Tab>
                                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Resume</Tab>
                                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Certificate</Tab>
                                    </TabList>
                                    <TabPanel value={0} sx={{ p: 0 }}>
                                        <CandidateAbout personalData={personalData} ApplicationId={ApplicationId} />
                                    </TabPanel>
                                    <TabPanel value={1} sx={{ p: 0 }}>
                                        <CandidateAccademic personalData={personalData} ApplicationId={ApplicationId} />
                                    </TabPanel>
                                    <TabPanel value={2} sx={{ p: 0 }} >
                                        <CandidateCertification ApplicationId={ApplicationId} tableData={tableData} />
                                    </TabPanel>
                                    <TabPanel value={3} sx={{ p: 0 }}>
                                        <CandidateExp personalData={personalData} ApplicationId={ApplicationId} />
                                    </TabPanel>

                                    <TabPanel value={4} sx={{ p: 0 }}>
                                        <CandidateSkill ApplicationId={ApplicationId} tableData={tableData} />
                                    </TabPanel>
                                    <TabPanel value={5} sx={{ p: 0 }}>
                                        <CandidateLang ApplicationId={ApplicationId} tableData={tableData} />
                                    </TabPanel>

                                    <TabPanel value={6} sx={{ p: 0 }}>
                                        <CandidateHobbies ApplicationId={ApplicationId} tableData={tableData} />
                                    </TabPanel>
                                    <TabPanel value={7} sx={{ p: 0 }}>
                                        <CandidateReference ApplicationId={ApplicationId} tableData={tableData} />
                                    </TabPanel>
                                    <TabPanel value={8} sx={{ p: 0 }}>
                                        <CandidateResume ApplicationId={ApplicationId} tableData={tableData} />
                                    </TabPanel>
                                    <TabPanel value={9} sx={{ p: 0 }}>
                                        <CandidateCertificate ApplicationId={ApplicationId} tableData={tableData} />
                                    </TabPanel>

                                </Tabs>
                            </Paper>
                            : ""
                }

                {EditCount === 1 ?
                    <Box>
                        <CandidateDashEdit personalData={personalData} ApplicationId={ApplicationId} />
                    </Box> : ""}

            </Box>
            <CandidateModal isModalOpen={isModalOpen} setCareerModalOpen={setCareerModalOpen} ApplicationId={ApplicationId} count={count} setcount={setcount} />
        </Box>
    );
};

export default memo(CandidateDashDetails);
