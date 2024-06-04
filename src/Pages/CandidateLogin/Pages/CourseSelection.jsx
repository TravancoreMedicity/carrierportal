// @ts-nocheck
import { Box, CircularProgress, LinearProgress, Typography } from '@mui/joy'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
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
import { errorNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant'
import axioslogin from '../../../Axios/Axios'
import { Await, useNavigate } from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CustBackDrop from '../../../Components/CustBackDrop'
import CustBackDropWithState from '../../../Components/CustBackDropWithState'
import CourseSelectionCmp from '../Components/CourseSelectionCmp'

const CourseSelection = () => {

    const navigate = useNavigate()
    const loggedInfo = useSelector((state) => getUser(state))
    const data = JSON.parse(loggedInfo)
    const userGoogleID = data?.id

    const [submittedCourse, setSubmittedCourse] = useState([])
    const [appSubmitStatus, setAppSubmitStatus] = useState(false)

    const [applicationSubmittedStatus, setApplicationSubmittedStatus] = useState(false)

    const [valueLength, setValueLength] = useState([])
    const [cources, setCources] = useState([])
    //GET APPLICATION STATUS SUBMITTED STATUS
    useEffect(() => {
        const getApplicationSubmittedStatus = async () => {
            const result = await axioslogin.get(`/app_registration/getApplicationStatus/${userGoogleID}`)
            const { success, data } = result.data;
            if (success === 2 && data?.length > 0) {
                const appStatus = data[0]
                appStatus?.app_status !== null && appStatus?.app_status !== undefined && appStatus?.app_status === 1 ? setApplicationSubmittedStatus(true) : setApplicationSubmittedStatus(false)
            } else {
                setApplicationSubmittedStatus(false)
            }
        }
        getApplicationSubmittedStatus()
    })


    // get submitted course detailds 

    useLayoutEffect(() => {
        setOpen(true)
        const getSubmittedCourse = async () => {
            const result = await axioslogin.get(`/app_registration/getSubmittedCourse/${userGoogleID}`)
            const { data, success } = await result.data
            if (success === 2) {
                if (data?.length === 0) {
                    setAppSubmitStatus(false)
                    setOpen(true)
                } else {
                    setAppSubmitStatus(true)
                    const submittedValue = Object.values(data[0]).slice(1);
                    setSubmittedCourse(submittedValue)
                    setOpen(false)
                }
            } else {
                setOpen(false)
            }
        }
        getSubmittedCourse()
    }, [])

    useLayoutEffect(() => {
        const getCourses = async () => {
            const result = await axioslogin.get(`/app_registration/getCources`)
            const { data, success } = result.data
            if (success === 2) {
                setCources(data)
                setValueLength(Array.from({ length: data.length }, (_, index) => {
                    return {
                        key: index,
                        value: 0
                    }
                }))
            }
        }
        getCourses()
    }, [])

    const handleChange = (event, index, newValue) => {
        const updatedValueLength = valueLength.map(item =>
            item.key === index ? { ...item, value: newValue } : item
        );
        setValueLength(updatedValueLength);
    };

    const [open, setOpen] = useState(false)

    const submitCourseSelection = useCallback(async () => {
        const selectionVerification = valueLength?.filter(e => e.value === 0).length === 0
        if (selectionVerification === true && userGoogleID !== null && userGoogleID !== undefined) {
            const postData = {
                applicationId: userGoogleID,
                cour1: valueLength?.find(e => e.key === 0).value,
                cour2: valueLength?.find(e => e.key === 1).value,
                cour3: valueLength?.find(e => e.key === 2).value,
            }

            const result = await axioslogin.post(`/app_registration/postCourseSelection`, postData)
            const { success } = result.data;
            if (success === 2) {
                succesNofity("Course Selection Successful")
                navigate('/CandidateHome/ApplicationView', { replace: true });
            } else {
                warningNofity('Somthing Went wrong. Please try again later')
            }
        } else {
            warningNofity('Please select all the priorities')
        }
    }, [valueLength, userGoogleID])

    return (
        <Box className="flex justify-center items-center w-full flex-col" >
            <ToastContainer />
            <Paper className='flex h-[80%] w-3/4 items-center flex-col gap-1 overflow-hidden'>
                <Box className=" flex w-full items-center pl-5 bg-transparent shadow-md" >
                    <Typography level="h4" sx={{ color: '#6b5e68', p: 1 }} >Course Selection</Typography>
                </Box>
                <CustBackDropWithState open={open} handleClose={setOpen} />
                {
                    applicationSubmittedStatus === true ? <>
                        {
                            appSubmitStatus === true ?
                                <Box className="flex flex-1 justify-center items-center w-full flex-col" >
                                    <Box className="flex flex-col w-[60%] gap-1" >
                                        {
                                            submittedCourse?.map((e, index) => (
                                                <Box className="flex flex-1 p-1 rounded-md border-[1px] border-[#cdd7e1] items-center" key={index} >
                                                    <Box className="flex w-[20%] px-10 font-medium" >Priority - {index + 1}</Box>
                                                    <Box className="flex flex-1" >
                                                        <Select
                                                            defaultValue={0}
                                                            onChange={(event, newValue) => handleChange(event, index, newValue)}
                                                            className='w-full'
                                                            disabled
                                                            value={e}
                                                        >
                                                            <Option value={0}>Select Course</Option>
                                                            {
                                                                cources?.map((e) => (
                                                                    <Option
                                                                        value={e.cour_slno}
                                                                        key={e.cour_slno}
                                                                    >{e.cource_name}</Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Box>
                                                </Box>
                                            ))
                                        }
                                    </Box>


                                </Box>
                                :
                                <Box className="flex flex-1 w-full gap-1 justify-center items-center flex-col" >
                                    <Box className="flex flex-col w-[60%] gap-1" >
                                        {
                                            valueLength?.map((e, index) => (
                                                <Box className="flex flex-1 p-1 rounded-md border-[1px] border-[#cdd7e1] items-center" key={index} >
                                                    <Box className="flex w-[20%] px-10 font-medium" >Priority - {index + 1}</Box>
                                                    <Box className="flex flex-1" >
                                                        <Select
                                                            defaultValue={0}
                                                            onChange={(event, newValue) => handleChange(event, index, newValue)}
                                                            className='w-full'
                                                        >
                                                            <Option value={0}>Select Course</Option>
                                                            {
                                                                cources?.map((e) => (
                                                                    <Option
                                                                        value={e.cour_slno}
                                                                        key={e.cour_slno}
                                                                    >{e.cource_name}</Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Box>
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                    <Box className="flex p-2">
                                        <Button variant="outlined" color="primary" onClick={submitCourseSelection} >
                                            Submit Course Selection
                                        </Button>
                                    </Box>
                                </Box>
                        }</> :
                        <Box className="flex flex-1 justify-center items-center" >
                            <Typography level='title-lg' fontSize={20} color='danger' >
                                Complete The Application Process
                            </Typography>
                        </Box>
                }

            </Paper>
        </Box>
    )
}

export default CourseSelection