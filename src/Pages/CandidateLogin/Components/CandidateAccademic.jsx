import { Box, Typography } from '@mui/joy';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import axioslogin from '../../../Axios/Axios';


const CandidateAccademic = ({ personalData, ApplicationId, count, setcount }) => {
    const [edudata, setedudata] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.get(`/common/educationDetails/${ApplicationId}`);
            const { success, data } = result.data
            if (success === 1 && data?.length > 0) {
                setedudata(data)
                setcount(0)
            } else {
                setedudata([])
            }
        }
        fetchData()
    }, [count])
    return (
        <Box
            variant="outlined" sx={{
                ml: 1,
                // height: window.innerHeight - 356,
                // backgroundColor: 'slate.50',
                // padding: 3,
                overflowX: 'scroll',
                borderRadius: 'md',
                // boxShadow: 'lg',

                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },
            }}>
            <Box>


                {edudata && edudata.length > 0 ? (
                    edudata?.map((education, index) => (

                        <Box key={index} sx={{ mt: 1, display: "flex", }}>
                            <Box sx={{

                            }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box sx={{ mt: 1 }}>  <SchoolIcon sx={{ color: '#555555' }} /></Box>
                                    <Box sx={{ mt: .5, display: 'flex', gap: 1, }}>
                                        <Box>
                                            <Typography level="title-md" sx={{ wordBreak: 'break-word', fontFamily: "Bahnschrift", fontSize: 22, fontWeight: 450, color: '#555555' }}>  {education?.edu_desc}</Typography>
                                        </Box>
                                        <Box sx={{ mt: 1 }}>

                                            <Typography level="body-xs" sx={{ wordBreak: 'break-word', fontFamily: "Bahnschrift", fontSize: 14, fontWeight: 350, color: '#555555' }}>
                                                {moment(new Date(education?.edustartdate)).format('DD-MM-YYYY')}  - {moment(new Date(education?.eduenddate)).format('DD-MM-YYYY')}
                                            </Typography>
                                        </Box>

                                    </Box>

                                </Box>

                                {education?.unver_name ? (
                                    <Box sx={{ display: 'flex', gap: 5 }}>
                                        <Box></Box>
                                        <Box>
                                            <Typography level="body-xs" sx={{ wordBreak: 'break-word', fontFamily: "Bahnschrift", fontSize: 14, fontWeight: 350, color: '#555555' }}>
                                                {education?.cour_desc} ({education?.unver_name})
                                            </Typography>
                                        </Box>
                                    </Box>
                                ) : null}

                                {education?.spec_desc === null ? "" :
                                    <Box sx={{ display: 'flex', gap: 5, }}>
                                        <Box></Box>
                                        <Box><Typography level="body-xs" sx={{ wordBreak: 'break-word', fontFamily: "Bahnschrift", fontSize: 14, fontWeight: 350, color: '#555555' }}> {education?.spec_desc}</Typography> </Box>
                                    </Box>
                                }
                                {education?.board_name === null ? "" :
                                    <Box sx={{ display: 'flex', gap: 5, }}>
                                        <Box></Box>
                                        <Box><Typography level="body-xs" sx={{ wordBreak: 'break-word', fontFamily: "Bahnschrift", fontSize: 14, fontWeight: 350, color: '#555555' }}> {education?.board_name}</Typography> </Box>
                                    </Box>
                                }

                                <Box sx={{ display: 'flex', gap: 5, }}>
                                    <Box></Box>
                                    <Box>
                                        <Typography level="body-xs" sx={{ wordBreak: 'break-word', fontFamily: "Bahnschrift", fontSize: 14, fontWeight: 350, color: '#555555' }}> {education?.AvgGrade}%</Typography>
                                    </Box>

                                </Box>

                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography level="body-sm" sx={{ fontFamily: "Bahnschrift", fontSize: 15, fontWeight: 350, color: '#555555' }}>No education details found.</Typography>
                )}

            </Box>
        </Box>
    );
}

export default memo(CandidateAccademic);
