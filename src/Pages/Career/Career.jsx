import { Box, Typography } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useState } from 'react'
import axioslogin from '../../Axios/Axios';
import moment from 'moment/moment';
import CustomBackDrop from '../Muicomponents/CustomBackDrop';
import Logo from "../../assets/MEDICITY LOGO.png"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
const { differenceInCalendarDays } = require('date-fns');


const CareerMain = lazy(() => import('./CareerMain'))
const Login = lazy(() => import('../Login/Login'))

const Career = () => {
    const [data, setdata] = useState([])
    const [count, setcount] = useState(0)
    // const [Clinicalcount, setcountClinical] = useState(0)
    // const [NonClinicalcount, setcountNonClinical] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [openBkDrop, setOpenBkDrop] = useState(true)


    const handleonclickClinical = useCallback(async (e,) => {
        if (count === 1) {
            setOpenBkDrop(false)
        } else {
            setOpenBkDrop(true)
            setcount(1)
        }

    }, [count]);
    const handleonclickNonClinical = useCallback(async (e,) => {
        if (count === 2) {
            setOpenBkDrop(false)
        } else {
            setOpenBkDrop(true)
            setcount(2)
        }

    }, [count]);

    const handleChange = useCallback(async (e) => {
        setIsModalOpen(true)
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            setOpenBkDrop(false);
            fetchData();
        }, 1000);

        const fetchData = async () => {
            try {
                // Fetch job announcements
                // setOpenBkDrop(true)
                const result = await axioslogin.get('/Career/approvalget/all');
                const { success, data } = result.data;

                if (success === 1 && data?.length > 0) {
                    // setOpenBkDrop(false)
                    // Process announcement counts
                    // const clinicalCount = data?.filter(val => val.announcement_status === 1 && val.dept_type === 1);
                    // setcountClinical(clinicalCount?.length);
                    // const nonClinicalCount = data?.filter(val => val.announcement_status === 1 && val.dept_type !== 1);
                    // setcountNonClinical(nonClinicalCount?.length);

                    // Filter based on count
                    let vaccancy;
                    if (count === 1) {

                        vaccancy = data?.filter(val => val?.announcement_status === 1 && val?.dept_type === 1);
                    } else if (count === 2) {

                        vaccancy = data?.filter(val => val?.announcement_status === 1 && val?.dept_type !== 1);
                    } else {
                        vaccancy = data?.filter(val => val?.announcement_status === 1);
                    }

                    // Group by announced_date
                    const groupedByDate = vaccancy.reduce((acc, val) => {
                        const date = moment(new Date(val?.annouced_date)).format('DD/MM/YYYY HH: MM a');
                        if (acc[date]) {
                            acc[date]?.push(val);
                        } else {
                            acc[date] = [val];
                        }
                        return acc;
                    }, {});

                    let counter = 1;
                    const arrangedData = Object.entries(groupedByDate).map(([date, values]) => ({
                        annouced_date: date,
                        data: values.map((value, idx) => {
                            const today = new Date();
                            const annoucedDate = new Date(value?.annouced_date);
                            const daysDifference = differenceInCalendarDays(today, annoucedDate);
                            return {
                                ...value,
                                indexValue: counter++,
                                daysDifference: daysDifference
                            };
                        })
                    }));

                    // Fetch job descriptions
                    const jobResult = await axioslogin.get('/Career/jobdesc');
                    const { jobsuccess, jobdata } = jobResult.data;
                    if (jobsuccess === 1 && jobdata?.length > 0) {
                        // Create a mapping from desg_id to job descriptions
                        const jobDescriptionsMap = jobdata.reduce((acc, job) => {
                            if (!acc[job.desg_id]) {
                                acc[job.desg_id] = [];
                            }
                            acc[job.desg_id].push(job.job_desc);
                            return acc;
                        }, {});

                        // Add job descriptions to arrangedData
                        const updatedData = arrangedData.map(entry => ({
                            ...entry,
                            data: entry.data.map(item => ({
                                ...item,
                                job_descriptions: jobDescriptionsMap[item.desg_id] || []
                            }))
                        }));

                        // Fetch skills data
                        const SkillResult = await axioslogin.get('/Career/jobSkill');
                        const { Skillsucces, Skilldata } = SkillResult.data;

                        if (Skillsucces && Skilldata?.length > 0) {
                            // Create a mapping from desg_id to an array of skill names
                            const skillsMap = Skilldata.reduce((acc, skill) => {
                                if (!acc[skill.desig_id]) {
                                    acc[skill.desig_id] = [];
                                }
                                acc[skill.desig_id].push(skill.skill_name);
                                return acc;
                            }, {});

                            // Add skills to updatedData
                            const finalData = updatedData.map(entry => ({
                                ...entry,
                                data: entry.data.map(item => ({
                                    ...item,
                                    skills: skillsMap[item.desg_id] || []
                                }))
                            }));
                            setdata(finalData);
                        } else {
                            setdata(updatedData);
                        }
                    } else {
                        setdata(arrangedData);
                    }
                } else {
                    setdata([]);
                }
            } catch (error) {
                setdata([]);
            }
        };


        return () => clearTimeout(timer);


    }, [setdata, count]);


    return (
        <>

            <CustomBackDrop open={openBkDrop} text="Please wait !. " />

            <Box className='flex flex-1 flex-col justify-items-center ' sx={{ height: '100vh' }} >

                <Box className="flex flex-1 flex-col justify-items-center  p-4 rounded-lg shadow-lg bg-opacity-10" sx={{ backgroundColor: '#FFFBF5' }} >
                    <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <Box>
                            <Typography sx={{
                                ml: 1, fontFamily: "Bahnschrift", fontSize: 28, fontWeight: 400, color: '#555555',
                                '@media screen and (max-width: 768px)': {
                                    fontSize: 20, fontWeight: 400, mt: 1
                                },
                            }} >Vacancies Announced</Typography>
                        </Box>
                        <Box sx={{}} >
                            <img src={Logo} alt='Travancore' width={90} height={90}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ borderTop: '2px solid #555555' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1, gap: 1 }}>

                            <Box sx={{ display: "flex", justifyContent: 'center', }} onClick={(e) => handleonclickClinical(e,)}>

                                <Typography sx={{
                                    textAlign: "center", wordBreak: 'break-word',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {

                                        color: '#FF76CE',
                                        cursor: 'pointer'
                                    },
                                    fontFamily: "Bahnschrift", fontSize: 13, fontWeight: 1, color: '#555555',
                                }} >Clinical</Typography>

                            </Box>

                            <Box sx={{
                                display: "flex", justifyContent: 'center', cursor: 'pointer',

                            }} onClick={(e) => handleonclickNonClinical(e,)}>

                                <Typography sx={{
                                    textAlign: "center", wordBreak: 'break-word',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {

                                        color: '#FF76CE',
                                        cursor: 'pointer'
                                    },
                                    fontFamily: "Bahnschrift", fontSize: 13, fontWeight: 1, color: '#555555',
                                }} >Non-Clinical</Typography>

                            </Box>

                        </Box>


                        <Box sx={{ height: window.innerHeight - 180, overflowX: "auto", mt: 2 }}>

                            <CareerMain data={data} handleChange={handleChange} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                            <Login isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                        </Box>
                        {/* footer section */}
                        <Box
                            sx={{
                                borderTop: '2px solid #DBD3D3',
                                mt: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: { xs: 'column', sm: 'row' }  // Stack on small screens
                            }}
                        >
                            <Box
                                sx={{
                                    width: { xs: "100%", sm: "100%" }, // Adjust width for smaller screens
                                    textAlign: 'center',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens
                                    alignItems: { xs: 'center', sm: 'flex-start' } // Center items on small screens
                                }}
                            >
                                <Box>
                                    <Typography
                                        sx={{
                                            fontFamily: "Bahnschrift",
                                            fontSize: { xs: 10, sm: 12 }, // Adjust font size for smaller screens
                                            fontWeight: 400,
                                            color: '#555555',
                                            mt: 2,
                                            '@media screen and (max-width: 768px)': {
                                                mt: 0,

                                            },
                                        }}
                                    >
                                        Copyright © 2024 Travancore Medicity. All Right Reserved.
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex', gap: 1, alignItems: 'center', '@media screen and (max-width: 768px)': {
                                        mt: 0,

                                    },
                                }}>
                                    <Box sx={{
                                        mt: 1,
                                        '@media screen and (max-width: 768px)': {
                                            mt: 0,

                                        },
                                    }}>
                                        <MailOutlineIcon fontSize='small' />
                                    </Box>
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontFamily: "Bahnschrift",
                                                fontSize: { xs: 10, sm: 12 },
                                                fontWeight: 400,
                                                color: '#555555',
                                                mt: 2,
                                                '@media screen and (max-width: 768px)': {
                                                    mt: 0,

                                                },
                                            }}
                                        >
                                            info@tmc.ac.in
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontFamily: "Bahnschrift",
                                            fontSize: { xs: 10, sm: 12 },
                                            fontWeight: 400,
                                            color: '#555555',
                                            mt: 2,
                                            '@media screen and (max-width: 768px)': {
                                                mt: 0,

                                            },
                                        }}
                                    >
                                        Website Privacy & Cookies Policy Site Map
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box >
        </>
    );
}

export default memo(Career)