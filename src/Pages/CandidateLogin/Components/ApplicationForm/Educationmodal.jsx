import React, { useEffect, useMemo, memo, useState, useCallback } from 'react'
import { Box, Button, Modal, Typography } from '@mui/joy'
import ModalClose from '@mui/joy/ModalClose';
import { Option, Select } from '@mui/joy';
import _ from 'underscore';
import moment from 'moment';
import JoyCheckbox from '../../../Muicomponents/JoyCheckbox';
import InputComponent from '../../../Muicomponents/InputComponent';
import axioslogin from '../../../../Axios/Axios';
import { warningNofity } from '../../../CommonCode/CommonFunc';


const Educationmodal = ({ setIsModalOpenedu, isModalOpenedu, Regionedu, setRegionedu, seteducation, education_details, edu, course, setCourse, courseData,
    seteducation_details, edudata, edudataset, education, setSpecialization, SpecilizationData, spclData, setUniData, UniData, UniversityData, BoardData,
    board, setBoard }) => {

    const filterarr = courseData?.filter(val => val.edu_slno === education)
    const filterBoardarr = BoardData?.filter(val => val.education_slno === education)
    const filterspclarr = spclData?.filter(val => val.cour_slno === course)

    const [coursedisable, setcoursedisable] = useState(false)
    const [specdisable, setspecdisable] = useState(false)
    const [boarddisable, setBoarddisable] = useState(false)
    const [unidisable, setunidisable] = useState(false)
    const [regTypedisable, setregTypedisable] = useState(false)


    useEffect(() => {
        if (education === 4) {
            setunidisable(true)
            setBoarddisable(false)
            setcoursedisable(false)
            setspecdisable(false)
            setregTypedisable(true)
            // setregNodisable(true)
        }
        else if (education === 5) {
            setBoarddisable(false)
            setunidisable(true)
            setcoursedisable(true)
            setspecdisable(true)
            setregTypedisable(true)
            // setregNodisable(true)
        } else {
            setcoursedisable(false)
            setspecdisable(false)
            setunidisable(false)
            setBoarddisable(true)
            setregTypedisable(false)
            // setregNodisable(false)
        }
    }, [education])

    const {
        schoolname, edustartdate, eduenddate, Graduated, AvgGrade, gpa,
        DateAcquired, ProjectedDate } = education_details;
    const updateBoard = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        seteducation_details({ ...education_details, [e.target.name]: value })
    }, [education_details, seteducation_details]);

    const defaultState = useMemo(() => {
        return {
            schoolname: '',
            edustartdate: moment(new Date()).format('YYYY-MM-DD'), eduenddate: moment(new Date()).format('YYYY-MM-DD'),
            Graduated: false, AvgGrade: '', gpa: "", DateAcquired: moment(new Date()).format('YYYY-MM-DD'), ProjectedDate: moment(new Date()).format('YYYY-MM-DD'),
        }
    }, [])


    //adding  edu
    const addeduData = useCallback(() => {
        if (schoolname === "") {
            warningNofity("Enter School/College Name")
        }
        else if (gpa === "") {
            warningNofity("Enter  GPA / Percentage")

        } else {
            const newdata = {
                id: Math.ceil(Math.random() * 1000),
                schoolname: schoolname,
                edustartdate: edustartdate,
                eduenddate: eduenddate,
                Graduated: Graduated,
                AvgGrade: AvgGrade,
                gpa: gpa,
                DateAcquired: DateAcquired,
                ProjectedDate: ProjectedDate,
                Regionedu: Regionedu,
                education: education,
                course: course,
                specialization: SpecilizationData,
                university: UniData,
                board: board,
            }
            const newdatas = [...edudata, newdata]
            edudataset(newdatas)
            seteducation_details(defaultState)
            seteducation(0)
            setRegionedu(0)
        }
    }, [defaultState, AvgGrade, schoolname, edustartdate, eduenddate, Graduated, gpa, DateAcquired, ProjectedDate, Regionedu, education
        , edudataset, seteducation_details, seteducation, setRegionedu, edudata])
    //for saving
    const Datasave = useCallback(() => {
        if (schoolname === "") {
            warningNofity("Enter School/College Name")
        }
        else if (gpa === "") {
            warningNofity("Enter  GPA / Percentage")

        } else {
            const newdata = {
                id: Math.ceil(Math.random() * 1000),
                schoolname: schoolname,
                edustartdate: edustartdate,
                eduenddate: eduenddate,
                Graduated: Graduated,
                AvgGrade: AvgGrade,
                gpa: gpa,
                DateAcquired: DateAcquired,
                ProjectedDate: ProjectedDate,
                Regionedu: Regionedu,
                education: education,
                course: course,
                specialization: SpecilizationData,
                university: UniData,
                board: board,
            }
            const newdatas = [...edudata, newdata]
            edudataset(newdatas)
            seteducation_details(defaultState)
            seteducation(0)
            setRegionedu(0)
            // setPermnt_pin(0)
            setIsModalOpenedu(false)
        }
    }, [defaultState, AvgGrade, schoolname, edustartdate, eduenddate, Graduated, gpa, DateAcquired, ProjectedDate, Regionedu, education
        , edudataset, seteducation_details, seteducation, setRegionedu, setIsModalOpenedu, edudata])
    return (
        <Box>
            <Modal open={isModalOpenedu} onClose={() => setIsModalOpenedu(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '30%',
                        '@media screen and (max-width: 768px)': {
                            width: "80%",
                        },
                        bgcolor: 'white',
                        // boxShadow: 24,
                        backgroundColor: '#FFFBF5',
                        p: 3,
                        borderRadius: 10,
                        // border: 1
                    }}
                ><ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Typography sx={{ fontFamily: "Bahnschrift", color: '#555555', }}>Add your Educational Information</Typography>
                    {/* <CustmTypog title={'Add your Educational Information'} /> */}
                    <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>

                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>Education
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <Select
                                onChange={(event, newValue) => {
                                    seteducation(newValue)
                                }}
                                // disabled={false}
                                placeholder="education"
                                size="md"
                                variant="outlined"
                                value={education}
                            //onChange={(e) => seteducation(e.target.value)}                       
                            >
                                {edu?.map((val, idx) => <Option key={idx} value={val?.edu_slno} >{val.edu_desc}</Option>)}
                            </Select>

                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>Course
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <Select
                                onChange={(event, newValue) => {
                                    setCourse(newValue)
                                }}
                                disabled={coursedisable}
                                placeholder="Course"
                                size="md"
                                variant="outlined"
                                value={course}
                            //onChange={(e) => seteducation(e.target.value)}                       
                            >
                                {filterarr?.map((val, idx) => <Option key={idx} value={val?.cour_slno} >{val?.cour_desc}</Option>)}
                            </Select>

                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>Specialization
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <Select
                                onChange={(event, newValue) => {
                                    setSpecialization(newValue)
                                }}
                                disabled={specdisable}
                                placeholder="Specialization"
                                size="md"
                                variant="outlined"
                                value={SpecilizationData}
                            //onChange={(e) => seteducation(e.target.value)}                       
                            >
                                {filterspclarr?.map((val, idx) => <Option key={idx} value={val.spec_slno}>{val.spec_desc}</Option>)}
                            </Select>

                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>University
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <Select
                                onChange={(event, newValue) => {
                                    setUniData(newValue)
                                }}
                                disabled={unidisable}
                                placeholder="University"
                                size="md"
                                variant="outlined"
                                value={UniData}
                            //onChange={(e) => seteducation(e.target.value)}                       
                            >
                                {UniversityData?.map((val, idx) => <Option key={idx} value={val.unver_slno}>{val.unver_name}</Option>)}
                            </Select>

                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>Board
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <Select
                                onChange={(event, newValue) => {
                                    setBoard(newValue)
                                }}
                                disabled={boarddisable}
                                placeholder="Board"
                                size="md"
                                variant="outlined"
                                value={board}
                            //onChange={(e) => seteducation(e.target.value)}                       
                            >
                                {filterBoardarr?.map((val, idx) => <Option key={idx} value={val.board_slno}>{val.board_name} </Option>)}
                            </Select>

                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>School / University Name
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={schoolname}
                                name="schoolname"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>Start Date
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="date"
                                value={edustartdate}
                                name="edustartdate"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>End Date
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="date"
                                value={eduenddate}
                                name="eduenddate"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <JoyCheckbox
                                label='Graduated'
                                name="Graduated"
                                checked={Graduated}
                                onchange={(e) => updateBoard(e)}
                            />
                        </Box>


                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>Average Grade
                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <InputComponent
                                // variant="plain"
                                type="number"
                                value={AvgGrade}
                                name="AvgGrade"
                                onchange={(e) => updateBoard(e)}
                                size="md"

                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>GPA

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <InputComponent
                                // variant="plain"
                                type="number"
                                value={gpa}
                                name="gpa"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>



                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button sx={{
                            p: 0, width: "15%",
                            '@media screen and (max-width: 768px)': {
                                width: "40%",
                            },
                        }} size='sm' variant="outlined" color="success" onClick={addeduData} >
                            Add more
                        </Button>

                        <Button sx={{
                            p: 0, width: "15%", color: '#555555',
                            '@media screen and (max-width: 768px)': {
                                width: "40%",
                            },
                        }} size='sm' variant="outlined" color="primary" onClick={Datasave}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal >
        </Box >
    )
}

export default memo(Educationmodal) 