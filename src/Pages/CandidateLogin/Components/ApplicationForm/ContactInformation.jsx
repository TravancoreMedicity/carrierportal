import React, { lazy, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, IconButton, Tooltip, Typography, } from '@mui/joy'
import InputComponent from '../../../Muicomponents/InputComponent'
import JoySalutation from '../../../Muicomponents/JoySalutation'
import RegionJoy from '../../../Muicomponents/RegionJoy'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import axioslogin from "../../../../Axios/Axios";
import JoyReligion from '../../../Muicomponents/JoyReligion'
import JoyGender from '../../../Muicomponents/JoyGender'
import JoyBloodGroup from '../../../Muicomponents/JoyBloodGroup'
import moment from 'moment'
import { succesNofity, warningNofity } from '../../../CommonCode/CommonFunc'


const ApplicationQuestion = lazy(() => import('./ApplicationQuestion'))
const MainModal = lazy(() => import('./MainModal'))


const ContactInformation = ({ ApplicationId, setCareerModalOpen, count, setcount }) => {


    const [pin, setpin] = useState([]);
    const [expdata, expdataset] = useState([])
    const [edudata, edudataset] = useState([])
    const [value, setValue] = useState(0)
    // const [count, setcount] = useState(0)
    const [data, setdata] = useState([])
    const [eduname, seteduname] = useState([])
    const [vacancydata, setvacancydata] = useState([])
    const [selectedVacancies, setSelectedVacancies] = useState([]);
    const [education, seteducation] = useState(0)
    const [Regionexp, setRegionexp] = useState(0);
    const [Regionedu, setRegionedu] = useState(0);
    const [Religion, setReligion] = useState(0);
    const [Region, setRegion] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [addressPermnt1, setaddressPermnt1] = useState('')
    const [addressPermnt2, setaddressPermnt2] = useState('')
    const [gender, setGender] = useState(0)
    const [course, setCourse] = useState(0)
    const [SpecilizationData, setSpecialization] = useState(0)
    const [UniData, setUniData] = useState(0)
    const [board, setBoard] = useState(0)

    const [applicationSlno, setApplicationno] = useState(0)
    const [bloodgrp, setBloodgrp] = useState(0)
    const [experience, setexprience] = useState({
        Employer: "", expstartdate: moment(new Date()).format('YYYY-MM-DD'), expenddate: moment(new Date()).format('YYYY-MM-DD'),
        Workingstatus: false, Responsibilities: "", jobexp: "", SupervisorName: '', Additionalinf: '', Other: ''
    });
    const [education_details, seteducation_details] = useState({
        schoolname: "", edustartdate: moment(new Date()).format('YYYY-MM-DD'), eduenddate: moment(new Date()).format('YYYY-MM-DD'),
        Graduated: false, AvgGrade: "", gpa: "", DateAcquired: moment(new Date()).format('YYYY-MM-DD'), ProjectedDate: moment(new Date()).format('YYYY-MM-DD'),
    });
    const [formdata, setformdata] = useState({
        name: '',
        lname: '',
        mname: '',
        email: '',
        reemail: '',
        mobile: 0,
        date: moment(new Date()).format('YYYY-MM-DD'),
        permnt_pin: 0,
        status_yes: false,
        status_no: false,
        Health_statusyes: false,
        Health_statusno: false,
        criminal_statusyes: false,
        criminal_statusno: false,
        obligation_status_yes: false,
        obligation_status_no: false,
        relatives_status_yes: false,
        relatives_status_no: false,
        recruitment_status_yes: false,
        recruitment_status_no: false,
        vaccinated_statusyes: false,
        vaccinated_statusno: false,
        vaccinated_statuspar: false,
        criminal: '',
        obligation: '',
        recruitment: '',
        Health: "",
        job: "",
        empemail: "",
        empname: '',
        empno: "",
        About: '',
        agreestatus: false,
        agreestatus_marketing: false,
        education: 0,
    });
    const resetForm = useMemo(() => {
        return {
            name: '',
            lname: '',
            mname: '',
            email: '',
            reemail: '',
            mobile: 0,
            date: moment(new Date()).format('YYYY-MM-DD'),
            permnt_pin: 0,
            status_yes: false,
            status_no: false,
            Health_statusyes: false,
            Health_statusno: false,
            criminal_statusyes: false,
            criminal_statusno: false,
            obligation_status_yes: false,
            obligation_status_no: false,
            relatives_status_yes: false,
            relatives_status_no: false,
            recruitment_status_yes: false,
            recruitment_status_no: false,
            vaccinated_statusyes: false,
            vaccinated_statusno: false,
            vaccinated_statuspar: false,
            criminal: '',
            obligation: '',
            recruitment: '',
            Health: "",
            job: "",
            empemail: "",
            empname: '',
            empno: "",
            agreestatus: false,
            agreestatus_marketing: false,
            education: 0,
        }
    }, [])
    const { status_yes, status_no, Health_statusyes, Health_statusno, criminal_statusyes,
        criminal_statusno, obligation_status_yes, obligation_status_no, relatives_status_yes,
        relatives_status_no, recruitment_status_yes, recruitment_status_no, vaccinated_statusyes,
        vaccinated_statusno, vaccinated_statuspar, agreestatus_marketing, reemail,
        agreestatus, name, lname, mname, email, mobile, date, permnt_pin, criminal, obligation,
        recruitment, Health, job, empemail, empname, empno, About } = formdata;
    const postdata = useMemo(() => {
        return {
            expdata: expdata,
            edudata: edudata,
            name: name, lname: lname, mname: mname, email: email, mobile: mobile, dob: date, permnt_pin: permnt_pin, criminal: criminal,
            obligation: obligation,
            recruitment: recruitment, Health: Health, job: job, empemail: empemail, empname: empname,
            empno: empno,
            value: value,
            Religion: Religion,
            Region: Region,
            opportunity_status: status_yes === true ? 1 : status_no === true ? 2 : 0,
            vaccination_status: vaccinated_statusyes === true ? 1 : vaccinated_statusno === true ? 2 : vaccinated_statuspar === true ? 3 : 0,
            helath_status: Health_statusyes === true ? 1 : Health_statusno === true ? 2 : 0,
            criminal_status: criminal_statusyes === true ? 1 : criminal_statusno === true ? 2 : 0,
            legal_obligation_status: obligation_status_yes === true ? 1 : obligation_status_no === true ? 2 : 0,
            relatives_friends_status: relatives_status_yes === true ? 1 : relatives_status_no === true ? 2 : 0,
            recruitment_sts: recruitment_status_yes === true ? 1 : recruitment_status_no === true ? 2 : 0,
            agree_status: agreestatus === true ? 1 : 0,
            agree_marketing_status: agreestatus_marketing === true ? 1 : 0,
            applicationSlno: ApplicationId,
            selectedVacancies: selectedVacancies,
            addressPermnt1: addressPermnt1,
            addressPermnt2: addressPermnt2,
            gender: gender,
            bloodgrp: bloodgrp,
            About: About

        }
    }, [status_yes, vaccinated_statusyes, Health_statusyes, criminal_statusyes, obligation_status_yes, recruitment_status_yes, addressPermnt1, addressPermnt2, About,
        relatives_status_yes, agreestatus, agreestatus_marketing, applicationSlno, expdata, edudata, value, Religion, criminal_statusno, gender, bloodgrp,
        Region, date, email, mobile, criminal, Health, Health_statusno, vaccinated_statuspar, mname, lname, name, permnt_pin, obligation_status_no, ApplicationId,
        relatives_status_no, recruitment_status_no, vaccinated_statusno, status_no, empno, recruitment, job, empemail, empname, obligation, selectedVacancies
    ])

    const contPin = useMemo(() => permnt_pin, [permnt_pin])

    const getRegion = useCallback(async () => {
        if (contPin !== null) {
            const result = await axioslogin.get(`/common/region/bypin/${contPin}`)
            const { success, data } = result.data;
            if (success === 1) {
                setpin(data)
            }
            else {
                setpin([])
            }
        }
    }, [contPin])

    const updateBoard = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformdata({ ...formdata, [e.target.name]: value })
    }, [formdata, setformdata]);
    //to open the main modal
    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        setIsModalOpen(true)
    }, [setIsModalOpen])


    //to show the education name and show in the workexperience page
    const qualification = useMemo(() => {
        return {
            education: education
        }
    }, [education])

    const education1 = useMemo(() => eduname, [eduname])
    useEffect(() => {
        if (education === null || education === 0) {
            setdata([])
        } else {
            const fetchData = async () => {
                const result = await axioslogin.post('/common/eduname', qualification)
                const { success, data1 } = result.data
                if (success === 1 && data1?.length > 0) {
                    const newdata = [...eduname, ...data1]
                    seteduname(newdata)
                    const result = await axioslogin.post('/common/list', qualification)
                    const { success, data } = result.data
                    if (success === 1 && data?.length > 0) {
                        const newdatas = [...vacancydata, ...data]
                        const keys = ['desg_id'];
                        const filteredData = newdatas.filter((value, index, self) =>
                            self.findIndex(v => keys.every(k => v[k] === value[k])) === index
                        );

                        setvacancydata(filteredData)

                    } else {
                        setvacancydata([])
                    }
                } else {
                    seteduname([])
                }
            }
            fetchData()
        }

    }, [setdata, qualification, education, setvacancydata,])


    //to save the all details in the application form
    const handleOnSave = useCallback(async (event) => {
        event.preventDefault()
        if (Object.keys(edudata).length === 0) {
            warningNofity("Please Enter All Details in Education")
            setIsModalOpen(false)
        } else if (agreestatus === false && agreestatus_marketing === false) {
            warningNofity("Please Tick the Agreement ")
            setIsModalOpen(false)
        }
        else {
            const result = await axioslogin.post('/common/insertdata', postdata)
            const { success, message } = result.data
            if (success === 1) {
                setcount(count + 1)
                succesNofity(message)
                setIsModalOpen(false)
                expdataset([])
                edudataset([])
                setValue(0)
                setRegionexp(0)
                setRegionedu(0)
                setReligion(0)
                setRegion(0)
                setaddressPermnt1('')
                setaddressPermnt2('')
                setformdata(resetForm)
                setGender(0)
                setBloodgrp(0)
                setCareerModalOpen(false)
            } else {
                warningNofity(message)
                setIsModalOpen(false)
            }
        }

    }, [postdata, edudata, agreestatus, agreestatus_marketing, setIsModalOpen, resetForm, count, setcount, setCareerModalOpen])
    return (
        <Box sx={{ display: 'flex', flex: 1, py: 0.5, height: window.innerHeight - 120 }} >
            <Box sx={{ display: "flex", justifyContent: 'center', width: "100%", overflow: 'auto' }}>
                <Box sx={{
                    width: "50%", '@media screen and (max-width: 768px)': {
                        width: "80%",
                    },
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                        {/* <Typography level="h4" sx={{}}>CONTACT INFORMATION</Typography> */}
                        <Typography sx={{}}>Please enter your contact information.</Typography>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Title </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <Box>
                            <JoySalutation value={value} setValue={setValue} />
                        </Box>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>First Name </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                type="text"
                                value={name}
                                name="name"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Last Name </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <Box>

                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={lname}
                                name="lname"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Middle Name </Typography>

                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={mname}
                                name="mname"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Email Address </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={email}
                                name="email"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Reenter Email Address </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={reemail}
                                name="reemail"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>


                        {email === '' ? <Typography sx={{}}></Typography> : email !== reemail ?
                            <Typography sx={{ color: "red" }}>Please check the email your entered</Typography> : <Typography sx={{ color: 'green' }}>Correct</Typography>
                        }
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Mobile Number </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={mobile}
                                name="mobile"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>About </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={About}
                                name="About"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Typography level="h4" sx={{ mt: 3 }}>PERSONAL INFORMATION</Typography>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Pincode </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={permnt_pin}
                                name='permnt_pin'
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                            <Tooltip title="Click" followCursor placement='top' arrow >
                                <IconButton sx={{ paddingY: 0.5, ml: 2 }}
                                    onClick={(e) => getRegion(e)}
                                >
                                    <ArrowCircleRightIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Region </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <Box>
                            <RegionJoy regValue={Region} getRegion={setRegion} pin={pin} />
                        </Box>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Religion </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <Box>
                            <JoyReligion value={Religion} setValue={setReligion} />
                        </Box>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Date of Birth </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="date"
                                value={date}
                                name="date"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Permanent Address </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <InputComponent
                            type="text"
                            size="sm"
                            placeholder="House Name"
                            name="addressPermnt1"
                            value={addressPermnt1}
                            onchange={(e) => setaddressPermnt1(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Permanent Address </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <InputComponent
                            type="text"
                            size="sm"
                            placeholder="Permanent Address"
                            name="addressPermnt1"
                            value={addressPermnt2}
                            onchange={(e) => setaddressPermnt2(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Gender </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <JoyGender
                            value={gender} setValue={setGender}
                        />
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Blood Group </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <JoyBloodGroup value={bloodgrp} setValue={setBloodgrp} />


                        <Typography level="h4" sx={{ mt: 3, color: 'black' }}>APPLICATION QUESTIONS </Typography>
                        <Typography sx={{}}>Please answer the following questions.</Typography>
                        <ApplicationQuestion setformdata={setformdata} formdata={formdata} seteducation={seteducation}
                            Regionexp={Regionexp} setRegionexp={setRegionexp} Regionedu={Regionedu} education={education}
                            setRegionedu={setRegionedu} handleOnClick={handleOnClick} expdata={expdata} expdataset={expdataset}
                            experience={experience} setexprience={setexprience} education_details={education_details} course={course} setCourse={setCourse}
                            seteducation_details={seteducation_details} edudata={edudata} edudataset={edudataset} eduname={eduname} board={board} setBoard={setBoard}
                            SpecilizationData={SpecilizationData} setSpecialization={setSpecialization} UniData={UniData} setUniData={setUniData}
                        />
                    </Box>
                </Box>
            </Box>
            <MainModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                formdata={formdata}
                expdata={expdata}
                edudata={edudata}
                education={education}
                handleOnSave={handleOnSave}
                vacancydata={vacancydata}
                selectedVacancies={selectedVacancies}
                setSelectedVacancies={setSelectedVacancies}
                eduname={education1}
                data={data}
            />
        </Box>
    )
}

export default ContactInformation