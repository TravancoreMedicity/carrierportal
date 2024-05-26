// @ts-nocheck
import { Box, CircularProgress, LinearProgress, Typography } from '@mui/joy'
import React, { useCallback, useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CustBackDrop from '../../../Components/CustBackDrop'
import CustBackDropWithState from '../../../Components/CustBackDropWithState'

const ApplicationFeePayment = () => {

    const navigate = useNavigate()
    const loggedInfo = useSelector((state) => getUser(state))
    const data = JSON.parse(loggedInfo)
    const userGoogleID = data?.id

    const [applicationStatus, setApplicationStatus] = useState(true)
    const [paymentInfo, setPaymentInfo] = useState({})

    const [referenceNo, setReferenceNo] = useState('')

    const [open, setOpen] = useState(true)

    useEffect(() => {
        const getApplicationStatus = async () => {
            const result = await axioslogin.get(`/app_registration/getPaymentStatus/${userGoogleID}`)
            const { success, data } = result.data;
            if (success === 1) {
                setApplicationStatus(true)
                const info = data[0]
                setPaymentInfo(info)
                setOpen(false)
            }

            if (success === 2) {
                setApplicationStatus(false)
                setOpen(false)
                return
            }
            if (success === 0) {
                setOpen(false)
                return warningNofity('Somthing Went wrong. Please try again later')
            }

        }

        if (userGoogleID !== null || userGoogleID !== undefined) {
            getApplicationStatus(userGoogleID)
        }

    }, [userGoogleID])


    const handleSubmitPaymentInfo = useCallback(async (e) => {
        e.preventDefault()

        if (referenceNo === '' || referenceNo === null || referenceNo === undefined) {
            return warningNofity('Please Enter Reference Number')
        } else {
            const postData = {
                refeNo: sanitizeInput(referenceNo),
                id: userGoogleID
            }

            const result = await axioslogin.post(`/app_registration/updatePayment`, postData)
            const { success, message } = result.data;

            if (success === 0) {
                errorNofity('Somthing Went wrong. Please try again later')
                return
            }

            if (success === 2) {
                succesNofity('Payment Successfull')
                navigate('/CandidateHome/Application', { replace: true });
            }
        }
    }, [referenceNo, userGoogleID])


    return (
        <Box className="flex justify-center items-center w-full flex-col" >
            <ToastContainer />
            <Paper className='flex h-[80%] w-3/4 items-center flex-col gap-1 overflow-hidden'>
                <Box className=" flex w-full items-center pl-5 bg-transparent shadow-md" >
                    <Typography level="h4" sx={{ color: '#6b5e68', p: 1 }} >Application Fee Payment</Typography>
                </Box>
                <CustBackDropWithState open={open} handleClose={setOpen} />

                {
                    applicationStatus === false ?
                        <Box className="flex flex-1 justify-center items-center" >
                            <Typography level='title-lg' fontSize={20} color='danger' >
                                Registration Process Not Completed , Complete The Registration Process
                            </Typography>
                        </Box>
                        :
                        <Box className="flex flex-1 w-3/4 justify-center items-center flex-row gap-1 mt-10 mb-10 overflow-auto">
                            <Box className="flex flex-1 justify-center" >
                                <img src={GoolePayImage} alt='google pay image' width={'80%'} height={'80%'} />
                            </Box>
                            <Box className="flex flex-1 justify-center flex-col gap-2">

                                {
                                    paymentInfo.app_payment_status === 0 ? <>
                                        <Box className="flex flex-1 justify-center items-center flex-col">
                                            <Typography level='body-md'  >
                                                Application Number #
                                            </Typography>
                                            <Typography level='body-lg' fontWeight={700} color='danger' >
                                                00001
                                            </Typography>
                                        </Box>
                                        <Box className="flex flex-1 justify-center items-center flex-col">
                                            <Typography level='body-md' className="flex items-center" >
                                                Application Fee Amount
                                            </Typography>
                                            <Typography level='body-md' className="flex items-center" fontWeight={700} color='danger' >
                                                <span className="flex items-center"><CurrencyRupeeIcon fontSize='inherit' />600</span>
                                            </Typography>
                                        </Box>
                                        <Box className="flex flex-1 justify-center">
                                            <Typography>
                                                Enter Payment Transaction Number / Reference Number
                                            </Typography>
                                        </Box>
                                        <Box className="flex flex-1 justify-center">
                                            <CustomInput
                                                placeholder={"Enter Transaction Number"}
                                                type={"text"}
                                                handleChange={(e) => setReferenceNo(e.target.value)}
                                                name={"transactionNumber"}
                                                disabled={paymentInfo.app_payment_status === 0 ? false : true}
                                            />
                                        </Box>
                                        <Box className="flex items-center justify-center" >
                                            <Button
                                                fullWidth
                                                color="primary"
                                                onClick={(e) => handleSubmitPaymentInfo(e)}
                                                size="sm"
                                                variant="outlined"
                                                disabled={paymentInfo.app_payment_status === 0 ? false : true}
                                            >Submit Payment Information</Button>
                                        </Box>
                                    </> : <Box className="flex flex-1 justify-center items-center flex-col">
                                        <Typography level='body-md'  >
                                            Application Payment Process Completed
                                        </Typography>
                                        <Typography level='body-lg' fontWeight={700} >
                                            <span>Ref #</span> {paymentInfo.app_payment_refno}
                                        </Typography>
                                    </Box>
                                }
                            </Box>
                        </Box>
                }
            </Paper>
        </Box>
    )
}

export default ApplicationFeePayment