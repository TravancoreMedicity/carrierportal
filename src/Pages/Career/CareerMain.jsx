import React, { lazy, memo, useCallback, useState } from 'react'
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Typography, useTheme } from '@mui/joy';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useMediaQuery } from '@mui/material';
import moment from 'moment/moment';

const CareerModal = lazy(() => import('./CareerModal'))

const CareerMain = ({ data, handleChange, isModalOpen, setIsModalOpen }) => {


    const [isModalOpenmain, setIsModalOpenmain] = useState(false)
    const [SelectedData, SetSelectedData] = useState([])

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handleonclick = useCallback(async (e, currentItem) => {
        SetSelectedData(currentItem);
        setIsModalOpenmain(true)
    }, []);

    return (
        <Box>
            {data?.length > 0 ?
                <Box>
                    {data?.map((item, index) => (
                        <Box key={index}>
                            <Box sx={{ mt: 2, borderBottom: '1px solid #DFDFDF', display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{ width: "75%" }}>
                                    <Typography sx={{}} level="body-xs">POSTED ON: {item?.annouced_date}</Typography>
                                </Box>
                            </Box>


                            {item?.data?.map((currentItem, idx) => {
                                if (currentItem?.indexValue % 2 != 0) {
                                    return (
                                        <Box key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            {/* First Box */}
                                            <Box sx={{ width: "80%", display: 'flex', justifyContent: 'space-around' }}>
                                                <Box sx={{ mt: 2, width: '80%', cursor: 'pointer' }}>
                                                    <Card sx={{ borderRadius: 15 }}>
                                                        <Box sx={{}}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                                <Typography level="body-lg">{currentItem?.desg_name}</Typography>
                                                                <Typography level="body-xs">
                                                                    Posted On: {currentItem?.daysDifference === 0 ? "Today" : `${currentItem?.daysDifference} Day${currentItem?.daysDifference === 1 ? '' : 's'} ago`}
                                                                </Typography>
                                                            </Box>
                                                            <Typography level="body-xs">{currentItem?.experiencefrom}-{currentItem?.experienceto} Year Experience</Typography>
                                                        </Box>

                                                        <CardContent orientation="horizontal">
                                                            <Box sx={{ width: '100%' }}>
                                                                <Typography level="body-xs" sx={{ wordBreak: 'break-word' }}>
                                                                    {currentItem?.job_descriptions && currentItem.job_descriptions[0] ? currentItem.job_descriptions[0] : "Not Updated"}
                                                                </Typography>
                                                                <Box onClick={(e) => handleonclick(e, currentItem)}>
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
                                                            </Box>
                                                        </CardContent>
                                                    </Card>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        mt: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        cursor: 'pointer',

                                                    }} onClick={(e) => handleChange(e)}
                                                >
                                                    {!isMobile && (
                                                        <Box>
                                                            <Typography sx={{ ml: 1 }} variant="body1">APPLY NOW</Typography>
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
                                            </Box>
                                        </Box>
                                    );
                                } else {
                                    // Render the second box in the pair
                                    return (
                                        <Box key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            {/* Second Box */}
                                            <Box sx={{ width: "80%", display: 'flex', justifyContent: 'space-around' }}>
                                                <Box
                                                    sx={{
                                                        mt: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        cursor: 'pointer',
                                                    }} onClick={(e) => handleChange(e)}
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
                                                                <Typography sx={{ ml: 1 }} variant="body1">APPLY NOW</Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </Box>
                                                <Box sx={{ mt: 2, width: '80%', cursor: 'pointer' }}>
                                                    <Card sx={{ borderRadius: 15 }}>
                                                        <Box sx={{}}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                                <Typography level="body-lg">{currentItem?.desg_name}</Typography>
                                                                <Typography level="body-xs">
                                                                    Posted On: {currentItem?.daysDifference === 0 ? "Today" : `${currentItem?.daysDifference} Day${currentItem?.daysDifference === 1 ? '' : 's'} ago`}
                                                                </Typography>
                                                            </Box>
                                                            <Typography level="body-xs">{currentItem?.experiencefrom}-{currentItem?.experienceto} Year Experience</Typography>
                                                        </Box>

                                                        <CardContent orientation="horizontal">
                                                            <Box sx={{ width: '100%' }}>
                                                                <Typography level="body-xs" sx={{ wordBreak: 'break-word' }}>
                                                                    {currentItem?.job_descriptions && currentItem.job_descriptions[0] ? currentItem.job_descriptions[0] : "Not Updated"}
                                                                </Typography>
                                                                <Box onClick={(e) => handleonclick(e, currentItem)}>
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
                </Box> :
                <Box sx={{ alignItems: 'center' }}>
                    <Typography level="title-lg" textAlign="center">
                        No Vaccancy Found
                    </Typography>

                </Box>
            }

            <CareerModal isModalOpenmain={isModalOpenmain} setIsModalOpenmain={setIsModalOpenmain} SelectedData={SelectedData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Box >
    )
}

export default memo(CareerMain)