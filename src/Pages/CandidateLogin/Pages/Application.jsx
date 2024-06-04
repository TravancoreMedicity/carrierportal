// @ts-nocheck
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Box, Checkbox, CircularProgress, LinearProgress, Tooltip, Typography } from '@mui/joy'
import MailIcon from '@mui/icons-material/Mail'
import { Paper } from '@mui/material'
import CustomInput from '../Components/CustomInput'
import Button from '@mui/joy/Button';
import District from '../Components/District'
import State from '../Components/State'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useSelector } from 'react-redux'
import { getUser } from '../../../Redux/LoginSlice'
import { ToastContainer } from 'react-toastify'

import GoolePayImage from '../../../assets/Google-Pay.png'
import { errorNofity, infoNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant'
import axioslogin from '../../../Axios/Axios'
import { useNavigate } from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CustBackDrop from '../../../Components/CustBackDrop'
import CustBackDropWithState from '../../../Components/CustBackDropWithState'

const Application = () => {
    const navigate = useNavigate()

    const loggedInfo = useSelector((state) => getUser(state))
    const data = JSON.parse(loggedInfo)
    const userGoogleID = data?.id

    const [open, setOpen] = useState(false)

    const [applicationProcess, setApplicationProcess] = useState(false)

    // GET APPLICATION STATUS

    useLayoutEffect(() => {
        const getApplicationStatus = async () => {
            const result = await axioslogin.get(`/app_registration/getApplicationStatus/${userGoogleID}`)
            const { success, data } = result.data;

            if (success === 2 && data?.length > 0) {
                const appStatus = data[0]
                appStatus?.app_status !== null && appStatus?.app_status !== undefined && appStatus?.app_status === 1 ? setApplicationProcess(true) : setApplicationProcess(false)
                if (appStatus?.app_status === 0) {
                    const getRegisterImforamation = await axioslogin.get(`/app_registration/getregistration/${userGoogleID}`)
                    const { success, data } = getRegisterImforamation.data;
                    // console.log(data)
                    if (success === 1) {
                        setApplicationForm({
                            ...applicationForm,
                            name: data[0]?.app_name,
                            gender: Number(data[0]?.app_gender),
                            dob: data[0]?.app_dob,
                            applicationID: data[0]?.application_id
                        })
                    }
                }
            } else {
                setApplicationProcess(false)
                errorNofity('Somthing Went wrong. Please try again later')
                return
            }
        }
        if (userGoogleID !== null || userGoogleID !== undefined) {
            getApplicationStatus(userGoogleID)
        }
    }, [userGoogleID])

    const [applicationForm, setApplicationForm] = useState({
        applicationID: 0,
        name: '',
        gender: 0,
        community: '',
        cast: '',
        placebirth: '',
        age: 0,
        dob: '',
        nationality: '',
        adharNo: '',
        guardianName: '',
        guardianRelation: '',
        fatherName: '',
        fatherOccupation: '',
        motherName: '',
        motherOccupation: '',
        income: '',
        landline: '',
        perAddress: '',
        perDistrict: '',
        perState: '',
        perPincode: '',
        perMobile: '',
        communAddress: '',
        communDistrict: '',
        communState: '',
        communPincode: '',
        communMobile: '',
        qulExamBoard: '',
        qulNameOfBoard: '',
        qulYearOfPassing: 0,
        qulRegisterNo: '',

        plusOnePhysics: 0,
        plusOneChemistry: 0,
        plusOneBiology: 0,
        plusOneEnglish: 0,
        plusOneTotal: 0,
        plusOneMaxPhysics: 0,
        plusOneMaxChemistry: 0,
        plusOneMaxBiology: 0,
        plusOneMaxEnglish: 0,
        plusOneMaxTotal: 0,
        plusTwoPhysics: 0,
        plusTwoChemistry: 0,
        plusTwoBiology: 0,
        plusTwoEnglish: 0,
        plusTwoTotal: 0,
        plusTwoMaxPhysics: 0,
        plusTwoMaxChemistry: 0,
        plusTwoMaxBiology: 0,
        plusTwoMaxEnglish: 0,
        plusTwoMaxTotal: 0,
        physicsPercentage: 0,
        chemistryPercentage: 0,
        biologyPercentage: 0,
        englishPercentage: 0,
        totalPercentage: 0,
        tenth_boardInstitute: '',
        tenth_nameOfExam: '',
        tenth_yearOfPassing: 0,
        tenth_registerNo: '',
        tenth_noOfAttempts: 0,
        tenth_markObtain: 0,
        tenth_maxMarks: 0,
        tenth_percentage: 0,
        plusTwo_boardInstitute: '',
        plusTwo_nameOfExam: '',
        plusTwo_yearOfPassing: 0,
        plusTwo_registerNo: '',
        plusTwo_noOfAttempts: 0,
        plusTwo_markObtain: 0,
        plusTwo_maxMarks: 0,
        plusTwo_percentage: 0,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        const sanitizedValue = sanitizeInput(value);
        setApplicationForm((applicationForm) => ({ ...applicationForm, [name]: sanitizedValue }))
    }

    const [physicper, setphysicper] = useState(false)
    const handlePhysicsPercentage = (e) => {
        e.preventDefault()
        if (
            Number(applicationForm.plusTwoPhysics) !== 0 && Number(applicationForm.plusTwoMaxPhysics) !== 0
            && applicationForm.plusTwoPhysics !== null && applicationForm.plusTwoPhysics !== undefined
            && applicationForm.plusTwoMaxPhysics !== null && applicationForm.plusTwoMaxPhysics !== undefined
            && Number(applicationForm.plusTwoPhysics) <= Number(applicationForm.plusTwoMaxPhysics)
        ) {
            const perCentage = Number(applicationForm.plusTwoPhysics) / Number(applicationForm.plusTwoMaxPhysics) * 100
            setphysicper(true)
            setApplicationForm({ ...applicationForm, physicsPercentage: perCentage.toFixed(2) })
        } else {
            setApplicationForm({ ...applicationForm, physicsPercentage: 0 })
        }
    }

    const [chemistryPer, setchemistryPer] = useState(false)
    const handleChemistryPercentage = (e) => {
        e.preventDefault()
        if (
            Number(applicationForm.plusTwoChemistry) !== 0 && Number(applicationForm.plusTwoMaxChemistry) !== 0
            && applicationForm.plusTwoChemistry !== null && applicationForm.plusTwoChemistry !== undefined
            && applicationForm.plusTwoMaxChemistry !== null && applicationForm.plusTwoMaxChemistry !== undefined
            && Number(applicationForm.plusTwoChemistry) <= Number(applicationForm.plusTwoMaxChemistry)
        ) {
            const perCentage = Number(applicationForm.plusTwoChemistry) / Number(applicationForm.plusTwoMaxChemistry) * 100
            setchemistryPer(true)
            setApplicationForm({ ...applicationForm, chemistryPercentage: perCentage.toFixed(2) })
        } else {
            setApplicationForm({ ...applicationForm, chemistryPercentage: 0 })
        }
    }


    const [biologyper, setbiologyper] = useState(false)
    const handleBiologyPercentage = (e) => {
        e.preventDefault()
        if (
            Number(applicationForm.plusTwoBiology) !== 0 && Number(applicationForm.plusTwoMaxBiology) !== 0
            && applicationForm.plusTwoBiology !== null && applicationForm.plusTwoBiology !== undefined
            && applicationForm.plusTwoMaxBiology !== null && applicationForm.plusTwoMaxBiology !== undefined
            && Number(applicationForm.plusTwoBiology) <= Number(applicationForm.plusTwoMaxBiology)
        ) {
            const perCentage = Number(applicationForm.plusTwoBiology) / Number(applicationForm.plusTwoMaxBiology) * 100
            setbiologyper(true)
            setApplicationForm({ ...applicationForm, biologyPercentage: perCentage.toFixed(2) })
        } else {
            setApplicationForm({ ...applicationForm, biologyPercentage: 0 })
        }
    }

    const [englishPer, setenglishPer] = useState(false)
    const handleenglishPerTwoPercentage = (e) => {
        e.preventDefault()
        if (
            Number(applicationForm.plusTwoEnglish) !== 0 && Number(applicationForm.plusTwoMaxEnglish) !== 0
            && applicationForm.plusTwoEnglish !== null && applicationForm.plusTwoEnglish !== undefined
            && applicationForm.plusTwoMaxEnglish !== null && applicationForm.plusTwoMaxEnglish !== undefined
            && Number(applicationForm.plusTwoEnglish) <= Number(applicationForm.plusTwoMaxEnglish)
        ) {
            const perCentage = Number(applicationForm.plusTwoEnglish) / Number(applicationForm.plusTwoMaxEnglish) * 100
            setenglishPer(true)
            setApplicationForm({ ...applicationForm, englishPercentage: perCentage.toFixed(2) })
        } else {
            setApplicationForm({ ...applicationForm, englishPercentage: 0 })
        }
    }

    const [totalPlusTwo, settotalPlusTwo] = useState(false)
    const handletotalPlusTwoPercentage = (e) => {
        e.preventDefault()
        if (
            Number(applicationForm.plusTwoTotal) !== 0 && Number(applicationForm.plusTwoMaxTotal) !== 0
            && applicationForm.plusTwoTotal !== null && applicationForm.plusTwoTotal !== undefined
            && applicationForm.plusTwoMaxTotal !== null && applicationForm.plusTwoMaxTotal !== undefined
            && Number(applicationForm.plusTwoTotal) <= Number(applicationForm.plusTwoMaxTotal)
        ) {
            const perCentage = Number(applicationForm.plusTwoTotal) / Number(applicationForm.plusTwoMaxTotal) * 100
            settotalPlusTwo(true)
            setApplicationForm({ ...applicationForm, totalPercentage: perCentage.toFixed(2) })
        } else {
            setApplicationForm({ ...applicationForm, totalPercentage: 0 })
        }
    }

    const [disableTotalFeild, setdisableTotalFeild] = useState(false)
    const onClickCalculateTotalMarkObtained = (e) => {
        e.preventDefault()
        if (
            Number(applicationForm.plusTwoPhysics) !== 0 && Number(applicationForm.plusTwoPhysics) !== null && Number(applicationForm.plusTwoPhysics) !== undefined
            && Number(applicationForm.plusTwoChemistry) !== 0 && Number(applicationForm.plusTwoChemistry) !== null && Number(applicationForm.plusTwoChemistry) !== undefined
            && Number(applicationForm.plusTwoBiology) !== 0 && Number(applicationForm.plusTwoBiology) !== null && Number(applicationForm.plusTwoBiology) !== undefined
        ) {
            const total = Number(applicationForm.plusTwoPhysics) + Number(applicationForm.plusTwoChemistry) + Number(applicationForm.plusTwoBiology)
            setdisableTotalFeild(true)
            setApplicationForm({ ...applicationForm, plusTwoTotal: total.toFixed(2) })
        } else {
            setApplicationForm({ ...applicationForm, plusTwoTotal: 0 })
        }
    }


    const [disableTotalMaxFeild, setdisableTotalMaxFeild] = useState(false)
    const onClickCalculateTotalMaxMarkObtained = (e) => {
        e.preventDefault()
        if (
            Number(applicationForm.plusTwoMaxPhysics) !== 0 && Number(applicationForm.plusTwoMaxPhysics) !== null && Number(applicationForm.plusTwoMaxPhysics) !== undefined
            && Number(applicationForm.plusTwoMaxChemistry) !== 0 && Number(applicationForm.plusTwoMaxChemistry) !== null && Number(applicationForm.plusTwoMaxChemistry) !== undefined
            && Number(applicationForm.plusTwoMaxBiology) !== 0 && Number(applicationForm.plusTwoMaxBiology) !== null && Number(applicationForm.plusTwoMaxBiology) !== undefined
        ) {
            const total = Number(applicationForm.plusTwoMaxPhysics) + Number(applicationForm.plusTwoMaxChemistry) + Number(applicationForm.plusTwoMaxBiology)
            setdisableTotalMaxFeild(true)
            setApplicationForm({ ...applicationForm, plusTwoMaxTotal: total.toFixed(2) })
        } else {
            setApplicationForm({ ...applicationForm, plusTwoMaxTotal: 0 })
        }
    }

    const [appVerification, setAppVerification] = useState(false)
    // console.log(appVerification)

    const handleSubmitApplicationForm = useCallback(async (e) => {
        e.preventDefault()
        if (
            applicationForm.name === null || applicationForm.name === undefined || applicationForm.name === ''
            || applicationForm.gender === null || applicationForm.gender === undefined || applicationForm.gender === 0
            || applicationForm.community === null || applicationForm.community === undefined || applicationForm.community === ''
            || applicationForm.cast === null || applicationForm.cast === undefined || applicationForm.cast === ''
            || applicationForm.placebirth === null || applicationForm.placebirth === undefined || applicationForm.placebirth === ''
            || applicationForm.age === null || applicationForm.age === undefined || applicationForm.age === 0
            || applicationForm.nationality === null || applicationForm.nationality === undefined || applicationForm.nationality === ''
            || applicationForm.adharNo === null || applicationForm.adharNo === undefined || applicationForm.adharNo === ''
            || applicationForm.guardianName === null || applicationForm.guardianName === undefined || applicationForm.guardianName === ''
            || applicationForm.guardianRelation === null || applicationForm.guardianRelation === undefined || applicationForm.guardianRelation === ''
            || applicationForm.fatherName === null || applicationForm.fatherName === undefined || applicationForm.fatherName === ''
            || applicationForm.fatherOccupation === null || applicationForm.fatherOccupation === undefined || applicationForm.fatherOccupation === ''
            || applicationForm.motherName === null || applicationForm.motherName === undefined || applicationForm.motherName === ''
            || applicationForm.motherOccupation === null || applicationForm.motherOccupation === undefined || applicationForm.motherOccupation === ''
            || applicationForm.income === null || applicationForm.income === undefined || applicationForm.income === ''
            || applicationForm.perAddress === null || applicationForm.perAddress === undefined || applicationForm.perAddress === ''
            || applicationForm.perDistrict === null || applicationForm.perDistrict === undefined || applicationForm.perDistrict === ''
            || applicationForm.perState === null || applicationForm.perState === undefined || applicationForm.perState === ''
            || applicationForm.perPincode === null || applicationForm.perPincode === undefined || applicationForm.perPincode === ''
            || applicationForm.perMobile === null || applicationForm.perMobile === undefined || applicationForm.perMobile === ''
            || applicationForm.qulExamBoard === null || applicationForm.qulExamBoard === undefined || applicationForm.qulExamBoard === ''
            || applicationForm.qulNameOfBoard === null || applicationForm.qulNameOfBoard === undefined || applicationForm.qulNameOfBoard === ''
            || applicationForm.qulYearOfPassing === null || applicationForm.qulYearOfPassing === undefined || Number(applicationForm.qulYearOfPassing) === '0'
            || applicationForm.qulRegisterNo === null || applicationForm.qulRegisterNo === undefined || applicationForm.qulRegisterNo === ''
            || applicationForm.plusOnePhysics === null || applicationForm.plusOnePhysics === undefined || Number(applicationForm.plusOnePhysics) === '0'
            || applicationForm.plusOneChemistry === null || applicationForm.plusOneChemistry === undefined || Number(applicationForm.plusOneChemistry) === '0'
            || applicationForm.plusOneBiology === null || applicationForm.plusOneBiology === undefined || Number(applicationForm.plusOneBiology) === '0'
            || applicationForm.plusOneEnglish === null || applicationForm.plusOneEnglish === undefined || Number(applicationForm.plusOneEnglish) === '0'
            || applicationForm.plusOneTotal === null || applicationForm.plusOneTotal === undefined || Number(applicationForm.plusOneTotal) === '0'
            || applicationForm.plusOneMaxPhysics === null || applicationForm.plusOneMaxPhysics === undefined || Number(applicationForm.plusOneMaxPhysics) === '0'
            || applicationForm.plusOneMaxChemistry === null || applicationForm.plusOneMaxChemistry === undefined || Number(applicationForm.plusOneMaxChemistry) === '0'
            || applicationForm.plusOneMaxBiology === null || applicationForm.plusOneMaxBiology === undefined || Number(applicationForm.plusOneMaxBiology) === '0'
            || applicationForm.plusOneMaxEnglish === null || applicationForm.plusOneMaxEnglish === undefined || Number(applicationForm.plusOneMaxEnglish) === '0'
            || applicationForm.plusOneMaxTotal === null || applicationForm.plusOneMaxTotal === undefined || Number(applicationForm.plusOneMaxTotal) === '0'
            || applicationForm.plusTwoPhysics === null || applicationForm.plusTwoPhysics === undefined || Number(applicationForm.plusTwoPhysics) === '0'
            || applicationForm.plusTwoChemistry === null || applicationForm.plusTwoChemistry === undefined || Number(applicationForm.plusTwoChemistry) === '0'
            || applicationForm.plusTwoBiology === null || applicationForm.plusTwoBiology === undefined || Number(applicationForm.plusTwoBiology) === '0'
            || applicationForm.plusTwoEnglish === null || applicationForm.plusTwoEnglish === undefined || Number(applicationForm.plusTwoEnglish) === '0'
            || applicationForm.plusTwoTotal === null || applicationForm.plusTwoTotal === undefined || Number(applicationForm.plusTwoTotal) === '0'
            || applicationForm.plusTwoMaxPhysics === null || applicationForm.plusTwoMaxPhysics === undefined || Number(applicationForm.plusTwoMaxPhysics) === '0'
            || applicationForm.plusTwoMaxChemistry === null || applicationForm.plusTwoMaxChemistry === undefined || Number(applicationForm.plusTwoMaxChemistry) === '0'
            || applicationForm.plusTwoMaxBiology === null || applicationForm.plusTwoMaxBiology === undefined || Number(applicationForm.plusTwoMaxBiology) === '0'
            || applicationForm.plusTwoMaxEnglish === null || applicationForm.plusTwoMaxEnglish === undefined || Number(applicationForm.plusTwoMaxEnglish) === '0'
            || applicationForm.plusTwoMaxTotal === null || applicationForm.plusTwoMaxTotal === undefined || Number(applicationForm.plusTwoMaxTotal) === '0'
            || applicationForm.physicsPercentage === null || applicationForm.physicsPercentage === undefined || Number(applicationForm.physicsPercentage) === '0'
            || applicationForm.chemistryPercentage === null || applicationForm.chemistryPercentage === undefined || Number(applicationForm.chemistryPercentage) === '0'
            || applicationForm.biologyPercentage === null || applicationForm.biologyPercentage === undefined || Number(applicationForm.biologyPercentage) === '0'
            || applicationForm.englishPercentage === null || applicationForm.englishPercentage === undefined || Number(applicationForm.englishPercentage) === '0'
            || applicationForm.totalPercentage === null || applicationForm.totalPercentage === undefined || Number(applicationForm.totalPercentage) === '0'
            || applicationForm.tenth_boardInstitute === null || applicationForm.tenth_boardInstitute === undefined || applicationForm.tenth_boardInstitute === ''
            || applicationForm.tenth_nameOfExam === null || applicationForm.tenth_nameOfExam === undefined || applicationForm.tenth_nameOfExam === ''
            || applicationForm.tenth_yearOfPassing === null || applicationForm.tenth_yearOfPassing === undefined || Number(applicationForm.tenth_yearOfPassing) === '0'
            || applicationForm.tenth_registerNo === null || applicationForm.tenth_registerNo === undefined || applicationForm.tenth_registerNo === ''
            || applicationForm.tenth_noOfAttempts === null || applicationForm.tenth_noOfAttempts === undefined || Number(applicationForm.tenth_noOfAttempts) === '0'
            || applicationForm.tenth_markObtain === null || applicationForm.tenth_markObtain === undefined || Number(applicationForm.tenth_markObtain) === '0'
            || applicationForm.tenth_maxMarks === null || applicationForm.tenth_maxMarks === undefined || Number(applicationForm.tenth_maxMarks) === '0'
            || applicationForm.tenth_percentage === null || applicationForm.tenth_percentage === undefined || Number(applicationForm.tenth_percentage) === '0'
            || applicationForm.plusTwo_boardInstitute === null || applicationForm.plusTwo_boardInstitute === undefined || applicationForm.plusTwo_boardInstitute === ''
            || applicationForm.plusTwo_nameOfExam === null || applicationForm.plusTwo_nameOfExam === undefined || applicationForm.plusTwo_nameOfExam === ''
            || applicationForm.plusTwo_yearOfPassing === null || applicationForm.plusTwo_yearOfPassing === undefined || Number(applicationForm.plusTwo_yearOfPassing) === '0'
            || applicationForm.plusTwo_registerNo === null || applicationForm.plusTwo_registerNo === undefined || applicationForm.plusTwo_registerNo === ''
            || applicationForm.plusTwo_noOfAttempts === null || applicationForm.plusTwo_noOfAttempts === undefined || Number(applicationForm.plusTwo_noOfAttempts) === '0'
            || applicationForm.plusTwo_markObtain === null || applicationForm.plusTwo_markObtain === undefined || Number(applicationForm.plusTwo_markObtain) === '0'
            || applicationForm.plusTwo_maxMarks === null || applicationForm.plusTwo_maxMarks === undefined || Number(applicationForm.plusTwo_maxMarks) === '0'
            || applicationForm.plusTwo_percentage === null || applicationForm.plusTwo_percentage === undefined || Number(applicationForm.plusTwo_percentage) === '0'
        ) {
            warningNofity("Please fill all the required fields")
        } else {
            if (appVerification === true) {

                const postApplicationData = {
                    applicationId: applicationForm.applicationID,
                    app_google_ID: userGoogleID,
                    name: applicationForm.name,
                    gender: applicationForm.gender,
                    community: applicationForm.community,
                    cast: applicationForm.cast,
                    placebirth: applicationForm.placebirth,
                    age: applicationForm.age,
                    dob: applicationForm.dob,
                    nationality: applicationForm.nationality,
                    adharNo: applicationForm.adharNo,
                    guardianName: applicationForm.guardianName,
                    guardianRelation: applicationForm.guardianRelation,
                    fatherName: applicationForm.fatherName,
                    fatherOccupation: applicationForm.fatherOccupation,
                    motherName: applicationForm.motherName,
                    motherOccupation: applicationForm.motherOccupation,
                    income: applicationForm.income,
                    landline: applicationForm.landline,
                    perAddress: applicationForm.perAddress,
                    perDistrict: applicationForm.perDistrict,
                    perState: applicationForm.perState,
                    perPincode: applicationForm.perPincode,
                    perMobile: applicationForm.perMobile,
                    communAddress: applicationForm.communAddress,
                    communDistrict: applicationForm.communDistrict,
                    communState: applicationForm.communState,
                    communPincode: applicationForm.communPincode,
                    communMobile: applicationForm.communMobile,
                    qulExamBoard: applicationForm.qulExamBoard,
                    qulNameOfBoard: applicationForm.qulNameOfBoard,
                    qulYearOfPassing: applicationForm.qulYearOfPassing,
                    qulRegisterNo: applicationForm.qulRegisterNo,
                    plusOnePhysics: applicationForm.plusOnePhysics,
                    plusOneChemistry: applicationForm.plusOneChemistry,
                    plusOneBiology: applicationForm.plusOneBiology,
                    plusOneEnglish: applicationForm.plusOneEnglish,
                    plusOneTotal: applicationForm.plusOneTotal,
                    plusOneMaxPhysics: applicationForm.plusOneMaxPhysics,
                    plusOneMaxChemistry: applicationForm.plusOneMaxChemistry,
                    plusOneMaxBiology: applicationForm.plusOneMaxBiology,
                    plusOneMaxEnglish: applicationForm.plusOneMaxEnglish,
                    plusOneMaxTotal: applicationForm.plusOneMaxTotal,
                    plusTwoPhysics: applicationForm.plusTwoPhysics,
                    plusTwoChemistry: applicationForm.plusTwoChemistry,
                    plusTwoBiology: applicationForm.plusTwoBiology,
                    plusTwoEnglish: applicationForm.plusTwoEnglish,
                    plusTwoTotal: applicationForm.plusTwoTotal,
                    plusTwoMaxPhysics: applicationForm.plusTwoMaxPhysics,
                    plusTwoMaxChemistry: applicationForm.plusTwoMaxChemistry,
                    plusTwoMaxBiology: applicationForm.plusTwoMaxBiology,
                    plusTwoMaxEnglish: applicationForm.plusTwoMaxEnglish,
                    plusTwoMaxTotal: applicationForm.plusTwoMaxTotal,
                    physicsPercentage: applicationForm.physicsPercentage,
                    chemistryPercentage: applicationForm.chemistryPercentage,
                    biologyPercentage: applicationForm.biologyPercentage,
                    englishPercentage: applicationForm.englishPercentage,
                    totalPercentage: applicationForm.totalPercentage,
                    tenth_boardInstitute: applicationForm.tenth_boardInstitute,
                    tenth_nameOfExam: applicationForm.tenth_nameOfExam,
                    tenth_yearOfPassing: applicationForm.tenth_yearOfPassing,
                    tenth_registerNo: applicationForm.tenth_registerNo,
                    tenth_noOfAttempts: applicationForm.tenth_noOfAttempts,
                    tenth_markObtain: applicationForm.tenth_markObtain,
                    tenth_maxMarks: applicationForm.tenth_maxMarks,
                    tenth_percentage: applicationForm.tenth_percentage,
                    plusTwo_boardInstitute: applicationForm.plusTwo_boardInstitute,
                    plusTwo_nameOfExam: applicationForm.plusTwo_nameOfExam,
                    plusTwo_yearOfPassing: applicationForm.plusTwo_yearOfPassing,
                    plusTwo_registerNo: applicationForm.plusTwo_registerNo,
                    plusTwo_noOfAttempts: applicationForm.plusTwo_noOfAttempts,
                    plusTwo_markObtain: applicationForm.plusTwo_markObtain,
                    plusTwo_maxMarks: applicationForm.plusTwo_maxMarks,
                    plusTwo_percentage: applicationForm.plusTwo_percentage,
                }

                // console.log(postApplicationData)
                const result = await axioslogin.post(`/app_registration/postapplication/`, postApplicationData)
                const { success } = result.data
                if (success === 2) {
                    succesNofity('Application Submitted Successfully')
                    setApplicationForm({})
                    navigate('/CandidateHome/CourseSelection', { replace: true });
                } else {
                    errorNofity('Something went wrong')
                }
            } else {
                infoNofity("Please verify your application")
            }
        }

    }, [applicationForm, userGoogleID, appVerification])


    return (
        <Box className="flex w-full flex-col items-center " >
            <ToastContainer />
            <Paper className='flex h-[80%]  sm:w-[100%] md:w-[100%] lg:w-[90%] xl:w-[90%] items-center flex-col gap-1 mt-3'>
                <Box className=" flex w-full items-center pl-5 bg-transparent shadow-md" >
                    <Typography level="h4" sx={{ color: '#6b5e68', p: 1 }} >Application</Typography>
                </Box>
                <CustBackDropWithState open={open} handleClose={setOpen} />
                {
                    applicationProcess === true ?
                        <Box className="flex flex-1 justify-center items-center" >
                            <Typography level='title-lg' fontSize={20} color='danger' >
                                Application Submitted Successfully
                            </Typography>
                        </Box>
                        :
                        <Box className="flex flex-1 w-full flex-col p-2 mb-5 overflow-auto"  >
                            {/* Personal Details */}
                            <Typography level="title-md" sx={{ color: '#6b5e68', }} >Personal Details</Typography>
                            <Box className="flex border flex-col p-2 rounded-md gap-1" >
                                <Box className="flex flex-row justify-center items-center gap-2 px-20 " >

                                    <Box className="flex w-[100%]" >
                                        <Box className={"flex justify-center  items-center w-[40%] "}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap >Name Of the Applicant</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" disabled={true} placeholder={"Name Of the Applicant"} name="name" value={applicationForm.name} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex w-[100%]" >
                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap >Gender</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <Select
                                                sx={{ width: '100%' }}
                                                placeholder="Choose Gender"
                                                color='primary'
                                                name='gender'
                                                disabled={true}
                                                value={applicationForm.gender}
                                            >
                                                <Option value={0}>Choose Gender</Option>
                                                <Option value={1}>Female</Option>
                                                <Option value={2}>Male</Option>
                                                <Option value={3}>Others / Transgender</Option>
                                            </Select>
                                        </Box>
                                    </Box>

                                </Box>

                                <Box className="flex flex-1 flex-row justify-center items-center gap-2 px-20 " >
                                    <Box className="flex flex-1 " >
                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap >Religion or Community</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"Religion or Community"} name="community" value={applicationForm.community} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex flex-1 " >
                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex"  >Cast</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"Cast"} name="cast" value={applicationForm.cast} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="flex flex-1 flex-row justify-center items-center gap-2 px-20 " >
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[40%] justify-center  items-center "}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap  >Place of Birth</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"Place of Birth"} name="placebirth" value={applicationForm.placebirth} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex flex-1">
                                        <Box className={"flex w-[40%] justify-center items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap  >Age & Date of Birth</Typography>
                                        </Box>
                                        <Box className="flex w-[60%] flex-row gap-1">
                                            <CustomInput type="number" className={{ display: 'flex', flex: 1 }} placeholder={"Age"} name="age" value={applicationForm.age} handleChange={handleChange} />
                                            <CustomInput type="date" className={{ display: 'flex', flex: 2 }} placeholder={"Date of Birth"} name="dateOfBirth" value={applicationForm.dateOfBirth} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="flex flex-1 flex-row justify-center items-center gap-2 px-20 " >
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap  >Nationality</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"Nationality"} name="nationality" value={applicationForm.nationality} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap  >Adhar Number</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"Adhar Number"} name="adharNo" value={applicationForm.adharNo} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                </Box>

                            </Box>

                            {/* Parent / GUardian Details */}
                            <Typography level="title-md" sx={{ color: '#6b5e68', mt: 1 }} >Parent / Guardian Details</Typography>
                            <Box className="flex border flex-col p-2 rounded-md gap-1" >

                                <Box className="flex flex-row justify-center items-center gap-2 px-20 " >
                                    <Box className="flex flex-1" >
                                        <Box className="flex w-[40%] justify-center  items-center ">
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap  >Name Of Parent or Guardian</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"Name Of Parent or Guardian"} name="guardianName" value={applicationForm.guardianName} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap  >Relationship</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"Relationship"} name="guardianRelation" value={applicationForm.guardianRelation} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="flex flex-1 flex-row justify-center items-center gap-2 px-20 " >
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap >Father's Name</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"Father's Name"} name="fatherName" value={applicationForm.fatherName} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap >Father's Occupation</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"Father's Occupation"} name="fatherOccupation" value={applicationForm.fatherOccupation} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="flex flex-1 flex-row justify-center items-center gap-2 px-20 " >
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[40%] justify-center  items-center "}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap >Mother's Name</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"Mother's Name"} name="motherName" value={applicationForm.motherName} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex flex-1">
                                        <Box className={"flex w-[40%] justify-center items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap >Mother's Occupation</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"Mother's Occupation"} name="motherOccupation" value={applicationForm.motherOccupation} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="flex flex-1 flex-row justify-center items-center gap-2 px-20 " >
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap >Annual Family income (in Rs.)</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="number" placeholder={"Annual Family income (in Rs.)"} name="income" value={applicationForm.income} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap >Phone Landline with Code</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="number" placeholder={"Phone Landline with Code"} name="landline" value={applicationForm.landline} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>


                            {/* Contact Details */}
                            <Typography level="title-md" sx={{ color: '#6b5e68', mt: 1 }} >Contact Details</Typography>
                            <Box className="flex border flex-col p-2 rounded-md gap-1" >
                                <Box className="flex flex-row justify-center items-center gap-2 px-20 " >
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[20%] justify-center items-center  "}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap  >Permanent Address</Typography>
                                        </Box>
                                        <Box className="w-[80%]">
                                            <CustomInput type="text" placeholder={"Permanent Address"} name="perAddress" value={applicationForm.perAddress} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="flex flex-row justify-center items-center gap-2 px-20 " >
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[20%] justify-center  items-center  "}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap >Address For Communication</Typography>
                                        </Box>
                                        <Box className="w-[80%]">
                                            <CustomInput type="text" placeholder={"Address For Communication"} name="communAddress" value={applicationForm.communAddress} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="flex flex-1 flex-row justify-center items-center gap-2 px-20 " >
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap  >District</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"District"} name="perDistrict" value={applicationForm.perDistrict} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex flex-1" >

                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap >District (Communication)</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"District (Communication)"} name="communDistrict" value={applicationForm.communDistrict} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="flex flex-1 flex-row justify-center items-center gap-2 px-20 " >
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[40%] justify-center  items-center "}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap >State</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"State"} name="perState" value={applicationForm.perState} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex flex-1">
                                        <Box className={"flex w-[40%] justify-center items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap  >State (Communication)</Typography>
                                        </Box>
                                        <Box className="flex w-[60%] flex-row gap-1">
                                            <CustomInput type="text" placeholder={"State (Communication)"} name="communState" value={applicationForm.communState} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="flex flex-1 flex-row justify-center items-center gap-2 px-20 " >
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap  >PIN Code</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"PIN Code"} name="perPincode" value={applicationForm.perPincode} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex flex-1" >

                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap >PIN Code (Communication)</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"PIN Code (Communication)"} name="communPincode" value={applicationForm.communPincode} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="flex flex-1 flex-row justify-center items-center gap-2 px-20 " >
                                    <Box className="flex flex-1" >
                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap  >Mobile Number</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"Mobile Number"} name="perMobile" value={applicationForm.perMobile} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex flex-1" >

                                        <Box className={"flex w-[40%] justify-center  items-center"}>
                                            <Typography level="title-sm" sx={{ color: '#6b5e68', }} className="flex" noWrap >Mobile Number (Communication)</Typography>
                                        </Box>
                                        <Box className="w-[60%]">
                                            <CustomInput type="text" placeholder={"Mobile Number (Communication)"} name="communMobile" value={applicationForm.communMobile} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                </Box>

                            </Box>

                            {/* Details of Qualifying Examination */}
                            <Typography level="title-sm" sx={{ color: '#6b5e68', mt: 1 }} fontWeight='lg' >Details of Qualifying Examination</Typography>
                            <Box className="flex border flex-col p-2 rounded-md gap-1" >
                                <Box className="flex flex-row  w-[100%] " >
                                    <Box className="flex w-[25%] flex-col " >
                                        <Box className="flex justify-center items-center font-semibold text-md px-1" >
                                            Board
                                        </Box>
                                        <Box className="flex">
                                            <CustomInput type="text" className={{ "--Input-radius": "0px" }} placeholder={"Board"} name="qulExamBoard" value={applicationForm.qulExamBoard} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex w-[45%] flex-col  " >
                                        <Box className="flex justify-center items-center font-semibold text-md px-1" >
                                            Name of Board
                                        </Box>
                                        <Box className="flex" >
                                            <CustomInput type="text" className={{ "--Input-radius": "0px" }} placeholder={"Name of Board"} name="qulNameOfBoard" value={applicationForm.qulNameOfBoard} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex w-[15%] flex-col  " >
                                        <Box className="flex justify-center items-center font-semibold text-md px-1" >
                                            Year of Passing
                                        </Box>
                                        <Box className="flex" >
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"Year of Passing"} name="yearOfPassing" value={applicationForm.yearOfPassing} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                    <Box className="flex w-[15%] flex-col " >
                                        <Box className="flex justify-center items-center font-semibold text-md px-1">
                                            Register Number
                                        </Box>
                                        <Box className="flex">
                                            <CustomInput type="text" className={{ "--Input-radius": "0px" }} placeholder={"Register Number"} name="qulRegisterNo" value={applicationForm.qulRegisterNo} handleChange={handleChange} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>


                            {/* Mark Obtained in Qualifying Examination */}
                            <Typography level="title-sm" sx={{ color: '#6b5e68', mt: 1 }} fontWeight='lg' >Mark Obtained in Qualifying Examination</Typography>
                            <Box className="flex border flex-col p-2 rounded-md gap-1" >
                                <Box className="flex flex-row  w-[100%] " >
                                    {/* subject */}
                                    <Box className="flex w-[30%] flex-col " >
                                        <Box className="flex flex-1 justify-center items-center font-semibold text-md px-1" >
                                            Subject
                                        </Box>
                                        <Box className="flex flex-1 justify-center items-center font-semibold text-md px-1" >
                                            .
                                        </Box>
                                        <Box className="flex h-[32px] items-center pl-2">
                                            <Typography level='body-sm' fontWeight='lg' >(a) Physics</Typography>
                                        </Box>
                                        <Box className="flex h-[32px]  items-center pl-2">
                                            <Typography level='body-sm' fontWeight='lg' >(b) Chemistry</Typography>
                                        </Box>
                                        <Box className="flex h-[32px]  items-center pl-2">
                                            <Typography level='body-sm' fontWeight='lg' >(c) Biology or Equivalent</Typography>
                                        </Box>
                                        <Box className="flex h-[32px]  items-center pl-2">
                                            <Typography level='body-sm' fontWeight='lg' >Total [sum of (a) (b) (c)]</Typography>
                                        </Box>
                                        <Box className="flex h-[32px]  items-center pl-2">
                                            <Typography level='body-sm' fontWeight='lg' >(d) English</Typography>
                                        </Box>
                                    </Box>

                                    {/* plus one */}
                                    <Box className="flex w-[35%] flex-col border">
                                        <Box className="flex justify-center items-center font-semibold text-md px-1" >
                                            <Typography level='body-sm' fontWeight='lg' noWrap >Plus One </Typography>
                                        </Box>
                                        <Box className="flex border border-x-0" >
                                            <Box className="flex flex-1 justify-center items-center font-semibold text-md px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Marks Obtained</Typography>
                                            </Box>
                                            <Box className="flex flex-1 justify-center items-center font-semibold text-md px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Max Marks</Typography>
                                            </Box>
                                        </Box>
                                        <Box className="flex" >
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"plusOnePhysics"} name="plusOnePhysics" value={applicationForm.plusOnePhysics} handleChange={handleChange} />
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"plusOneMaxPhysics"} name="plusOneMaxPhysics" value={applicationForm.plusOneMaxPhysics} handleChange={handleChange} />
                                        </Box>
                                        <Box className="flex" >
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"plusOneChemistry"} name="plusOneChemistry" value={applicationForm.plusOneChemistry} handleChange={handleChange} />
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"plusOneMaxChemistry"} name="plusOneMaxChemistry" value={applicationForm.plusOneMaxChemistry} handleChange={handleChange} />
                                        </Box>
                                        <Box className="flex" >
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"plusOneBiology"} name="plusOneBiology" value={applicationForm.plusOneBiology} handleChange={handleChange} />
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"plusOneMaxBiology"} name="plusOneMaxBiology" value={applicationForm.plusOneMaxBiology} handleChange={handleChange} />
                                        </Box>
                                        <Box className="flex" >
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"plusOneTotal"} name="plusOneTotal" value={applicationForm.plusOneTotal} handleChange={handleChange} />
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"plusOneMaxTotal"} name="plusOneMaxTotal" value={applicationForm.plusOneMaxTotal} handleChange={handleChange} />
                                        </Box>
                                        <Box className="flex" >
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"plusOneEnglish"} name="plusOneEnglish" value={applicationForm.plusOneEnglish} handleChange={handleChange} />
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"plusOneMaxEnglish"} name="plusOneMaxEnglish" value={applicationForm.plusOneMaxEnglish} handleChange={handleChange} />
                                        </Box>
                                    </Box>

                                    {/* plus two */}
                                    <Box className="flex w-[35%] flex-col border" >
                                        <Box className="flex justify-center items-center font-semibold text-md px-1" >
                                            <Typography level='body-sm' fontWeight='lg' noWrap >Plus Two</Typography>
                                        </Box>
                                        <Box className="flex border border-x-0" >
                                            <Box className="flex flex-1 justify-center items-center font-semibold text-md px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Marks Obtained</Typography>
                                            </Box>
                                            <Box className="flex flex-1 justify-center items-center font-semibold text-md px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Max Marks</Typography>
                                            </Box>
                                            <Box className="flex flex-1 justify-center items-center font-semibold text-md px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >% of Marks</Typography>
                                            </Box>
                                        </Box>
                                        <Box className="flex" >
                                            <CustomInput type="number" disabled={physicper} className={{ "--Input-radius": "0px" }} placeholder={"plusTwoPhysics"} name="plusTwoPhysics" value={applicationForm.plusTwoPhysics} handleChange={handleChange} />
                                            <CustomInput type="number" disabled={physicper} className={{ "--Input-radius": "0px" }} placeholder={"plusTwoMaxPhysics"} name="plusTwoMaxPhysics" value={applicationForm.plusTwoMaxPhysics} handleChange={handleChange} />
                                            <CustomInput type="number" title={"Click here to calculate percentage"} disabled={physicper} className={{ "--Input-radius": "0px" }} onClickHandler={handlePhysicsPercentage} placeholder={"plusTwoPercentagePhysics"} name="plusTwoPercentagePhysics" value={applicationForm.physicsPercentage} />
                                        </Box>
                                        <Box className="flex" >
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} disabled={chemistryPer} placeholder={"plusTwoChemistry"} name="plusTwoChemistry" value={applicationForm.plusTwoChemistry} handleChange={handleChange} />
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} disabled={chemistryPer} placeholder={"plusTwoMaxChemistry"} name="plusTwoMaxChemistry" value={applicationForm.plusTwoMaxChemistry} handleChange={handleChange} />
                                            <CustomInput type="number" title={"Click here to calculate percentage"} className={{ "--Input-radius": "0px" }} disabled={chemistryPer} onClickHandler={handleChemistryPercentage} placeholder={"plusTwoPercentageChemistry"} name="plusTwoPercentageChemistry" value={applicationForm.chemistryPercentage} handleChange={handleChange} />
                                        </Box>
                                        <Box className="flex" >
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} disabled={biologyper} placeholder={"plusTwoBiology"} name="plusTwoBiology" value={applicationForm.plusTwoBiology} handleChange={handleChange} />
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} disabled={biologyper} placeholder={"plusTwoMaxBiology"} name="plusTwoMaxBiology" value={applicationForm.plusTwoMaxBiology} handleChange={handleChange} />
                                            <CustomInput type="number" title={"Click here to calculate percentage"} className={{ "--Input-radius": "0px" }} disabled={biologyper} onClickHandler={handleBiologyPercentage} placeholder={"plusTwoPercentageBiology"} name="plusTwoPercentageBiology" value={applicationForm.biologyPercentage} handleChange={handleChange} />
                                        </Box>
                                        <Box className="flex" >
                                            <CustomInput type="number" title={"Click here to calculate total"} className={{ "--Input-radius": "0px" }} disabled={disableTotalFeild} onClickHandler={onClickCalculateTotalMarkObtained} placeholder={"plusTwoTotal"} name="plusTwoTotal" value={applicationForm.plusTwoTotal} handleChange={handleChange} />
                                            <CustomInput type="number" title={"Click here to calculate Max Marks"} className={{ "--Input-radius": "0px" }} disabled={disableTotalMaxFeild} onClickHandler={onClickCalculateTotalMaxMarkObtained} placeholder={"plusTwoMaxTotal"} name="plusTwoMaxTotal" value={applicationForm.plusTwoMaxTotal} handleChange={handleChange} />
                                            <CustomInput type="number" title={"Click here to calculate percentage"} className={{ "--Input-radius": "0px" }} disabled={totalPlusTwo} onClickHandler={handletotalPlusTwoPercentage} placeholder={"totalPercentage"} name="totalPercentage" value={applicationForm.totalPercentage} handleChange={handleChange} />
                                        </Box>
                                        <Box className="flex" >
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} disabled={englishPer} placeholder={"plusTwoEnglish"} name="plusTwoEnglish" value={applicationForm.plusTwoEnglish} handleChange={handleChange} />
                                            <CustomInput type="number" className={{ "--Input-radius": "0px" }} disabled={englishPer} placeholder={"plusTwoMaxEnglish"} name="plusTwoMaxEnglish" value={applicationForm.plusTwoMaxEnglish} handleChange={handleChange} />
                                            <CustomInput type="number" title={"Click here to calculate percentage"} className={{ "--Input-radius": "0px" }} disabled={englishPer} onClickHandler={handleenglishPerTwoPercentage} placeholder={"englishPercentage"} name="englishPercentage" value={applicationForm.englishPercentage} handleChange={handleChange} />
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>


                            {/* Details of 10th & 12th Standard Examination */}
                            <Typography level="title-sm" sx={{ color: '#6b5e68', mt: 1 }} fontWeight='lg' >Details of 10th & 12th Standard Examination</Typography>
                            <Box className="flex border flex-col p-2 rounded-md gap-1" >
                                <Box className="flex flex-row  w-[100%] " >
                                    <Box className="flex w-[50%] flex-col gap-1" >
                                        <Box className="flex justify-center items-center font-semibold text-md px-1" >
                                            <Typography level='body-sm' fontWeight='lg' >Details Of 10th Standard Examination</Typography>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Name Of the Institution</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput name="tenth_boardInstitute" type="text" className={{ "--Input-radius": "0px" }} placeholder={"Name Of the Institution"} value={applicationForm.tenth_boardInstitute} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Name Of the Examination / Board</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="text" className={{ "--Input-radius": "0px" }} placeholder={"Name Of the Examination / Board"} name="tenth_nameOfExam" value={applicationForm.tenth_nameOfExam} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Year Of Passing</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"Year Of Passing"} name="tenth_yearOfPassing" value={applicationForm.tenth_yearOfPassing} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Register Number</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="text" className={{ "--Input-radius": "0px" }} placeholder={"Register Number"} name="tenth_registerNo" value={applicationForm.tenth_registerNo} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Number Of Attempts</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"Number Of Attempts"} name="tenth_noOfAttempts" value={applicationForm.tenth_noOfAttempts} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Marks Obtained</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"Marks Obtained"} name="tenth_markObtain" value={applicationForm.tenth_markObtain} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Max Marks</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"Max Marks"} name="tenth_maxMarks" value={applicationForm.tenth_maxMarks} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >% Marks</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"% Marks"} name="tenth_percentage" value={applicationForm.tenth_percentage} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className="flex w-[50%] flex-col gap-1" >
                                        <Box className="flex justify-center items-center font-semibold text-md px-1" >
                                            <Typography level='body-sm' fontWeight='lg' >Details Of 12th Standard Examination</Typography>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Name Of the Institution</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="text" className={{ "--Input-radius": "0px" }} placeholder={"Name Of the Institution"} name="plusTwo_boardInstitute" value={applicationForm.plusTwo_boardInstitute} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Name Of the Examination / Board</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="text" className={{ "--Input-radius": "0px" }} placeholder={"Name Of the Examination / Board"} name="plusTwo_nameOfExam" value={applicationForm.plusTwo_nameOfExam} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Year Of Passing</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"Year Of Passing"} name="plusTwo_yearOfPassing" value={applicationForm.plusTwo_yearOfPassing} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Register Number</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="text" className={{ "--Input-radius": "0px" }} placeholder={"Register Number"} name="plusTwo_registerNo" value={applicationForm.plusTwo_registerNo} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Number Of Attempts</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"Number Of Attempts"} name="plusTwo_noOfAttempts" value={applicationForm.plusTwo_noOfAttempts} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Marks Obtained</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"Marks Obtained"} name="plusTwo_markObtain" value={applicationForm.plusTwo_markObtain} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >Max Marks</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"Max Marks"} name="plusTwo_maxMarks" value={applicationForm.plusTwo_maxMarks} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                        <Box className="flex">
                                            <Box className="flex w-[40%] justify-center items-center px-1" >
                                                <Typography level='body-sm' fontWeight='lg' noWrap >% Marks</Typography>
                                            </Box>
                                            <Box className="flex w-[60%] justify-center items-center px-1" >
                                                <CustomInput type="number" className={{ "--Input-radius": "0px" }} placeholder={"% Marks"} name="plusTwo_percentage" value={applicationForm.plusTwo_percentage} handleChange={handleChange} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="flex flex-1 p-10 flex-col" >
                                <Typography level='body-sm' fontWeight='lg' noWrap className="pl-3" >Joint Declaration by the Applicant & Parent / Guardian</Typography>
                                <Box className="flex flex-1 justify-center pt-2">
                                    <Checkbox
                                        defaultChecked={false}
                                        color="primary"
                                        size="md"
                                        className='px-3'
                                        onChange={(e) => setAppVerification(e.target.checked)}
                                    />
                                    <Typography>
                                        We, {`Father`} & {`son`} do hereby declare that all the information furnished above are true and correct and
                                        we will obey the rules and regulations of the institution, if admitted. We promise to submit all certificates and
                                        documents in original at the time of admission failing which the admission will be liable for cancellation.
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className="flex flex-1 justify-center">
                                <Button variant="solid" color="primary" className='w-[20%]' onClick={handleSubmitApplicationForm} >Submit Application</Button>
                            </Box>
                        </Box>
                }
            </Paper>
        </Box>
    )
}

export default Application