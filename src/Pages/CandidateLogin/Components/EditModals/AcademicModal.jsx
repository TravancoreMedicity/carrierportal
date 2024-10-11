import { Box, Button, IconButton, Modal, ModalClose, ModalDialog, Option, Select, Table, Tooltip, Typography, } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import InputComponent from '../../../Muicomponents/InputComponent'
import { succesNofity, warningNofity } from '../../../CommonCode/CommonFunc';
import axioslogin from '../../../../Axios/Axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
// import JoyCheckbox from '../../../Muicomponents/JoyCheckbox';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSpring, animated } from '@react-spring/web';
import { Backdrop } from '@mui/material';


const Fade = React.forwardRef((props, ref) => {
    const { in: open, children, ownerState, ...other } = props
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});
const AcademicModal = ({ isModalOpenAcademic, setCareerModalAcademic, UniData, personalData,
    ApplicationId, count, setcount, edu, course, setCourse, setUniData,
    courseData, education, UniversityData, SpecilizationData,
    spclData, BoardData, seteducation, setSpecialization, board, setBoard }) => {

    const [edudata, setedudata] = useState([])
    const [value, setvalue] = useState(0)
    const [Selectedid, setidSelected] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.get(`/common/educationDetails/${ApplicationId}`);
            const { success, data } = result.data
            if (success === 1 && data?.length > 0) {
                setedudata(data)
                setcount(0)
            } else {
                setedudata([])
            }
        }
        fetchData()
    }, [count])
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
    const [education_details, seteducation_details] = useState({
        schoolname: "", edustartdate: moment(new Date()).format('YYYY-MM-DD'), eduenddate: moment(new Date()).format('YYYY-MM-DD'), id: Math.ceil(Math.random() * 1000),
        Graduated: false, AvgGrade: "", gpa: "", DateAcquired: moment(new Date()).format('YYYY-MM-DD'), ProjectedDate: moment(new Date()).format('YYYY-MM-DD'),
    });

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



    const postdata = useMemo(() => {
        return {
            education_details: [{
                schoolname,
                edustartdate,
                eduenddate,
                Graduated,
                AvgGrade,
                gpa,
                DateAcquired,
                ProjectedDate,
                board,
                course,
                education,
                university: UniData,
                specialization: SpecilizationData,
                id: Math.ceil(Math.random() * 1000),

                // Add other fields if necessary
            }],
            ApplicationId: ApplicationId,
        }
    }, [ApplicationId, schoolname, edustartdate, eduenddate, Graduated, AvgGrade, gpa, DateAcquired, ProjectedDate, board, course, education, UniData, SpecilizationData]);

    const Updatepostdata = useMemo(() => {
        return {
            // experience: experience,
            education_details: [{
                schoolname,
                edustartdate,
                eduenddate,
                Graduated,
                AvgGrade,
                gpa,
                DateAcquired,
                ProjectedDate,
                board,
                course,
                education,
                university: UniData,
                specialization: SpecilizationData,
                id: Math.ceil(Math.random() * 1000),

                // Add other fields if necessary
            }],
            ApplicationId: ApplicationId,
            Applicationslno: personalData?.application_slno,
            id: Selectedid
        }
    }, [personalData, Selectedid, ApplicationId, schoolname, edustartdate, eduenddate, Graduated, AvgGrade, gpa, DateAcquired, ProjectedDate, board, course, education, UniData, SpecilizationData])
    //for saving
    const Datasave = useCallback(async () => {
        if (value === 0) {
            if (schoolname === "") {
                warningNofity("Enter School/College Name")
            }
            else if (gpa === "") {
                warningNofity("Enter  GPA / Percentage")

            } else {
                const result = await axioslogin.post('/common/insertdataedudata', postdata);
                const { success, message } = result.data;
                if (success === 2) {
                    succesNofity(message);
                    seteducation_details(defaultState)
                    seteducation(0)
                    seteducation_details({
                        schoolname: '',
                        edustartdate: moment(new Date()).format('YYYY-MM-DD'),
                        eduenddate: moment(new Date()).format('YYYY-MM-DD'),
                        Graduated: false,
                        AvgGrade: '',
                        gpa: "",
                        DateAcquired: moment(new Date()).format('YYYY-MM-DD'),
                        ProjectedDate: moment(new Date()).format('YYYY-MM-DD'),
                        id: Math.ceil(Math.random() * 1000),

                    });
                    setcount(count + 1)
                    setCareerModalAcademic(false)


                }
            }
        } else {
            if (schoolname === '') {
                warningNofity("Enter Company Name");
            } else if (gpa === "") {
                warningNofity("Enter Job Title");
            } else {
                const result = await axioslogin.post('/common/updataedudata', Updatepostdata);
                const { success, message } = result.data;
                if (success === 2) {
                    succesNofity(message);
                    setcount(count + 1)
                    setvalue(0)
                    // expdataset(newExpdata);
                    setCareerModalAcademic(false)
                    seteducation_details({
                        schoolname: '',
                        edustartdate: moment(new Date()).format('YYYY-MM-DD'),
                        eduenddate: moment(new Date()).format('YYYY-MM-DD'),
                        Graduated: false,
                        AvgGrade: '',
                        gpa: "",
                        DateAcquired: moment(new Date()).format('YYYY-MM-DD'),
                        ProjectedDate: moment(new Date()).format('YYYY-MM-DD'),
                        id: Math.ceil(Math.random() * 1000),

                    });
                    seteducation(0)
                    setCourse(0)
                    setSpecialization(0)
                    setUniData(0)
                    setBoard(0)
                } else {
                    warningNofity(message);

                }
            }
        }
    }, [AvgGrade, schoolname, edustartdate, eduenddate, Graduated, gpa, DateAcquired, ProjectedDate, education, defaultState, count, Updatepostdata
        , seteducation_details, seteducation])

    const onClose = useCallback((e) => {
        setCareerModalAcademic(false)
    }, [setCareerModalAcademic])


    const EditData = useCallback((item) => {
        setidSelected(item.id)

        setvalue(1)
        seteducation_details({
            schoolname: item.schoolname || '',
            edustartdate: moment(new Date(item.edustartdate)).format('YYYY-MM-DD') || moment(new Date()).format('YYYY-MM-DD'),
            eduenddate: moment(new Date(item.eduenddate)).format('YYYY-MM-DD') || moment(new Date()).format('YYYY-MM-DD'),
            Graduated: item.Graduated || false,
            AvgGrade: item.AvgGrade || '',
            gpa: item.gpa || '',
        });
        seteducation(item.education)
        setCourse(item.course)
        setSpecialization(item.specialization)
        setUniData(item.university)
        setBoard(item.board)
        // setidSelected(item.idexp)
        // setvalue(1)
    }, []);

    const DeleteData = useCallback(async (item) => {

        const Deletepostdata = {
            ApplicationId: ApplicationId,
            Applicationslno: personalData?.application_slno,
            id: item?.id
        };

        const result = await axioslogin.post('/common/deleteEdudata', Deletepostdata);
        const { success, message } = result.data;
        if (success === 2) {
            succesNofity(message);
            setCareerModalAcademic(false)
            setcount(count + 1)
            setvalue(0)
            // Optionally, reset the experience state if you want to clear the form
            seteducation_details({
                schoolname: '',
                edustartdate: moment(new Date()).format('YYYY-MM-DD'),
                eduenddate: moment(new Date()).format('YYYY-MM-DD'),
                Graduated: false,
                AvgGrade: '',
                gpa: "",
                DateAcquired: moment(new Date()).format('YYYY-MM-DD'),
                ProjectedDate: moment(new Date()).format('YYYY-MM-DD'),
                id: Math.ceil(Math.random() * 1000),

            });
            seteducation(0)
            setCourse(0)
            setSpecialization(0)
            setUniData(0)
            setBoard(0)
        } else {
            warningNofity(message);
        }

    }, [setCareerModalAcademic]);


    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={isModalOpenAcademic}
                onClose={onClose}
                // closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog size='sm' sx={{
                    width: '50%', backgroundColor: '#FFFBF5',
                    '@media screen and (max-width: 768px)': {
                        width: '100%',

                    },
                }}>
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Box sx={{ p: 1 }}>

                        <Typography sx={{ fontFamily: "Bahnschrift", color: '#555555', fontSize: 18, fontWeight: 400, }}>Add your Educational Information</Typography>
                        {/* <CustmTypog title={'Add your Educational Information'} /> */}
                        <Box sx={{ height: window.innerHeight - 250, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>

                            <Box sx={{}}>
                                <Typography sx={{ mt: 2, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>Education
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

                                // onChange={(e) => seteducation(e.target.value)}                       
                                >
                                    {edu?.map((val, idx) => <Option key={idx} value={val?.edu_slno} >{val.edu_desc}</Option>)}
                                </Select>

                            </Box>
                            <Box sx={{}}>
                                <Typography sx={{ mt: 1, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>Course
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
                                <Typography sx={{ mt: 1, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>Specialization
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
                                <Typography sx={{ mt: 1, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>University
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
                                <Typography sx={{ mt: 1, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>Board
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
                                <Typography sx={{ mt: 1, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>School / University Name
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
                                    style={{
                                        width: '100%',
                                        '--Input-focusedThickness': '0.02rem',
                                        '--Input-focusedHighlight': '#6e7782',
                                    }}
                                />
                            </Box>
                            <Box sx={{}}>
                                <Typography sx={{ mt: 1, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>Start Date
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
                                    style={{
                                        fontFamily: "Bahnschrift", fontSize: { xs: 15 }, fontWeight: 400,
                                        width: '100%',
                                        '--Input-focusedThickness': '0.02rem',
                                        '--Input-focusedHighlight': '#6e7782',
                                    }}
                                />
                            </Box>
                            <Box sx={{}}>
                                <Typography sx={{ mt: 1, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>End Date
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
                                    style={{
                                        fontFamily: "Bahnschrift", fontSize: { xs: 15 }, fontWeight: 400,
                                        width: '100%',
                                        '--Input-focusedThickness': '0.02rem',
                                        '--Input-focusedHighlight': '#6e7782',
                                    }}
                                />
                            </Box>
                            {/* <Box sx={{ mt: 3 }}>
                                <JoyCheckbox
                                    label='Graduated'
                                    name="Graduated"
                                    checked={Graduated}
                                    onchange={(e) => updateBoard(e)}
                                />
                            </Box> */}


                            <Box sx={{}}>
                                <Typography sx={{ mt: 1, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>Average Grade
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
                                    style={{
                                        width: '100%',
                                        '--Input-focusedThickness': '0.02rem',
                                        '--Input-focusedHighlight': '#6e7782',
                                    }}
                                />
                            </Box>
                            <Box sx={{}}>
                                <Typography sx={{ mt: 1, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>GPA

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
                                    style={{
                                        width: '100%',
                                        '--Input-focusedThickness': '0.02rem',
                                        '--Input-focusedHighlight': '#6e7782',
                                    }}
                                />
                            </Box>




                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                <Tooltip title="Add your Educational Information" sx={{ minWidth: 150, textAlign: 'center', bgcolor: '#8a8a8a' }} arrow>
                                    <IconButton variant="outlined" size='sm' onClick={Datasave} sx={{ p: .5 }}>
                                        <AddCircleOutlineIcon sx={{ color: "#555555" }} />
                                    </IconButton>
                                </Tooltip>


                            </Box>

                            <Box sx={{ mt: 2 }}>
                                <Table aria-label="basic table" size="sm" sx={{
                                    "--Table-headerUnderlineThickness": "1px",
                                    "--TableCell-height": "0px",
                                    "--TableCell-paddingX": "-11px"
                                }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '10%' }}> Sl no</th>
                                            <th style={{}}>Education</th>
                                            <th style={{}}>Course</th>
                                            <th style={{}}>Specialization</th>
                                            <th style={{
                                                width: 30,

                                            }}></th>
                                            <th style={{
                                                width: 30,


                                            }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {edudata && edudata.length > 0 ? (
                                            edudata?.map((education, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td style={{ wordBreak: 'break-word' }}>
                                                        {education?.edu_desc === null ? "not updated" : education?.edu_desc}
                                                    </td>
                                                    <td style={{ wordBreak: 'break-word' }}>
                                                        {education?.cour_desc === null ? "not updated" : education?.cour_desc}
                                                    </td>
                                                    <td style={{ wordBreak: 'break-word' }}>
                                                        {education?.spec_desc === null ? "not updated" : education?.spec_desc}
                                                    </td>
                                                    <td>
                                                        <IconButton size='small' color='primary'>
                                                            <Tooltip title="Edit" sx={{ minWidth: 150, textAlign: 'center', bgcolor: '#8a8a8a' }} arrow>

                                                                <EditIcon sx={{ color: "#555555" }}
                                                                    onClick={() => EditData(education)}
                                                                />
                                                            </Tooltip>

                                                        </IconButton>
                                                    </td>
                                                    <td>
                                                        <IconButton size='small' color='primary'>
                                                            <Tooltip title="Delete" sx={{ minWidth: 150, textAlign: 'center', bgcolor: '#8a8a8a' }} arrow>

                                                                <DeleteIcon sx={{ color: "#555555" }}
                                                                    onClick={() => DeleteData(education)}
                                                                />
                                                            </Tooltip>

                                                        </IconButton>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} style={{ textAlign: 'center' }}>
                                                    No experience details available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Box>
                        </Box>
                    </Box>

                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(AcademicModal)