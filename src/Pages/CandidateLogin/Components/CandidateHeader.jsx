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
    'Contact Us',
    'Vacancy List',

];

// const settings = ['Settings', 'Profile', 'Logout'];

const CandidateHeader = ({ SetPageToShow, setJobData, setEditCount, setVaccancyData, personalData }) => {



    const loggedInfo = useSelector((state) => getUser(state))
    const data = JSON.parse(loggedInfo)
    // const imageUrl = data?.image[0]?.value
    // const emal = data?.email[0]?.value
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
                warningNofity("Complete the Portfolio")
            }

        } else if (page === "My Application") {

            SetPageToShow(1)
            setEditCount(0)
            if (Object.keys(personalData).length > 0) {
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
            } else {
                warningNofity("Complete the Portfolio")
            }
        }
        else if (page === "My Portfolio") {
            if (Object.keys(personalData).length > 0) {
                SetPageToShow(0)
                setEditCount(0)
            } else {
                warningNofity("Complete the Portfolio")
            }
        } else if (page === "Contact Us") {
            if (Object.keys(personalData).length > 0) {
                SetPageToShow(3)
                setEditCount(0)
            } else {
                warningNofity("Complete the Portfolio")
            }
        }

        else {
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
        <AppBar position="sticky" color='inherit' elevation={0} sx={{ backgroundColor: '#FFFBF5' }}>
            <Box width="99%" sx={{ ml: 2, }}>
                <Toolbar disableGutters>
                    {/* Logo section */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
                        <img src={Logo} alt='Travancore' width={30} height={30} />
                    </Box>

                    <Typography
                        // level="h4"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            mt: 2,
                            display: { xs: 'none', md: 'flex' },
                            textDecoration: 'none',
                            fontFamily: "Bahnschrift",
                            fontWeight: 500,
                            fontSize: 26
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
                                        <Typography textAlign="center" level="body-sm" fontWeight="lg" component="div" className='hover:text-[#7c51a1]'
                                            sx={{ fontFamily: "Bahnschrift", }}
                                        >
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
                            mt: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 500,
                            color: 'inherit',
                            textDecoration: 'none',
                            fontFamily: "Bahnschrift",
                        }}
                    >
                        TMCH
                    </Typography>

                    {/* Non-responsive menu section */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mr: 4, cursor: 'pointer', mt: 2 }}>
                        {pages.map((page) => (
                            <Box
                                key={page}
                                onClick={() => handlePageClick(page)}
                                sx={{ display: 'block', gap: 1, color: 'inherit', ml: 3 }}
                            >
                                <Typography level="body-sm" fontWeight="lg" component="div" className='hover:text-[#7c51a1]'
                                    sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 500, color: '#555555' }}
                                >
                                    {page}
                                </Typography>

                            </Box>
                        ))}
                    </Box>

                    {/* User settings section */}
                    <Box sx={{
                        flexGrow: 0, p: 1, mr: 7, mt: 1,
                        '@media screen and (max-width: 768px)': {
                            mr: 1,

                        },
                    }}>

                        <Dropdown >
                            <MenuButton onClick={handleLogout} variant="plain" sx={{
                                border: "1px solid #555555", borderRadius: 20,

                            }}>
                                <Typography sx={{
                                    fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 500, color: '#555555',
                                    '@media screen and (max-width: 768px)': {
                                        mr: 1,
                                        fontSize: 15, fontWeight: 500, p: 0, m: 0
                                    },
                                }}>
                                    Sign out
                                </Typography>


                                {/* {profilePic === '' ?
                                    <Avatar alt="User Avatar" src={imageUrl} />
                                    :
                                    <Avatar alt="User Avatar" src={profilePic} />
                                } */}

                            </MenuButton>
                            {/* <Menu sx={{ backgroundColor: '#FFFBF5' }}>
                                <MenuItem className=' w-[100%]' component={Box} >
                                    <Box className="flex flex-1 justify-center items-center flex-col rounded-md" sx={{}} >
                                        {profilePic === '' ?
                                            <Avatar sx={{ "--Avatar-size": "100px", }} alt="User Avatar" src={imageUrl} />
                                            :
                                            <Avatar sx={{ "--Avatar-size": "100px", }} alt="User Avatar" src={profilePic} />
                                        }
                                        <Typography
                                            className='text-center  '
                                            sx={{ color: '#555555', fontFamily: "Bahnschrift", fontSize: 26, fontWeight: 500, }}
                                        >{data?.name}</Typography>
                                        <Typography level="body-sm" className='text-center ' sx={{ color: '#555555', fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 500, }}>{emal}</Typography>
                                    </Box>
                                </MenuItem>
                                <MenuItem
                                    onClick={handleLogout}
                                    className=' rounded-lg text-center '
                                    component={Box}
                                >
                                    <Box className='flex justify-center  ' sx={{ width: '100%' }}>
                                        <LogoutIcon sx={{ color: '#FF76CE' }} />
                                        <Typography level="body-md" component="div" fontWeight="lg" sx={{ color: '#FF76CE' }}  >Sign Out</Typography>
                                    </Box>

                                </MenuItem>
                            </Menu> */}



                        </Dropdown>
                    </Box>
                </Toolbar>
            </Box>
        </AppBar >
    );
};

export default memo(CandidateHeader)
