
import React, { lazy, memo, useCallback, useState } from 'react'
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Typography, useTheme } from '@mui/joy';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useMediaQuery } from '@mui/material';
import moment from 'moment/moment';
import { warningNofity } from '../../../CommonCode/CommonFunc';

const JobModal = lazy(() => import('./JobModal'))


const VaccancyListEmp = ({ vaccancyData, personalData, setcount }) => {

    const [SelectedData, SetSelectedData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)


    const handleonclick = useCallback(async (e, currentItem) => {
        SetSelectedData(currentItem);
        const desgId = currentItem?.desg_id;
        if (personalData !== null) {
            const isDesgIdInJobApplied = personalData?.Job_applied.includes(desgId);
            if (isDesgIdInJobApplied === true) {
                warningNofity("You Have Already Applied For This Job")
            }
            else {
                const qualification = parseInt(currentItem?.qualification);
                const isQualificationInEducationDetails = personalData?.Education_details?.some(edu => edu.education === qualification);
                if (isQualificationInEducationDetails === true) {
                    setIsModalOpen(true)

                } else {
                    warningNofity("Qualication Not Matching")
                }
            }
        } else {
            warningNofity("Insert the educational deatils in Portfolio")
        }
    }, [personalData]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box sx={{
            backgroundColor: 'slate.50',
            padding: 3,
            borderRadius: 'md',
            boxShadow: 'lg',
            '@media screen and (max-width: 768px)': {
                padding: 1,

            },

        }}>
            {vaccancyData?.length > 0 ?
                <Box sx={{
                    height: window.innerHeight - 350, overflowX: "auto",
                }}>
                    {vaccancyData?.map((item, index) => (
                        <Box key={index} sx={{}}>
                            <Box sx={{ mt: 2, borderBottom: '1px solid #DFDFDF', display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{ width: "75%" }}>
                                    <Typography sx={{}} level="body-xs">POSTED ON: {item?.annouced_date}</Typography>
                                </Box>
                            </Box>

                            {item?.data?.map((currentItem, idx) => {

                                if (currentItem?.indexValue % 2 != 0) {
                                    const desgId = currentItem?.desg_id;
                                    const isDesgIdInJobApplied = personalData?.Job_applied?.includes(desgId);
                                    return (

                                        <Box key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            {/* First Box */}
                                            <Box sx={{ width: "80%", display: 'flex', justifyContent: 'space-around' }}>
                                                <Box sx={{ mt: 2, width: '80%', cursor: 'pointer' }}>
                                                    <Card sx={{ borderRadius: 15 }}>
                                                        <Box sx={{}}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                                <Typography level="body-sm">{currentItem?.desg_name}</Typography>
                                                                <Typography level="body-xs">
                                                                    Posted On: {currentItem?.daysDifference === 0 ? "Today" : `${currentItem?.daysDifference} Day${currentItem?.daysDifference === 1 ? '' : 's'} ago`}
                                                                </Typography>
                                                            </Box>
                                                            <Typography level="body-xs">{currentItem?.experiencefrom}-{currentItem?.experienceto} Year Experience</Typography>
                                                        </Box>

                                                        <CardContent orientation="horizontal">
                                                            <Box sx={{ width: "100%" }}>
                                                                <Typography level="body-xs" sx={{ wordBreak: 'break-word' }}>
                                                                    {currentItem?.job_descriptions && currentItem?.job_descriptions[0] ? currentItem?.job_descriptions[0] : "Not Updated"}
                                                                </Typography>
                                                                <Box
                                                                // onClick={(e) => handleonclick(e, currentItem)}
                                                                >
                                                                    <Typography level="body-xs" sx={{ wordBreak: 'break-word', color: '#00A9FF' }}>
                                                                        ...see more
                                                                    </Typography>
                                                                </Box>
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, flexWrap: 'wrap', }}>
                                                                    <Typography level="body-xs" sx={{ wordBreak: 'break-word' }}>
                                                                        JOB ID: {currentItem?.manpower_Request_slno}
                                                                    </Typography>
                                                                    <Typography level="body-xs" sx={{ wordBreak: 'break-word', color: '#FF76CE' }}>
                                                                        Apply Before: {moment(new Date(currentItem?.required_date)).format('DD-MM-YYYY HH MM a')}
                                                                    </Typography>
                                                                </Box>
                                                                <Box sx={{}}>
                                                                    <Typography color={isDesgIdInJobApplied ? 'success' : 'danger'} level="body-xs" sx={{ wordBreak: 'break-word', }}>
                                                                        Status: {isDesgIdInJobApplied === true ? "Applied" : "Not Applied"}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </CardContent>
                                                    </Card>
                                                </Box>
                                                {isDesgIdInJobApplied === false ?
                                                    <Box
                                                        sx={{
                                                            mt: 2,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            cursor: 'pointer',

                                                        }}
                                                        onClick={(e) => handleonclick(e, currentItem)}
                                                    >
                                                        {!isMobile && (
                                                            <Box>
                                                                <Typography level="body-sm" sx={{ ml: 1 }} >APPLY NOW</Typography>
                                                            </Box>
                                                        )}
                                                        <Box sx={{
                                                            ml: 2,
                                                            mb: .7,

                                                            '&:hover > svg': {
                                                                transform: 'translateX(10px)',
                                                                transition: 'transform 0.5s ease',
                                                            },
                                                        }}>
                                                            <ArrowForwardIosIcon fontSize='small' sx={{ color: '#FF76CE', transition: 'transform 0.5s ease' }} />
                                                        </Box>
                                                    </Box>
                                                    : ""}

                                            </Box>
                                        </Box>
                                    );
                                } else {
                                    const desgId = currentItem.desg_id;
                                    const isDesgIdInJobApplied = personalData?.Job_applied.includes(desgId);
                                    // Render the second box in the pair
                                    return (
                                        <Box key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            {/* Second Box */}
                                            <Box sx={{ width: "80%", display: 'flex', justifyContent: 'space-around' }}>
                                                {isDesgIdInJobApplied === false ?
                                                    <Box
                                                        sx={{
                                                            mt: 2,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={(e) => handleonclick(e, currentItem)}
                                                    >
                                                        <Box sx={{
                                                            mb: .7,
                                                            '&:hover > svg': {
                                                                transform: 'translateX(-10px)',
                                                                transition: 'transform 0.5s ease',
                                                            }
                                                        }}>
                                                            <ArrowBackIosNewIcon fontSize='small' sx={{ color: '#FF76CE', transition: 'transform 0.5s ease' }} />
                                                        </Box>
                                                        <Box sx={{ ml: 1 }}>
                                                            {!isMobile && (
                                                                <Box>
                                                                    <Typography sx={{ ml: 1 }} level="body-sm">APPLY NOW</Typography>
                                                                </Box>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                    : ''}

                                                <Box sx={{ mt: 2, width: '80%', cursor: 'pointer' }}>
                                                    <Card sx={{ borderRadius: 15 }}>
                                                        <Box sx={{}}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                                <Typography level="body-sm">{currentItem?.desg_name}</Typography>
                                                                <Typography level="body-xs">
                                                                    Posted On: {currentItem?.daysDifference === 0 ? "Today" : `${currentItem?.daysDifference} Day${currentItem?.daysDifference === 1 ? '' : 's'} ago`}
                                                                </Typography>
                                                            </Box>
                                                            <Typography level="body-xs">{currentItem?.experiencefrom}-{currentItem?.experienceto} Year Experience</Typography>
                                                        </Box>

                                                        <CardContent orientation="horizontal">
                                                            <Box sx={{ width: "100%" }}>
                                                                <Typography level="body-xs" sx={{ wordBreak: 'break-word' }}>
                                                                    {currentItem?.job_descriptions && currentItem.job_descriptions[0] ? currentItem.job_descriptions[0] : "Not Updated"}
                                                                </Typography>
                                                                <Box
                                                                // onClick={(e) => handleonclick(e, currentItem)}
                                                                >
                                                                    <Typography level="body-xs" sx={{ wordBreak: 'break-word', color: '#00A9FF', }}>
                                                                        ...see more
                                                                    </Typography>
                                                                </Box>
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, flexWrap: 'wrap' }}>
                                                                    <Typography level="body-xs" sx={{ wordBreak: 'break-word' }}>
                                                                        JOB ID: {currentItem?.manpower_Request_slno}
                                                                    </Typography>
                                                                    <Typography level="body-xs" sx={{ wordBreak: 'break-word', color: '#FF76CE' }}>
                                                                        Apply Before: {moment(new Date(currentItem?.required_date)).format('DD-MM-YYYY HH MM a')}
                                                                    </Typography>
                                                                </Box>
                                                                <Box sx={{}}>
                                                                    <Typography color={isDesgIdInJobApplied ? 'success' : 'danger'} level="body-xs" sx={{ wordBreak: 'break-word' }}>
                                                                        Status: {isDesgIdInJobApplied === true ? "Applied" : "Not Applied"}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </CardContent>
                                                    </Card>
                                                </Box>
                                            </Box>
                                        </Box>
                                    );
                                }
                            })}
                        </Box>
                    ))}
                </Box> : "No Data Found"
            }

            <JobModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                SelectedData={SelectedData}
                personalData={personalData}
                setcount={setcount}
            />
        </Box>
    )
}

export default memo(VaccancyListEmp)