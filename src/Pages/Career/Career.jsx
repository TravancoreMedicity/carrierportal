import { Badge, Box, Typography } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useState } from 'react'
import axioslogin from '../../Axios/Axios';
import moment from 'moment/moment';
const { differenceInCalendarDays } = require('date-fns');


const CareerMain = lazy(() => import('./CareerMain'))
const Login = lazy(() => import('../Login/Login'))

const Career = () => {
    const [data, setdata] = useState([])
    const [count, setcount] = useState(0)
    const [Clinicalcount, setcountClinical] = useState(0)
    const [NonClinicalcount, setcountNonClinical] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleonclickClinical = useCallback(async (e,) => {
        setcount(1)
    }, []);
    const handleonclickNonClinical = useCallback(async (e,) => {
        setcount(2)
    }, []);

    const handleChange = useCallback(async (e) => {
        setIsModalOpen(true)
    }, []);


    useEffect(() => {

        const fetchData = async () => {
            try {
                // Fetch job announcements
                const result = await axioslogin.get('/Career/approvalget/all');
                const { success, data } = result.data;

                if (success === 1 && data?.length > 0) {
                    // Process announcement counts
                    const clinicalCount = data?.filter(val => val.announcement_status === 1 && val.dept_type === 1);
                    setcountClinical(clinicalCount?.length);
                    const nonClinicalCount = data?.filter(val => val.announcement_status === 1 && val.dept_type !== 1);
                    setcountNonClinical(nonClinicalCount?.length);

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

        fetchData();


    }, [setdata, count]);


    return (
        <Box className='flex flex-1 flex-col justify-items-center p-5 px-[5%]' >

            <Box className="flex flex-1 flex-col justify-items-center bg-slate-50 p-4 rounded-lg shadow-lg bg-opacity-90" >
                <Typography sx={{ ml: 1, color: "#7F8487" }} level="h2">JOBS</Typography>
                <Box sx={{ borderTop: '2px solid grey' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <Box sx={{
                            borderTopLeftRadius: 18, border: '1px solid white', borderBottomLeftRadius: 18, width: '200px', p: .5,
                            backgroundColor: '#7F8487',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: '#444444',
                                cursor: 'pointer'
                            },

                        }}>
                            <Box sx={{ display: "flex", justifyContent: 'center', }} onClick={(e) => handleonclickClinical(e,)}>
                                <Badge size="sm" badgeContent={Clinicalcount} sx={{ textAlign: "center", width: '100px', display: "flex", justifyContent: 'center', }}>
                                    <Typography sx={{ textAlign: "center", wordBreak: 'break-word', color: "#EEEEEE" }} level="body-lg">CLINICAL</Typography>
                                </Badge>
                            </Box>


                        </Box>
                        <Box sx={{
                            borderTopRightRadius: 18, border: '1px solid white', borderBottomRightRadius: 18, width: '200px', p: .5,
                            backgroundColor: '#7F8487',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: '#444444',
                                cursor: 'pointer'
                            },
                        }}>
                            <Box sx={{ display: "flex", justifyContent: 'center' }} onClick={(e) => handleonclickNonClinical(e,)}>
                                <Badge size="sm" badgeContent={NonClinicalcount} sx={{ textAlign: "center", width: '150px', display: "flex", justifyContent: 'center', }}>
                                    <Typography sx={{ textAlign: "center", wordBreak: 'break-word', color: "#EEEEEE" }} level="body-lg">NON-CLINICAL</Typography>
                                </Badge>
                            </Box>
                        </Box>
                    </Box>


                    <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", mt: 2 }}>

                        <CareerMain data={data} handleChange={handleChange} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                        <Login isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}

export default memo(Career)