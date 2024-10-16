import { Box, Typography } from '@mui/joy';
import React, { lazy, memo, useCallback, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axioslogin from '../../../Axios/Axios';


// const CandidateAbout = lazy(() => import('./CandidateAbout'))
const CandidateAccademic = lazy(() => import('./CandidateAccademic'))
const CandidateExp = lazy(() => import('./CandidateExp'))
const CandidateCertification = lazy(() => import('./CandidateCertification'))
const CandidateSkill = lazy(() => import('./CandidateSkills'))
// const CandidateLang = lazy(() => import('./CandidateLang'))
// const CandidatePersonal = lazy(() => import('./CandidatePersonal'))
const CandidateHobbies = lazy(() => import('./CandidateHobbies'))
const CandidateReference = lazy(() => import('./CandidateReference'))
const CandidateResume = lazy(() => import('./CandidateResume'))
// const CandidateCertificate = lazy(() => import('./CandidateCertificate'))
// const CandidateDashEdit = lazy(() => import('./CandidateDashEdit'))
const CandidateModal = lazy(() => import('./CandidateModal'))
const SelectedApplication = lazy(() => import('./SelectedApplication/SelectedApplication'))
const VaccancyListEmp = lazy(() => import('./VaccancyListEmp/VaccancyListEmp'))
const AboutModal = lazy(() => import('./EditModals/AboutModal'))
const CertificationModal = lazy(() => import('./EditModals/CertificationModal'))
const SkillModal = lazy(() => import('./EditModals/SkillModal'))
const HobbiesModal = lazy(() => import('./EditModals/HobbiesModal'))
const ReferenceModal = lazy(() => import('./EditModals/ReferenceModal'))
const CertificateModal = lazy(() => import('./EditModals/CertificateModal'))
const AboutUs = lazy(() => import('./AboutUSpage'))
const ExpModal = lazy(() => import('./EditModals/ExperienceModal'))
const AcademicModal = lazy(() => import('./EditModals/AcademicModal'))



const CandidateDashDetails = ({ ApplicationId, personalData, count, setcount, pageToShow, jobData, vaccancyData, }) => {
    const isVerticalOrientation = useMediaQuery('(max-width: 768px)');
    const [isModalOpen, setCareerModalOpen] = useState(false)
    const [isModalOpenAbout, setCareerModalOpenAbout] = useState(false)
    const [isModalOpenCerti, setCareerModalOpenCerti] = useState(false)
    const [isModalOpenskill, setCareerModalOpenSkill] = useState(false)
    const [isModalOpenHobbies, setCareerModalOpenHobbies] = useState(false)
    const [isModalOpenReference, setCareerModalOpenReference] = useState(false)
    const [isModalOpenCertificate, setCareerModalOpenCertificate] = useState(false)
    const [isModalOpenexp, setCareerModalOpenexp] = useState(false)
    const [isModalOpenAcademic, setCareerModalAcademic] = useState(false)
    const [edu, setedu] = useState([])
    const [courseData, setCourseData] = useState([])
    const [spclData, setSpclData] = useState([])
    const [UniversityData, setUniversityData] = useState([])
    const [BoardData, setBoardData] = useState([])
    const [education, seteducation] = useState(0)
    const [course, setCourse] = useState(0)
    const [SpecilizationData, setSpecialization] = useState(0)
    const [UniData, setUniData] = useState(0)
    const [board, setBoard] = useState(0)


    const [Aboutme, Setaboutme] = useState("")

    const handleModalAbout = useCallback(async (e) => {
        setCareerModalOpenAbout(true)
        Setaboutme(personalData?.About)
    }, [personalData]);

    const handleModalCertification = useCallback(async (e) => {
        setCareerModalOpenCerti(true)
    }, []);
    const handleModalReference = useCallback(async (e) => {
        setCareerModalOpenReference(true)
    }, []);

    const handleModalSkill = useCallback(async (e) => {
        setCareerModalOpenSkill(true)
    }, []);
    const handleModalHobbies = useCallback(async (e) => {
        setCareerModalOpenHobbies(true)
    }, []);

    const handleModalCertificate = useCallback(async (e) => {
        setCareerModalOpenCertificate(true)
    }, []);

    const handleModalexp = useCallback(async (e) => {
        setCareerModalOpenexp(true)
    }, []);

    const handleModalAcademic = useCallback(async (e) => {
        setCareerModalAcademic(true)

        const result = await axioslogin.get('/common/education')
        const { success, data } = result.data
        if (success === 1) {
            setedu(data)
            const result = await axioslogin.get('/common/course/ById');
            const { success, Coursedata } = result.data
            if (success === 1) {
                setCourseData(Coursedata)
                const result = await axioslogin.post('/common/specialization/ById',);
                const { success, Spcldata } = result.data
                if (success == 1) {
                    setSpclData(Spcldata)
                    const result = await axioslogin.get('/common/getUniver');
                    const { Unidata, success } = await result.data;
                    if (success === 1) {
                        setUniversityData(Unidata)
                        const result = await axioslogin.get(`/common/getBoard`);
                        const { Boarddata, success } = await result.data;
                        if (success === 1) {
                            setBoardData(Boarddata)
                        }
                        else {
                            setBoardData([])
                        }
                    }
                    else {
                        setUniversityData([])
                    }
                }
                else {
                    setSpclData([])
                }
            }
            else {
                setCourseData([])
            }
        } else {
            setedu([])
        }
    }, []);


    return (
        <Box sx={{
            height: window.innerHeight - 170,
            overflowX: 'scroll',
        }}>
            {pageToShow === 1 ?
                <Box>
                    <SelectedApplication jobData={jobData} />
                </Box> :
                pageToShow === 2 ?
                    <Box>
                        <VaccancyListEmp vaccancyData={vaccancyData} personalData={personalData} setcount={setcount} />
                    </Box> :
                    pageToShow === 3 ?
                        <Box>
                            <AboutUs />
                        </Box> :
                        <Box>
                            <Box sx={{
                                padding: 14,
                                borderRadius: 'md',
                                '@media screen and (max-width: 768px)': {
                                    padding: 1,

                                },
                            }}>

                                {/* about me section */}
                                <Box>
                                    <Box sx={{ display: 'flex', borderBottom: "1px solid #C3C3C3", }}>
                                        <Box sx={{ width: '100%' }}>

                                            <Typography
                                                sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', p: 0, m: 0, }} >
                                                About me
                                            </Typography>

                                        </Box>
                                        <Box sx={{}}>
                                            <Box sx={{ display: { md: 'flex' }, cursor: 'pointer' }} onClick={() => handleModalAbout()}>
                                                < AddCircleOutlineIcon fontSize='small' />
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box sx={{ p: 1 }}>
                                        <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 15, fontWeight: 350, color: '#555555', p: 0, m: 0, }} >
                                            {personalData?.length !== 0 ? personalData?.About : "Not Updated"}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* work experience section */}
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ borderBottom: "1px solid #C3C3C3", display: 'flex' }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography
                                                sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', p: 0, m: 0, }} >
                                                Work Experience
                                            </Typography>
                                        </Box>

                                        <Box sx={{}}>
                                            <Box sx={{ display: { md: 'flex' }, cursor: 'pointer' }} >
                                                < AddCircleOutlineIcon fontSize='small' onClick={() => handleModalexp()} />
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <CandidateExp personalData={personalData} ApplicationId={ApplicationId} />
                                    </Box>
                                </Box>
                                {/* Academic */}
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ borderBottom: "1px solid #C3C3C3", display: 'flex' }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography
                                                sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', p: 0, m: 0, }} >
                                                Academic
                                            </Typography>
                                        </Box>

                                        <Box sx={{}}>
                                            <Box sx={{ display: { md: 'flex' }, cursor: 'pointer' }} >
                                                < AddCircleOutlineIcon fontSize='small' onClick={() => handleModalAcademic()} />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <CandidateAccademic personalData={personalData} ApplicationId={ApplicationId} count={count} setcount={setcount} />
                                    </Box>
                                </Box>
                                {/* certifications */}
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ borderBottom: "1px solid #C3C3C3", display: 'flex' }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography
                                                sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', p: 0, m: 0, }} >
                                                Certifications
                                            </Typography>
                                        </Box>

                                        <Box sx={{}}>
                                            <Box sx={{ display: { md: 'flex' }, cursor: 'pointer' }} onClick={() => handleModalCertification()}>
                                                < AddCircleOutlineIcon fontSize='small' />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <CandidateCertification personalData={personalData} ApplicationId={ApplicationId} count={count} setcount={setcount} />
                                    </Box>
                                </Box>
                                {/* skill section */}
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ borderBottom: "1px solid #C3C3C3", display: 'flex' }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography
                                                sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', p: 0, m: 0, }} >
                                                Skills
                                            </Typography>
                                        </Box>

                                        <Box sx={{}}>
                                            <Box sx={{ display: { md: 'flex' }, cursor: 'pointer' }} onClick={() => handleModalSkill()}>
                                                < AddCircleOutlineIcon fontSize='small' />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <CandidateSkill personalData={personalData} ApplicationId={ApplicationId} count={count} setcount={setcount} />
                                    </Box>
                                </Box>
                                {/* Hobbies */}
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ borderBottom: "1px solid #C3C3C3", display: 'flex' }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography
                                                sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', p: 0, m: 0, }} >
                                                Hobbies
                                            </Typography>
                                        </Box>

                                        <Box sx={{}}>
                                            <Box sx={{ display: { md: 'flex' }, cursor: 'pointer' }} onClick={() => handleModalHobbies()}>
                                                < AddCircleOutlineIcon fontSize='small' />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <CandidateHobbies personalData={personalData} ApplicationId={ApplicationId} count={count} setcount={setcount} />
                                    </Box>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ borderBottom: "1px solid #C3C3C3", display: 'flex' }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography
                                                sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', p: 0, m: 0, }} >
                                                Reference
                                            </Typography>
                                        </Box>

                                        <Box sx={{}}>
                                            <Box sx={{ display: { md: 'flex' }, cursor: 'pointer' }} onClick={() => handleModalReference()} >
                                                < AddCircleOutlineIcon fontSize='small' />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <CandidateReference personalData={personalData} ApplicationId={ApplicationId} count={count} setcount={setcount} />
                                    </Box>
                                </Box>

                                {/* attachments */}
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ borderBottom: "1px solid #C3C3C3", display: 'flex' }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography
                                                sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', p: 0, m: 0, }} >
                                                Attachments
                                            </Typography>
                                        </Box>

                                        <Box sx={{}}>
                                            <Box sx={{ display: { md: 'flex' }, cursor: 'pointer' }} onClick={() => handleModalCertificate()} >
                                                < AddCircleOutlineIcon fontSize='small' />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <CandidateResume personalData={personalData} ApplicationId={ApplicationId} count={count} setcount={setcount} />
                                    </Box>
                                </Box>

                            </Box>
                        </Box>}


            <CandidateModal isModalOpen={isModalOpen} setCareerModalOpen={setCareerModalOpen} ApplicationId={ApplicationId} count={count} setcount={setcount} />
            <AboutModal isModalOpenAbout={isModalOpenAbout} setCareerModalOpenAbout={setCareerModalOpenAbout}
                ApplicationId={ApplicationId} count={count} setcount={setcount} Aboutme={Aboutme} Setaboutme={Setaboutme} />

            <CertificationModal isModalOpenCerti={isModalOpenCerti} setCareerModalOpenCerti={setCareerModalOpenCerti}
                ApplicationId={ApplicationId} count={count} setcount={setcount} />

            <SkillModal isModalOpenskill={isModalOpenskill} setCareerModalOpenSkill={setCareerModalOpenSkill}
                ApplicationId={ApplicationId} count={count} setcount={setcount} />
            <HobbiesModal isModalOpenHobbies={isModalOpenHobbies} setCareerModalOpenHobbies={setCareerModalOpenHobbies}
                ApplicationId={ApplicationId} count={count} setcount={setcount} />
            <ReferenceModal isModalOpenReference={isModalOpenReference} setCareerModalOpenReference={setCareerModalOpenReference}
                ApplicationId={ApplicationId} count={count} setcount={setcount} />

            <CertificateModal isModalOpenCertificate={isModalOpenCertificate} setCareerModalOpenCertificate={setCareerModalOpenCertificate}
                ApplicationId={ApplicationId} count={count} setcount={setcount} />

            <AcademicModal isModalOpenAcademic={isModalOpenAcademic} setCareerModalAcademic={setCareerModalAcademic} UniData={UniData}
                ApplicationId={ApplicationId} count={count} setcount={setcount} edu={edu} course={course} setCourse={setCourse} setUniData={setUniData}
                courseData={courseData} education={education} UniversityData={UniversityData} SpecilizationData={SpecilizationData} personalData={personalData}
                spclData={spclData} BoardData={BoardData} seteducation={seteducation} setSpecialization={setSpecialization} board={board} setBoard={setBoard} />

            <ExpModal isModalOpenexp={isModalOpenexp} setCareerModalOpenexp={setCareerModalOpenexp}
                ApplicationId={ApplicationId} count={count} setcount={setcount} personalData={personalData} />

        </Box>
    );
};

export default memo(CandidateDashDetails);
