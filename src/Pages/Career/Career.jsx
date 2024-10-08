import { Box, Typography } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useState } from 'react'
import axioslogin from '../../Axios/Axios';
import moment from 'moment/moment';
import CustomBackDrop from '../Muicomponents/CustomBackDrop';
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

            <Box className='flex flex-1 flex-col justify-items-center p-5 px-[5%]' >

                <Box className="flex flex-1 flex-col justify-items-center bg-slate-50 p-4 rounded-lg shadow-lg bg-opacity-90" >
                    <Typography sx={{ ml: 1, color: "#7F8487" }} level="h3">Vacancies Announced</Typography>
                    <Box sx={{ borderTop: '2px solid grey' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1, gap: 1 }}>

                            <Box sx={{ display: "flex", justifyContent: 'center', }} onClick={(e) => handleonclickClinical(e,)}>

                                <Typography sx={{
                                    textAlign: "center", wordBreak: 'break-word',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {

                                        color: '#FF76CE',
                                        cursor: 'pointer'
                                    },
                                }} level="body-xs">Clinical</Typography>

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
                                }} level="body-xs">Non-Clinical</Typography>

                            </Box>

                        </Box>


                        <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", mt: 2 }}>

                            <CareerMain data={data} handleChange={handleChange} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                            <Login isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                        </Box>
                    </Box>
                </Box>
            </Box >
        </>
    );
}

export default memo(Career)