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
import { errorNofity, infoNofity, sanitizeInput, succesNofity } from '../../../Constant/Constant'
import axioslogin from '../../../Axios/Axios'

import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Loader from '../../../Components/Loader'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import CustBackDrop from '../../../Components/CustBackDrop'


const Registration = () => {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [lodar, setLoader] = useState(false)
    const [appStatus, setappStatus] = useState(false)

    const loggedInfo = useSelector((state) => getUser(state))
    const data = JSON.parse(loggedInfo)
    const userEmail = data?.email[0]?.value;
    const userGoogleID = data?.id

    useLayoutEffect(() => {
        setLoader(true)
        const getApplication = async () => {
            const result = await axioslogin.get(`/app_registration/getregistration/${userGoogleID}`)
            const { success, data } = result.data;
            if (success === 2) {
                setLoader(false)
            }

            if (success === 1) {
                setappStatus(true)
                setLoader(false)
                const dateOfbirth = format(new Date(data[0]?.app_dob), 'yyyy-MM-dd')

                setregistration({
                    ...registration,
                    name: data[0].app_name,
                    address: data[0].app_address,
                    houseName: data[0].app_housename,
                    street: data[0].app_street,
                    place: data[0].app_place,
                    district: data[0].app_district,
                    state: data[0].app_state,
                    postOffice: data[0].app_post,
                    pincode: data[0].app_pincode,
                    mobile: data[0].app_mobile,
                    gender: data[0].app_gender,
                    age: dateOfbirth
                })
            }
        }

        if (userGoogleID !== null || userGoogleID !== undefined) {
            getApplication(userGoogleID)
        }
    }, [userGoogleID])

    const [email] = useState(userEmail)
    const [googleID, setgoogleID] = useState(userGoogleID)
    const [registration, setregistration] = useState({
        userId: googleID,
        email: email,
        name: "",
        address: "",
        houseName: "",
        street: "",
        place: "",
        district: 0,
        state: 0,
        postOffice: "",
        pincode: "",
        mobile: "",
        gender: 0,
        age: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        const sanitizedValue = sanitizeInput(value);
        setregistration({ ...registration, [name]: sanitizedValue })
    }

    const handleChangeGender = (val) => {
        setregistration({ ...registration, gender: val })
    }
    const handleDistrict = (val) => {
        setregistration({ ...registration, district: val })
    }
    const handleState = (val) => {
        setregistration({ ...registration, state: val })
    }


    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()

        const { name, address, houseName, street, place, district, state, postOffice, pincode, mobile, gender, age } = registration;
        if (
            name === "" || address === "" || place === "" || district === 0 || state === 0 || postOffice === "" || pincode === "" || mobile === "" || gender === 0 || age === "") {
            infoNofity("Please fill all the Mandatory fields")
        } else {
            const postREgistraion = await axioslogin.post('/app_registration/app_registration', registration)
            const { message, success } = postREgistraion.data;
            if (success === 2) {
                succesNofity('Registration Successful')
                navigate('/CandidateHome/ApplicationFeePayment', { replace: true });
            } else {
                errorNofity('Registration Failed,Please try again later')
            }
            setOpen(false)
        }
    }, [registration])

    return (
        <Box className="flex justify-center items-center w-full flex-col" >

            <ToastContainer />
            <Paper className='flex h-[80%] w-3/4 items-center flex-col gap-1 overflow-hidden'>
                <Box className=" flex w-full items-center pl-5 bg-transparent shadow-md" >
                    <Typography level="h4" sx={{ color: '#6b5e68', p: 1 }} >Candidate Registration</Typography>
                </Box>
                <Box className="flex  w-3/4 justify-center items-center flex-col gap-1 mt-10 mb-5 overflow-auto">
                    <Box sx={{ display: 'flex', flex: 1, width: '100%', zIndex: 10, position: 'absolute' }} >
                        {
                            lodar && <CustBackDrop />
                        }
                    </Box>

                    <Box className="flex w-[70%] flex-col sm:flex-col md:flex-col lg:flex-row">
                        <Box className="flex flex-1 ml-4 items-center" >
                            <Typography level="body-lg" >Candidates Name<span style={{ color: 'red' }}>*</span></Typography>
                        </Box>
                        <Box className="flex flex-1">
                            <CustomInput placeholder="Enter Name" type={"text"} handleChange={(e) => handleChange(e)} name={"name"} disabled={appStatus} value={registration.name} />
                        </Box>
                    </Box>

                    <Box className="flex w-[70%] flex-col sm:flex-col md:flex-col lg:flex-row">
                        <Box className="flex flex-1 ml-4 items-center" >
                            <Typography level="body-lg" >Address<span style={{ color: 'red' }}>*</span></Typography>
                        </Box>
                        <Box className="flex flex-1">
                            <CustomInput placeholder={"Enter Address"} type={"text"} handleChange={(e) => handleChange(e)} name={"address"} disabled={appStatus} value={registration.address} />
                        </Box>
                    </Box>

                    <Box className="flex w-[70%] flex-col sm:flex-col md:flex-col lg:flex-row">
                        <Box className="flex flex-1 ml-4 items-center" >
                            <Typography level="body-lg" >House Name/No</Typography>
                        </Box>
                        <Box className="flex flex-1">
                            <CustomInput placeholder={"Enter House Name/No"} type={"text"} handleChange={(e) => handleChange(e)} name={"houseName"} disabled={appStatus} value={registration.houseName} />
                        </Box>
                    </Box>

                    <Box className="flex w-[70%] flex-col sm:flex-col md:flex-col lg:flex-row">
                        <Box className="flex flex-1 ml-4 items-center" >
                            <Typography level="body-lg" >Street</Typography>
                        </Box>
                        <Box className="flex flex-1">
                            <CustomInput placeholder={"Enter Street"} type={"text"} handleChange={(e) => handleChange(e)} name={"street"} disabled={appStatus} value={registration.street} />
                        </Box>
                    </Box>

                    <Box className="flex w-[70%] flex-col sm:flex-col md:flex-col lg:flex-row">
                        <Box className="flex flex-1 ml-4 items-center" >
                            <Typography level="body-lg" >Place<span style={{ color: 'red' }}>*</span></Typography>
                        </Box>
                        <Box className="flex flex-1">
                            <CustomInput placeholder={"Enter Place"} type={"text"} handleChange={(e) => handleChange(e)} name={"place"} disabled={appStatus} value={registration.place} />
                        </Box>
                    </Box>

                    <Box className="flex w-[70%] flex-col sm:flex-col md:flex-col lg:flex-row">
                        <Box className="flex flex-1 ml-4 items-center" >
                            <Typography level="body-lg" >District<span style={{ color: 'red' }}>*</span></Typography>
                        </Box>
                        <Box className="flex flex-1">
                            <District handleChange={(event, e) => handleDistrict(e)} name={"district"} disabled={appStatus} value={registration.district} />
                        </Box>
                    </Box>

                    <Box className="flex w-[70%] flex-col sm:flex-col md:flex-col lg:flex-row">
                        <Box className="flex flex-1 ml-4 items-center" >
                            <Typography level="body-lg" >State<span style={{ color: 'red' }}>*</span></Typography>
                        </Box>
                        <Box className="flex flex-1">
                            <State handleChange={(event, e) => handleState(e)} name={"state"} disabled={appStatus} value={registration.state} />
                        </Box>
                    </Box>

                    <Box className="flex w-[70%] flex-col sm:flex-col md:flex-col lg:flex-row">
                        <Box className="flex flex-1 ml-4 items-center" >
                            <Typography level="body-lg" >Post Office<span style={{ color: 'red' }}>*</span></Typography>
                        </Box>
                        <Box className="flex flex-1">
                            <CustomInput placeholder={"Enter Post Office"} type={"text"} handleChange={(e) => handleChange(e)} name={"postOffice"} disabled={appStatus} value={registration.postOffice} />
                        </Box>
                    </Box>

                    <Box className="flex w-[70%] flex-col sm:flex-col md:flex-col lg:flex-row">
                        <Box className="flex flex-1 ml-4 items-center" >
                            <Typography level="body-lg" >PIN Code<span style={{ color: 'red' }}>*</span></Typography>
                        </Box>
                        <Box className="flex flex-1">
                            <CustomInput placeholder={"Enter PIN Code"} type={"number"} handleChange={(e) => handleChange(e)} name={"pincode"} disabled={appStatus} value={registration.pincode} />
                        </Box>
                    </Box>

                    <Box className="flex w-[70%] flex-col sm:flex-col md:flex-col lg:flex-row">
                        <Box className="flex flex-1 ml-4 items-center" >
                            <Typography level="body-lg" >Mobile No<span style={{ color: 'red' }}>*</span></Typography>
                        </Box>
                        <Box className="flex flex-1">
                            <CustomInput placeholder={"Enter Mobile No"} type={"number"} handleChange={(e) => handleChange(e)} name={"mobile"} disabled={appStatus} value={registration.mobile} />
                        </Box>
                    </Box>

                    <Box className="flex w-[70%] flex-col sm:flex-col md:flex-col lg:flex-row">
                        <Box className="flex flex-1 ml-4 items-center" >
                            <Typography level="body-lg" >Email ID<span style={{ color: 'red' }}>*</span></Typography>
                        </Box>
                        <Box className="flex flex-1">
                            <CustomInput placeholder={"somthi"} type={"email"} value={email} disabled={true} handleChange={(e) => handleChange(e)} name={"email"} />
                        </Box>
                    </Box>

                    <Box className="flex w-[70%] flex-col sm:flex-col md:flex-col lg:flex-row">
                        <Box className="flex flex-1 ml-4 items-center" >
                            <Typography level="body-lg" >Gender<span style={{ color: 'red' }}>*</span></Typography>
                        </Box>
                        <Box className="flex flex-1">
                            <Select
                                sx={{ width: '100%' }}
                                placeholder="Choose Gender"
                                color='primary'
                                name='gender'
                                onChange={(e, val) => handleChangeGender(val)}
                                disabled={appStatus}
                                value={registration.gender}
                            >
                                <Option value={1}>Female</Option>
                                <Option value={2}>Male</Option>
                                <Option value={3}>Others / Transgender</Option>
                            </Select>
                        </Box>
                    </Box>

                    <Box className="flex w-[70%] flex-col sm:flex-col md:flex-col lg:flex-row">
                        <Box className="flex flex-1 ml-4 items-center" >
                            <Typography level="body-lg" >Date Of Birth<span style={{ color: 'red' }}>*</span></Typography>
                        </Box>
                        <Box className="flex flex-1">
                            <CustomInput placeholder={"Enter Date Of Birth"} type={"date"} handleChange={(e) => handleChange(e)} name={"age"} disabled={appStatus} value={registration.age} />
                        </Box>
                    </Box>

                    <Box className="flex w-4/6 pt-5 justify-center">
                        <Box className="flex w-1/3 items-center" >
                            <Button
                                disabled={appStatus}
                                fullWidth
                                color="primary"
                                onClick={() => setOpen(true)}
                                size="sm"
                                variant="outlined"
                            >Submit Registration</Button>
                        </Box>
                    </Box>

                    <Box>
                        <Modal open={open} onClose={() => setOpen(false)} >
                            <ModalDialog variant="outlined" role="alertdialog">
                                <DialogTitle>
                                    <WarningRoundedIcon />
                                    Confirmation
                                </DialogTitle>
                                <Divider />
                                <DialogContent>
                                    Once saved, the data cannot be edited
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="solid" color="danger" onClick={handleSubmit}>
                                        Confirm
                                    </Button>
                                    <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                                        Close
                                    </Button>
                                </DialogActions>
                            </ModalDialog>
                        </Modal>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default Registration