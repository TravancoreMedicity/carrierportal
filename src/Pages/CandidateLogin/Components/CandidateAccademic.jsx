import { Box, Typography } from '@mui/joy';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import axioslogin from '../../../Axios/Axios';

const CandidateAccademic = ({ personalData, ApplicationId }) => {
    const [edudata, setedudata] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            const result = await axioslogin.get(`/common/educationDetails/${ApplicationId}`);
            const { success, data } = result.data
            if (success === 1 && data?.length > 0) {
                setedudata(data)
            } else {
                setedudata([])
            }
        }
        fetchData()
    }, [])
    return (
        <Box sx={{
            backgroundColor: 'slate.50',
            padding: 4,
            borderRadius: 'md',
            boxShadow: 'lg',
            marginTop: 2,
            '@media screen and (max-width: 768px)': {
                padding: 1,
            },
        }}>
            <Box>
                <Box>
                    <Typography sx={{}} level="body-md" >
                        Qualification Information
                    </Typography>
                </Box>

                {edudata && edudata.length > 0 ? (
                    edudata?.map((education, index) => (

                        <Box key={index} sx={{ mt: 1, display: "flex", }}>
                            <Box sx={{
                                width: "100%", borderTop: "1px solid #DFDFDF",
                                // width: "20%", '@media screen and (max-width: 768px)': {
                                //     width: "40%",
                                // },
                            }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box>  <SchoolIcon /></Box>
                                    <Box sx={{ mt: .5, display: 'flex', gap: 1, }}>
                                        <Box>
                                            <Typography level="title-md" sx={{ wordBreak: 'break-word' }}>  {education?.edu_desc}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography level="body-xs" sx={{ wordBreak: 'break-word' }}>
                                                (  {moment(new Date(education?.edustartdate)).format('DD-MM-YYYY')}  - {moment(new Date(education?.eduenddate)).format('DD-MM-YYYY')})
                                            </Typography>
                                        </Box>

                                    </Box>

                                </Box>

                                {education?.unver_name ? (
                                    <Box sx={{ display: 'flex', gap: 5 }}>
                                        <Box></Box>
                                        <Box>
                                            <Typography level="body-xs" sx={{ wordBreak: 'break-word' }}>
                                                {education?.cour_desc} ({education?.unver_name})
                                            </Typography>
                                        </Box>
                                    </Box>
                                ) : null}

                                {education?.spec_desc === null ? "" :
                                    <Box sx={{ display: 'flex', gap: 5, }}>
                                        <Box></Box>
                                        <Box><Typography level="body-xs" sx={{ wordBreak: 'break-word' }}> {education?.spec_desc}</Typography> </Box>
                                    </Box>
                                }
                                {education?.board_name === null ? "" :
                                    <Box sx={{ display: 'flex', gap: 5, }}>
                                        <Box></Box>
                                        <Box><Typography level="body-xs" sx={{ wordBreak: 'break-word' }}> {education?.board_name}</Typography> </Box>
                                    </Box>
                                }

                                <Box sx={{ display: 'flex', gap: 5, }}>
                                    <Box></Box>
                                    <Box><Typography level="body-xs" sx={{ wordBreak: 'break-word' }}> {education?.AvgGrade}%</Typography> </Box>

                                </Box>

                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography level="body-sm">No education details found.</Typography>
                )}

            </Box>
        </Box>
    );
}

export default memo(CandidateAccademic);
