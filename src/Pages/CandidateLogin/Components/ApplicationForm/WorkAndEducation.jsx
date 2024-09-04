import { Box, Typography, Button, Tooltip } from '@mui/joy'
import React, { lazy, useState, useCallback, memo } from 'react'
import JoyCheckbox from '../../../Muicomponents/JoyCheckbox'
import axioslogin from '../../../../Axios/Axios'


const ExperienceModal = lazy(() => import('./ExperienceModal'))
const Educationmodal = lazy(() => import('./Educationmodal'))


const WorkAndEducation = ({ formdata, setformdata, seteducation, Regionexp, setRegionexp, Regionedu, setRegionedu, handleOnClick, experience, setexprience,
    education, expdata, expdataset, education_details, seteducation_details, edudata, edudataset, eduname, course, setCourse, setUniData, UniData,
    setSpecialization, SpecilizationData, board, setBoard }) => {


    const { agreestatus, agreestatus_marketing, } = formdata;
    const updateBoard = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformdata({ ...formdata, [e.target.name]: value })
    }, [formdata, setformdata]);

    const [edu, setedu] = useState([])
    const [courseData, setCourseData] = useState([])
    const [spclData, setSpclData] = useState([])
    const [UniversityData, setUniversityData] = useState([])
    const [BoardData, setBoardData] = useState([])


    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpenedu, setIsModalOpenedu] = useState(false)

    const handleOnClickexp = useCallback(() => {
        setIsModalOpen(true)
    }, [])
    // for education details
    const handleOnClickedu = useCallback(async () => {
        setIsModalOpenedu(true)
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
    }, [])
    return (
        <>
            <Box sx={{ display: 'flex', g: 1, mt: 2 }}>
                <Box sx={{ width: "50%", border: 1, ":hover": { borderColor: 'red' } }}>
                    <Tooltip title="Add Your Experience">
                        <Box sx={{ p: 1, cursor: 'pointer' }}
                            onClick={handleOnClickexp}
                        >
                            <Typography sx={{ mt: 3, textAlign: 'center', p: 0, m: 0 }}>ADD EXPERIENCE </Typography>
                        </Box>
                    </Tooltip>

                </Box>
                <Box sx={{ ml: 1, width: "50%", border: 1, ":hover": { borderColor: 'red' } }}>
                    <Tooltip title="Add Your Education">
                        <Box sx={{ p: 1, cursor: 'pointer', }}
                            onClick={handleOnClickedu}
                        >

                            <Typography sx={{ mt: 3, textAlign: 'center', p: 0, m: 0 }}>ADD EDUCATION </Typography>
                        </Box>
                    </Tooltip>

                </Box>
            </Box>
            <Box sx={{ display: 'flex', g: 1, mt: 2 }}>
                <Box sx={{ width: "50%", display: 'flex', flexDirection: 'column' }} >
                    {
                        expdata?.map((val, index) => {
                            return (

                                <Box sx={{ display: 'flex', mt: 1 }} key={val.id} >
                                    <Box>
                                        <Typography>Employer Name:</Typography>
                                        <Typography>Job Title:</Typography>
                                        <Typography>Start Date:</Typography>
                                        <Typography>End Date:</Typography>
                                        <Typography>Currently Working Status:</Typography>
                                    </Box>
                                    <Box sx={{ ml: 1 }}>
                                        <Typography sx={{ color: '#87C4FF' }}>{val?.Employer === '' ? 'Not Updated' : val?.Employer}</Typography>
                                        <Typography sx={{ color: '#87C4FF' }}>{val?.jobexp === '' ? 'Not Updated' : val?.jobexp}</Typography>
                                        <Typography sx={{ color: '#87C4FF' }}>{val?.expstartdate === 0 ? 'Not Updated' : val?.expstartdate}</Typography>
                                        <Typography sx={{ color: '#87C4FF' }}>{val?.expenddate === 0 ? 'Not Updated' : val?.expenddate}</Typography>
                                        <Typography sx={{ color: '#87C4FF' }}>{val?.Workingstatus === false ? 'Not Working' : val?.Workingstatus === true ? 'Currently Working' : 'Not Updated'}</Typography>

                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Box>
                <Box sx={{ width: "50%", display: 'flex', flexDirection: 'column' }}>
                    {
                        edudata?.map((val, index) => {
                            const correspondingEduName = eduname[index];

                            return (
                                <Box sx={{ ml: 2, mt: 1, display: 'flex' }} key={val.id}>
                                    <Box>
                                        <Typography>Education:</Typography>
                                        <Typography>School Name:</Typography>
                                        <Typography>Start Date:</Typography>
                                        <Typography>End Date:</Typography>
                                        <Typography>Graduated or Not:</Typography>
                                    </Box>
                                    <Box sx={{ ml: 1 }}>
                                        <Typography sx={{ color: '#87C4FF' }}>{correspondingEduName?.edu_desc === '' ? 'Not Updated' : correspondingEduName?.edu_desc}</Typography>
                                        <Typography sx={{ color: '#87C4FF' }}>{val?.schoolname === '' ? 'Not Updated' : val?.schoolname}</Typography>
                                        <Typography sx={{ color: '#87C4FF' }}>{val?.edustartdate === 0 ? 'Not Updated' : val?.edustartdate}</Typography>
                                        <Typography sx={{ color: '#87C4FF' }}>{val?.eduenddate === 0 ? 'Not Updated' : val?.eduenddate}</Typography>
                                        <Typography sx={{ color: '#87C4FF' }}>{val?.Graduated === false ? 'Not Graduated' : val?.Graduated === true ? 'Graduated' : 'Not Updated'}</Typography>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                <JoyCheckbox
                    label='I hereby declare that the details mentioned above are correct.'
                    name="agreestatus"
                    checked={agreestatus}
                    onchange={(e) => updateBoard(e)}
                />
            </Box>
            <Box sx={{ mt: 3 }}>
                <JoyCheckbox
                    label='
                        I agree to receive an email after submitting the application form.'
                    name="agreestatus_marketing"
                    checked={agreestatus_marketing}
                    onchange={(e) => updateBoard(e)}
                />
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Tooltip title="View">
                    <Button
                        variant="outlined"
                        component="label"
                        size="md"
                        color="primary"
                        onClick={handleOnClick}
                    >
                        Submit Application

                    </Button>
                </Tooltip>
            </Box>
            <ExperienceModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                formdata={formdata}
                setformdata={setformdata}
                Regionexp={Regionexp}
                setRegionexp={setRegionexp}
                expdata={expdata}
                expdataset={expdataset}
                experience={experience}
                setexprience={setexprience}
            />
            <Educationmodal
                isModalOpenedu={isModalOpenedu}
                setIsModalOpenedu={setIsModalOpenedu}
                formdata={formdata}
                setformdata={setformdata}
                seteducation={seteducation}
                Regionedu={Regionedu}
                setRegionedu={setRegionedu}
                education_details={education_details}
                seteducation_details={seteducation_details}
                edudata={edudata}
                edudataset={edudataset}
                education={education}
                edu={edu}
                course={course}
                setCourse={setCourse}
                courseData={courseData}
                setSpecialization={setSpecialization}
                SpecilizationData={SpecilizationData}
                spclData={spclData} BoardData={BoardData} board={board} setBoard={setBoard}
                setUniData={setUniData} UniData={UniData} UniversityData={UniversityData}
            />
        </>
    )
}

export default memo(WorkAndEducation)