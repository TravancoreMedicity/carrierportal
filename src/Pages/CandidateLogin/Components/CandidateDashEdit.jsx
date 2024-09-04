import React, { lazy, memo } from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Box } from '@mui/joy';
import { useMediaQuery } from '@mui/material';


const CertificationsEdit = lazy(() => import('./CandidateEdit/CertificationsEdit'))
const CandidateCertificate = lazy(() => import('./CandidateEdit/CandidateCertificate'))
const CandidateHobbies = lazy(() => import('./CandidateEdit/CandidateHobbies'))
const CandidateLang = lazy(() => import('./CandidateEdit/CandidateLang'))
// const CandidatePersonalInfo = lazy(() => import('./CandidateEdit/CandidatePersonalInfo'))
const CandidateReference = lazy(() => import('./CandidateEdit/CandidateReference'))
const CandidateResume = lazy(() => import('./CandidateEdit/CandidateResume'))
const CandidateSkills = lazy(() => import('./CandidateEdit/CandidateSkills'))


const CandidateDashEdit = ({ personalData, ApplicationId }) => {
    const isVerticalOrientation = useMediaQuery('(max-width: 768px)');

    return (
        <Box>
            <Box
                sx={{
                    backgroundColor: 'slate.50',
                    padding: 3,
                    borderRadius: 'md',
                    boxShadow: 'lg',
                    '@media screen and (max-width: 768px)': {
                        padding: 1,

                    },

                }}
            >
                <Tabs aria-label="Basic tabs" defaultValue={0}
                    size="sm" sx={{}}>
                    <TabList disableUnderline tabFlex={1} sx={{
                        display: 'flex',
                        flexDirection: isVerticalOrientation ? 'column' : 'row',
                    }}>

                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Certifications</Tab>
                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Skills</Tab>
                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Language</Tab>
                        {/* <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>PersonalInfo </Tab> */}
                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Hobbies</Tab>
                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Reference</Tab>
                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Resume</Tab>
                        <Tab sx={{ borderRight: "1px solid #DFDFDF " }}>Certificate</Tab>
                    </TabList>

                    <TabPanel value={0} sx={{ p: 0 }}>
                        <CertificationsEdit personalData={personalData} ApplicationId={ApplicationId} />
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 0 }}>
                        <CandidateSkills personalData={personalData} ApplicationId={ApplicationId} />
                    </TabPanel>
                    <TabPanel value={2} sx={{ p: 0 }}>
                        <CandidateLang ApplicationId={ApplicationId} />
                    </TabPanel>
                    {/* <TabPanel value={3} sx={{ p: 0 }}>
                        <CandidatePersonalInfo ApplicationId={ApplicationId} />
                    </TabPanel> */}
                    <TabPanel value={3} sx={{ p: 0 }}>
                        <CandidateHobbies ApplicationId={ApplicationId} />
                    </TabPanel>
                    <TabPanel value={4} sx={{ p: 0 }}>
                        <CandidateReference ApplicationId={ApplicationId} />
                    </TabPanel>
                    <TabPanel value={5} sx={{ p: 0 }}>
                        <CandidateResume ApplicationId={ApplicationId} />
                    </TabPanel>
                    <TabPanel value={6} sx={{ p: 0 }}>
                        <CandidateCertificate ApplicationId={ApplicationId} />
                    </TabPanel>


                </Tabs>
            </Box>
        </Box>
    )
}

export default memo(CandidateDashEdit)