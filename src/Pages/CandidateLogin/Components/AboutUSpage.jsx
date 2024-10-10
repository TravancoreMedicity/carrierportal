import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';
import Logo from "../../../assets/MEDICITY LOGO.png"

const AboutUSpage = () => {
    return (
        <Box sx={{
            padding: 14,
            borderRadius: 'md',
            '@media screen and (max-width: 768px)': {
                padding: 1,

            },
        }}>
            <Typography sx={{
                fontFamily: "Bahnschrift", fontSize: 30, fontWeight: 400, color: '#555555',
                '@media screen and (max-width: 768px)': {
                    textAlign: 'center'
                },
            }}>About Us</Typography>
            <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 28, fontWeight: 400, color: '#555555', }}>The Concept</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', }}>A better care with innovation</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 12, fontWeight: 400, color: '#555555', }}>

                    “A trailblazer in the field of education and healthcare, Travancore Medicity is designed to deliver the highest level
                    of professional expertise and world-class care.”

                </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 12, fontWeight: 400, color: '#555555', }}>

                    Conveniently located at Mylapore in Kollam district, Travancore Medicity is a Multi speciality hospital that truly cares for life.
                    A pioneer in the field of education and healthcare, We promise to deliver the highest level of professional expertise and world-class care.
                    Deployment of ultra-modern technology further adds to its strength and commitment to give its patients the best of healthcare.
                    The quality domains apply to all staff and departments. Travancore Medicity strives for excellence in healthcare by encouraging a
                    culture of support, respect, integrity and teamwork; by monitoring and assessing the performance against national and international
                    standards of care. By learning from successes and setbacks, Travancore Medicity endeavors to improve through innovation and change;
                    and works in partnership and collaboration with all local agencies of health and social care.

                </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 12, fontWeight: 400, color: '#555555', }}>
                    Travancore Medical College Hospital N H bypass Mylapore,
                </Typography>
            </Box>
            <Box sx={{}}>
                <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 12, fontWeight: 400, color: '#555555', }}>
                    Thattamala, P. O, Kollam, Kerala 691020
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', mt: 1 }}>
                <Box>
                    <MailOutlineIcon fontSize='small' />
                </Box>
                <Box sx={{ mt: 1, ml: 1 }}>
                    <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 12, fontWeight: 400, color: '#555555', }}>
                        info@tmc.ac.in
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', mt: 1 }}>
                <Box>
                    <CallIcon fontSize='small' />
                </Box>
                <Box sx={{ ml: 1 }}>
                    <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 12, fontWeight: 400, color: '#555555', }}>
                        +91 474 2729393, +91 474 3509393
                    </Typography>
                    <Typography sx={{ fontFamily: "Bahnschrift", fontSize: 12, fontWeight: 400, color: '#555555', }}>
                        +91 474 2729293, +91 474 2721999
                    </Typography>
                </Box>


            </Box>
            <Box sx={{ mt: 1 }} >
                <img src={Logo} alt='Travancore' width={120} height={120} />
            </Box>
        </Box>
    )
}

export default memo(AboutUSpage)