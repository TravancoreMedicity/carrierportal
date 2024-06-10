import { Box, CircularProgress, LinearProgress, Typography } from '@mui/joy'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUser } from '../../../Redux/LoginSlice';
import axioslogin from '../../../Axios/Axios';
import CustBackDropWithState from '../../../Components/CustBackDropWithState';
import { ToastContainer } from 'react-toastify'
import { Divider, Paper } from '@mui/material'
import { warningNofity } from '../../../Constant/Constant';
import Logo from "../../../assets/logo.png"
import Colleagelogo from "../../../assets/Colleagelogo.png"
import barimage from "../../../assets/barimage.png"
//import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';
import IconButton from '@mui/joy/IconButton';


import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { ApplicationPdfView } from './PdfViewApplication';
import { format } from 'date-fns';
const ApplicationView = () => {

    const loggedInfo = useSelector((state) => getUser(state))
    const data = JSON.parse(loggedInfo)
    const userGoogleID = data?.id
    const [open, setOpen] = useState(false)
    const [completeFlag, setCompleteFlag] = useState(0)
    const [appdata, setappdata] = useState('')

    useEffect(() => {
        const getApplication = async (userGoogleID) => {
            const result = await axioslogin.get(`/app_registration/courseCompleted/${userGoogleID}`)
            const { success, dataa } = result.data;
            if (success === 1) {
                const { application_id, app_payment_status } = dataa[0]
                if (application_id !== null) {
                    setCompleteFlag(1)
                }
                if (app_payment_status === 0) {
                    setCompleteFlag(2)
                }
                const result = await axioslogin.get(`/app_registration/getFullApplication/${userGoogleID}`)
                const { success, data, message } = result.data;
                if (success === 1) {
                    const resultarray = data?.map((val) => {
                        const obj = {
                            ...val, aapno: val.application_id.toString().padStart(5, '0'),
                            paymentDate: format(new Date(val.app_payment_date), 'dd-MM-yyyy'),
                            dob: format(new Date(val.app_dob), 'dd-MM-yyyy'),
                            createDate: format(new Date(val.create_date), 'dd-MM-yyyy'),

                        }
                        return obj

                    }, [])
                    setappdata(resultarray[0])
                }
                else {
                    warningNofity(message)
                }



            } else {
                setCompleteFlag(0)
            }
        }
        getApplication(userGoogleID)
    }, [userGoogleID])


    const pdfDownloadView = useCallback(() => {
        ApplicationPdfView(appdata, Colleagelogo)
    }, [appdata, Colleagelogo])


    return (
        <Box sx={{ height: window.innerHeight - 85, overflow: 'auto', pt: 6 }}>
            <Box className="flex justify-center items-center w-full flex-col" >
                <ToastContainer />
                <Paper className='flex h-[80%] w-3/4 items-center flex-col gap-1 overflow-hidden'>

                    <Box className=" flex w-full items-center pl-5 bg-transparent shadow-md" >
                        <Typography level="h4" sx={{ color: '#6b5e68', p: 1 }} >Application View</Typography>

                        <Box sx={{ pl: 150 }}>
                            <IconButton
                                color="primary"
                                onClick={() => pdfDownloadView()}
                            >
                                <PictureAsPdfIcon />
                            </IconButton>
                        </Box>

                        {/* <PictureAsPdfIcon /> */}

                    </Box>
                    {/* <Box className=" flex w-full items-center pl-5 bg-transparent shadow-md" >
                    <Typography level="h4" sx={{ color: '#6b5e68', p: 1 }} >Application View</Typography>
                </Box> */}
                    <CustBackDropWithState open={open} handleClose={setOpen} />
                    {
                        completeFlag === 1 ?
                            <Box className="flex flex-1 w-full flex-col p-mb-5 overflow-auto" sx={{
                                P: 2
                            }} >
                                <Box sx={{
                                    display: 'flex',
                                }} >
                                    <Box sx={{ display: 'flex', flexDirection: 'column', pl: 1, width: "33%" }}>
                                        <Box sx={{
                                            display: 'flex', flexDirection: 'row', pl: 5,
                                        }}>
                                            <Typography level="h4" sx={{ color: '#6b5e68', pt: 1 }} >App No: TMC</Typography>
                                            <Typography level="h4" sx={{ color: '#6b5e68', pt: 1, }} >{appdata.aapno}</Typography>
                                        </Box>
                                        <Box sx={{ pl: 5, width: "33%" }}>
                                            <img src={barimage} alt='Travancore' width={200} height={100} />
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex', flexDirection: 'column', pl: 10, width: "33%",
                                    }} >
                                        <img src={Colleagelogo} alt='Travancore' width={220} height={250} />
                                    </Box>
                                    <Box sx={{
                                        display: 'flex', flexDirection: 'column', width: "33%"
                                    }} >


                                    </Box>
                                </Box>
                                <Box className="flex justify-center items-center w-full flex-col" >
                                    <Typography level="h5" sx={{ color: '#6b5e68', pt: 0.5, fontSize: 15, fontWeight: 700 }} >
                                        N. H Bypass Road, Thattamala P O, Kollam - 691020,
                                    </Typography>
                                    <Typography level="h5" sx={{ color: '#6b5e68', pt: 0.5, fontSize: 15, fontWeight: 700 }} >
                                        Ph:0474 272 1661, +91 9495996174
                                    </Typography>

                                    <Typography level="h5" sx={{ color: '#6b5e68', pt: 0.5, fontSize: 15, fontWeight: 700 }} >
                                        Web:www.travancoremedicity.com, Email:travancoreparamedical@tmc.ac.in
                                    </Typography>
                                </Box>

                                <Box className="flex flex-row justify-center items-center gap-2 px-20 " >
                                    <Paper variant='outlined' sx={{ width: '100%', P: 2, backgroundColor: "#EEEEEE" }} >
                                        <Typography level="h5" sx={{
                                            color: '#6b5e68', pt: 0.5, fontSize: 15, fontWeight: 700,
                                            textAlign: "center"
                                        }} >
                                            APPLICATION FORM FOR ADMISSION TO ALLIED HEALTH COURSES 2023-24
                                        </Typography>

                                    </Paper>

                                </Box>
                                <Divider
                                    // variant="middle"
                                    sx={{ my: 0.8, mx: 3 }} />

                                <Box className="flex flex-row justify-center items-center gap-2 px-20 " >
                                    <Paper variant='none' sx={{ width: '100%', P: 2 }} >
                                        <Typography level="h5" sx={{
                                            color: '#f2a516', pt: 0.5, fontSize: 18,
                                            textAlign: "left"
                                        }} >
                                            Details of Application Fee Paid : Online Payment
                                        </Typography>
                                        <CssVarsProvider>
                                            <Table
                                                variant="outlined"
                                                borderAxis="bothBetween" sx={{ border: 0.5 }}
                                            >
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center", }}>Transaction Ref No</td>
                                                        <td style={{ width: '25%', align: "center", }}>{appdata.app_payment_refno}</td>
                                                        <td style={{ width: '25%', align: "center" }}>Order Id</td>
                                                        <td style={{ width: '25%', align: "center" }}> {appdata.aapno}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>Amount</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.app_payment_amount} </td>
                                                        <td style={{ width: '25%', align: "center" }}>Date</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.paymentDate

                                                        } </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </CssVarsProvider>

                                        <Typography level="h5" sx={{
                                            color: '#f2a516', pt: 0.5, fontSize: 18,
                                            textAlign: "left"
                                        }} >
                                            Personal Details
                                        </Typography>
                                        <CssVarsProvider>
                                            <Table
                                                variant="outlined"
                                                borderAxis="bothBetween" sx={{ border: 0.5 }}
                                            >
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>Name of Applicant</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.app_name} </td>
                                                        <td style={{ width: '25%', align: "center" }}>Gender</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.app_gender} </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>Religion or Community</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.religion} </td>
                                                        <td style={{ width: '25%', align: "center" }}>Cast</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.cast} </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>Place of Birth</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.application_id} </td>
                                                        <td style={{ width: '25%', align: "center" }}>Age & Date of Birth</td>
                                                        <td style={{ width: '25%', align: "center" }}>
                                                            {appdata.dob} </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>Nationality</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.nationality} </td>
                                                        <td style={{ width: '25%', align: "center" }}>Aadhaar Number</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.adhar} </td>
                                                    </tr>
                                                </tbody>


                                            </Table>
                                        </CssVarsProvider>

                                        <Typography level="h5" sx={{
                                            color: '#f2a516', pt: 0.5, fontSize: 18,
                                            textAlign: "left"
                                        }} >
                                            Parent / Guardian Details
                                        </Typography>
                                        <CssVarsProvider>
                                            <Table
                                                variant="outlined"
                                                borderAxis="bothBetween" sx={{ border: 0.5 }}
                                            >
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>Name of Parent or Guardian</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.guardian} </td>
                                                        <td style={{ width: '25%', align: "center" }}>Relationship</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.guar_relation} </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>Father's Name</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.father} </td>
                                                        <td style={{ width: '25%', align: "center" }}>Father's Occupation</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.father_occupation} </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>Mother's Name</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.mother} </td>
                                                        <td style={{ width: '25%', align: "center" }}>Mother's Occupation</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.mother_occupation} </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>Annual Family Income (Rs)</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.income} </td>
                                                        <td style={{ width: '25%', align: "center" }}>Phone Landline & Code</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.landline} </td>
                                                    </tr>
                                                </tbody>


                                            </Table>
                                        </CssVarsProvider>

                                        <Typography level="h5" sx={{
                                            color: '#f2a516', pt: 0.5, fontSize: 18,
                                            textAlign: "left"
                                        }} >
                                            Contact Details
                                        </Typography>
                                        <CssVarsProvider>
                                            <Table
                                                variant="outlined"
                                                borderAxis="bothBetween" sx={{ border: 0.5 }}
                                            >
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>Permanent Address</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.pre_address} </td>
                                                        <td style={{ width: '25%', align: "center" }}>Addres of Communication</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.com_address} </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>District</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.pre_district} </td>
                                                        <td style={{ width: '25%', align: "center" }}>District</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.com_district} </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>State</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.pre_state} </td>
                                                        <td style={{ width: '25%', align: "center" }}>State</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.com_state} </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>PIN Code</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.pre_pincode} </td>
                                                        <td style={{ width: '25%', align: "center" }}>PIN Code</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.com_pincode} </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>Mobile Number</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.pre_mobile} </td>
                                                        <td style={{ width: '25%', align: "center" }}>Mobile Number 2</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.com_mobile} </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>E-mail</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.app_email} </td>
                                                        <td style={{ width: '25%', align: "center" }}>Date</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.createDate} </td>
                                                    </tr>
                                                </tbody>


                                            </Table>
                                        </CssVarsProvider>
                                        <Typography level="h5" sx={{
                                            color: '#f2a516', pt: 0.5, fontSize: 18,
                                            textAlign: "left"
                                        }} >
                                            Course Preference
                                        </Typography>
                                        <CssVarsProvider>
                                            <Table
                                                variant="outlined"
                                                borderAxis="bothBetween" sx={{ border: 0.5 }}
                                            >
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>Preference</td>
                                                        <td style={{ width: '75%', align: "center" }}>Course </td>

                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>1</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.cour1} </td>

                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>2</td>
                                                        <td style={{ width: '75%', align: "center" }}>{appdata.cour2} </td>

                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>3</td>
                                                        <td style={{ width: '75%', align: "center" }}>{appdata.cour3} </td>

                                                    </tr>
                                                </tbody>


                                            </Table>
                                        </CssVarsProvider>
                                        <Typography level="h5" sx={{
                                            color: '#f2a516', pt: 0.5, fontSize: 18,
                                            textAlign: "left"
                                        }} >
                                            Detail of Qualifying Examination
                                        </Typography>
                                        <CssVarsProvider>
                                            <Table
                                                variant="outlined"
                                                borderAxis="bothBetween" sx={{ border: 0.5 }}
                                            >
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>Board</td>
                                                        <td style={{ width: '25%', align: "center" }}>Name of Board </td>
                                                        <td style={{ width: '25%', align: "center" }}>Year of Passing</td>
                                                        <td style={{ width: '25%', align: "center" }}>Register Number </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.board}</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.boardname} </td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.ten_yearofpass}</td>
                                                        <td style={{ width: '25%', align: "center" }}>{appdata.registerno} </td>
                                                    </tr>
                                                </tbody>


                                            </Table>
                                        </CssVarsProvider>
                                        <Typography level="h5" sx={{
                                            color: '#f2a516', pt: 0.5, fontSize: 18,
                                            textAlign: "left"
                                        }} >
                                            Mark Obtained in Qualifying Examination
                                        </Typography>
                                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>


                                            <Box sx={{ width: "60%", pr: 2 }}>
                                                <CssVarsProvider>
                                                    <Table
                                                        variant="outlined"
                                                        borderAxis="bothBetween" sx={{ border: 0.5 }}
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td rowSpan={2} style={{ width: '25%', align: "center", textAlign: "center" }}>Subject</td>
                                                                <td colSpan={2} style={{ width: '25%', align: "center", textAlign: "center" }}>Plus One </td>

                                                            </tr>

                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Marks Obtained</td>
                                                                <td style={{ width: '25%', align: "center" }}>Max. Marks </td>


                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>i) Physics</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.one_physics} </td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.one_ph_max}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>ii) Chemistry</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.one_chemistry} </td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.one_che_max}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>iii) Biology or Equivalent</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.one_biology} </td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.one_bio_max}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Total sum of (i),(ii),(iii)</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.one_total} </td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.one_total_max}</td>
                                                            </tr>
                                                        </tbody>


                                                    </Table>
                                                </CssVarsProvider>

                                            </Box>

                                            <Box sx={{ width: "40%" }}>
                                                <CssVarsProvider>
                                                    <Table
                                                        variant="outlined"
                                                        borderAxis="bothBetween" sx={{ border: 0.5 }}
                                                    >

                                                        <tbody>
                                                            <tr>
                                                                <td colSpan={3} style={{
                                                                    width: '25%', align: "center",
                                                                    textAlign: "center"
                                                                }}>
                                                                    Plus Two</td>


                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Mark Obtained</td>
                                                                <td style={{ width: '25%', align: "center" }}>Max. Marks </td>
                                                                <td style={{ width: '25%', align: "center" }}>% of Mark </td>

                                                            </tr>

                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_physics}</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_phy_max} </td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.physic_per} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_chemoistry}</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_chem_max} </td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.chemistry_per} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_biology}</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_bio_max} </td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.biology_per} </td>

                                                            </tr> <tr>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_mark}</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_max_mark} </td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_perc} </td>

                                                            </tr>
                                                        </tbody>
                                                    </Table>

                                                </CssVarsProvider>

                                            </Box>

                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pt: 2 }}>

                                            <Box sx={{ width: "60%", pr: 2 }}>
                                                <CssVarsProvider>
                                                    <Table
                                                        variant="outlined"
                                                        borderAxis="bothBetween" sx={{ border: 0.5 }}
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ width: '50%', align: "center" }}>iv) English</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.one_english} </td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.one_eng_max}</td>

                                                            </tr>

                                                        </tbody>

                                                    </Table>

                                                </CssVarsProvider>

                                            </Box>

                                            <Box sx={{ width: "40%" }}>
                                                <CssVarsProvider>
                                                    <Table
                                                        variant="outlined"
                                                        borderAxis="bothBetween" sx={{ border: 0.5 }}
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ width: '33%', align: "center" }}>{appdata.two_english}</td>
                                                                <td style={{ width: '33%', align: "center" }}>{appdata.two_eng_max} </td>
                                                                <td style={{ width: '33%', align: "center" }}>{appdata.english_per}</td>

                                                            </tr>

                                                        </tbody>

                                                    </Table>

                                                </CssVarsProvider>

                                            </Box>

                                        </Box>


                                        <Typography level="h5" sx={{
                                            color: '#f2a516', pt: 0.5, fontSize: 18,
                                            textAlign: "left"
                                        }} >
                                            Details of 10th & 12th Standard Examination
                                        </Typography>
                                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>


                                            <Box sx={{ width: "50%", pr: 2 }}>
                                                <CssVarsProvider>
                                                    <Table
                                                        variant="outlined"
                                                        borderAxis="bothBetween" sx={{ border: 0.5 }}
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan={2} style={{ width: '25%', align: "center" }}>
                                                                    Details of 10th & 12th Standard Examination</td>


                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Name of Institution</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.ten_institute} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Name of Examination / Board</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.ten_board} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Year of Passing</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.ten_yearofpass} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Register Number</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.ten_registerno} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Number of Attemots</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.ten_attempts} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Mark Obtained</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.ten_mark} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Max.Marks</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.ten_max_mark} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>% Marks</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.ten_perc} </td>

                                                            </tr>
                                                        </tbody>


                                                    </Table>
                                                </CssVarsProvider>

                                            </Box>

                                            <Box sx={{ width: "50%" }}>
                                                <CssVarsProvider>
                                                    <Table
                                                        variant="outlined"
                                                        borderAxis="bothBetween" sx={{ border: 0.5 }}
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan={2} style={{ width: '25%', align: "center" }}>
                                                                    Details of 10th & 12th Standard Examination</td>


                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Name of Institution</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_institute} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Name of Examination / Board</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_board} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Year of Passing</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_yearofpass} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Register Number</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_registerno} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Number of Attemots</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_attempt} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Mark Obtained</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_mark} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>Max.Marks</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_max_mark} </td>

                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: '25%', align: "center" }}>% Marks</td>
                                                                <td style={{ width: '25%', align: "center" }}>{appdata.two_perc} </td>

                                                            </tr>
                                                        </tbody>

                                                    </Table>
                                                </CssVarsProvider>

                                            </Box>

                                        </Box>


                                        <Typography level="h5" sx={{
                                            color: '#f2a516', pt: 1, fontSize: 18,
                                            textAlign: "left"
                                        }} >
                                            Declaration by the Applicant

                                        </Typography>
                                        <Box>

                                            <Typography level="h5" sx={{
                                                pt: 1, fontSize: 18,
                                                textAlign: "left"
                                            }} >
                                                I do hereby declare that all the information furnished above are true and correct and
                                                we will obey the rules and regulations of the institution , if admitted.
                                                We promise to submit all certificates and documents in orginal at the time of admission
                                                failingwhich the admission will be liable for cancellation

                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <Typography level="h5" sx={{
                                                color: '#f2a516', pt: 12, fontSize: 18, pb: 5,
                                                textAlign: "left"
                                            }} >
                                                Name & Signature of the Applicant

                                            </Typography>
                                            <Typography level="h5" sx={{
                                                color: '#f2a516', pt: 12, fontSize: 18, pl: 80, pb: 5,
                                                textAlign: "left"
                                            }} >
                                                Name & Signature of the Parent / Guardian

                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Box>
                            </Box >
                            :
                            completeFlag === 2 ?
                                <Box className="flex flex-1 justify-center items-center" >
                                    <Typography level='title-lg' fontSize={20} color='danger' >
                                        Complete The Application Process , Payment is Pending
                                    </Typography>
                                </Box>
                                :
                                <Box className="flex flex-1 justify-center items-center" >
                                    <Typography level='title-lg' fontSize={20} color='danger' >
                                        Complete The Application Process , Select Courses
                                    </Typography>
                                </Box>
                    }
                </Paper >
            </Box >
        </Box>
    )
}

export default ApplicationView