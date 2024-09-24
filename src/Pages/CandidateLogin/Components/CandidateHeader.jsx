import React, { memo, useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux'
import Logo from "../../../assets/logo.png"
import { getUser } from '../../../Redux/LoginSlice'
import { Avatar, Box, Dropdown, Menu, MenuButton, MenuItem, Typography } from '@mui/joy';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import axioslogin from '../../../Axios/Axios';
import moment from 'moment';
import { warningNofity } from '../../CommonCode/CommonFunc';
const { differenceInCalendarDays } = require('date-fns');

const pages = [
    'My Application',
    'My Portfolio',
    'Vacancy List',

];

// const settings = ['Settings', 'Profile', 'Logout'];

const CandidateHeader = ({ SetPageToShow, setJobData, setEditCount, setVaccancyData, personalData }) => {



    const loggedInfo = useSelector((state) => getUser(state))
    const data = JSON.parse(loggedInfo)
    const imageUrl = data?.image[0]?.value
    const emal = data?.email[0]?.value
    const ApplicationId = data?.id;


    const checkData = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
        }
    }, [ApplicationId])



    const navigate = useNavigate()

    const handlePageClick = (page) => {
        if (page === "Vacancy List") {

            if (Object.keys(personalData).length > 0) {
                SetPageToShow(2)
                setEditCount(0)
                const fetchData = async () => {
                    const result = await axioslogin.get('/Career/approvalget/all')
                    const { success, data } = result.data

                    if (success === 1 && data?.length > 0) {

                        let vaccancy;
                        vaccancy = data?.filter((val) => val?.announcement_status === 1);
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
                        const arrangedData = Object.entries(groupedByDate).map(([date, values], index) => ({
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

                            setVaccancyData(updatedData);
                        } else {
                            setVaccancyData(arrangedData);
                        }
                    } else {
                        setVaccancyData([]);
                    }

                }
                fetchData()
            } else {
                warningNofity("Insert the Portfolio Details")
            }




        } else if (page === "My Application") {
            SetPageToShow(1)
            setEditCount(0)
            const fetchData = async () => {
                const result = await axioslogin.post('/Career/appliedJob', checkData)
                const { success, data } = result.data
                if (success === 1 && data?.length > 0) {
                    const result = await axioslogin.post('/Career/appliedJobdetails', checkData)
                    const { success, dataJob } = result.data
                    if (success === 1 && dataJob?.length > 0) {
                        const data2Map = new Map(dataJob.map(item => [item.desg_id, item]));
                        const mergedData = data.map(item1 => {
                            const item2 = data2Map.get(item1.desg_slno);
                            return {
                                ...item1,
                                ...(item2 || {})
                            };
                        });
                        // Fetch job descriptions
                        const jobResult = await axioslogin.get('/Career/jobdesc');
                        const { jobsuccess, jobdata } = jobResult.data;

                        if (jobsuccess === 1 && jobdata?.length > 0) {
                            const jobDescMap = new Map();

                            // Populate the map with arrays of job_desc for each desg_id
                            jobdata.forEach(item => {
                                if (!jobDescMap.has(item.desg_id)) {
                                    jobDescMap.set(item.desg_id, []);
                                }
                                jobDescMap.get(item.desg_id).push(item.job_desc);
                            });

                            // Add job_desc array to mergedData
                            const finalData = mergedData.map(item => ({
                                ...item,
                                job_desc: jobDescMap.get(item.desg_id) || []
                            }));
                            setJobData(finalData);
                        } else {
                            setJobData(mergedData);

                        }
                    }
                    else {
                        setJobData([]);
                    }

                } else {
                    setJobData([]);
                }

            }
            fetchData()
        }
        else if (page === "My Portfolio") {
            SetPageToShow(0)
            setEditCount(0)

        } else {
            SetPageToShow(0)
        }

    };



    const handleLogout = () => {
        // setOpen(true)
        setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/Career")
            // setOpen(false)
        }, 1000);
    }
    return (
        <AppBar position="sticky" color='inherit'>
            <Box width="99%" sx={{ ml: 2, }}>
                <Toolbar disableGutters>
                    {/* Logo section */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
                        <img src={Logo} alt='Travancore' width={30} height={30} />
                    </Box>

                    <Typography
                        level="h4"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            textDecoration: 'none',
                        }}
                    >
                        Travancore Medicity
                    </Typography>


                    {/* Responsive menu section */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, cursor: 'pointer', }}>
                        <Dropdown >
                            <MenuButton variant="plain">
                                <MenuIcon />
                            </MenuButton>
                            <Menu sx={{ p: 1, }}>
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={() => handlePageClick(page)}>
                                        <Typography textAlign="center" level="body-sm" fontWeight="lg" component="div" className='hover:text-[#7c51a1]' >
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Dropdown>
                    </Box>

                    {/* Logo section for smaller screens */}

                    <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} >
                        <img src={Logo} alt='Travancore' width={30} height={30} />
                    </Box>

                    <Typography
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 500,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TMCH
                    </Typography>

                    {/* Non-responsive menu section */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "end", mr: 4, cursor: 'pointer', }}>
                        {pages.map((page) => (
                            <Box
                                key={page}
                                onClick={() => handlePageClick(page)}
                                sx={{ display: 'block', gap: 1, color: 'inherit', ml: 3 }}
                            >
                                <Typography level="body-sm" fontWeight="lg" component="div" className='hover:text-[#7c51a1]' >
                                    {page}
                                </Typography>

                            </Box>
                        ))}
                    </Box>

                    {/* User settings section */}
                    <Box sx={{ flexGrow: 0, p: 1, mr: 8, }}>

                        <Dropdown >
                            <MenuButton variant="plain">
                                <Avatar alt="User Avatar" src={imageUrl} />
                            </MenuButton>
                            <Menu sx={{}}>
                                <MenuItem className=' w-[100%]' component={Box} >
                                    <Box className="flex flex-1 justify-center items-center flex-col rounded-md" sx={{}} >
                                        <Avatar sx={{ "--Avatar-size": "150px", }} src={imageUrl} />
                                        <Typography
                                            level="title-md" component="div" fontWeight="lg" className='text-center py-3 '
                                            sx={{ color: '#555e7c' }}
                                        >{data?.name}</Typography>
                                        <Typography level="body-sm" component="div" fontWeight="lg" className='text-center py-3' >{emal}</Typography>
                                    </Box>
                                </MenuItem>
                                <MenuItem
                                    onClick={handleLogout}
                                    className=' rounded-lg text-center '
                                    component={Box}
                                >
                                    <Box className='flex justify-center  ' sx={{ width: '100%' }}>
                                        <LogoutIcon sx={{ color: '#555E7C' }} />
                                        <Typography level="body-md" component="div" fontWeight="lg" sx={{ color: '#555E7C' }}  >Logout</Typography>
                                    </Box>

                                </MenuItem>
                            </Menu>



                        </Dropdown>
                    </Box>
                </Toolbar>
            </Box>
        </AppBar >
    );
};

export default memo(CandidateHeader)
