import { Box, Typography } from '@mui/joy'
import React from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Courses = () => {
    return (
        <Box className='flex flex-1 flex-col justify-items-center p-5 px-[15%]' >
            <Box className="flex flex-1 flex-col justify-items-center bg-slate-50 p-4 rounded-lg shadow-lg bg-opacity-90" >
                <Typography level="h3" className='py-6 flex' sx={{ color: '#6b5e68' }} >
                    Courses Offered
                </Typography>
                <Box className="flex flex-col px-8 gap-2" >
                    <Typography level="title-lg" className='py-0 flex  border-b-4 border-[#7c51a1]' sx={{ color: '#504b4f' }} >
                        PG Courses
                    </Typography>
                    <Box>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >MD Anaesthesiology</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >MD General Medicine</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >MD Radiodiagnosis</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >MD Dermatology Venerology & Leprosy</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >MD Paediatrics</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >MD Emergency Medicine</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >MD Psychiatry</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >MD Pulmonary Medicine</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >MS Obstetrics and Gynaecology</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >MS Otorhinolaryngology</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >MS General Surgery</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >MS Orthopaedics</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >MS Ophthalmology</Typography>
                    </Box>
                </Box >

                <Box className="flex flex-col px-8 gap-2" >
                    <Typography level="title-lg" className='py-0 flex  border-b-4 border-[#7c51a1]' sx={{ color: '#504b4f' }}>
                        UG Courses
                    </Typography>
                    <Box>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >Bachelor of Medicine, Bachelor of Surgery [MBBS]</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >Bachelor of Dental Surgery [B.D.S]</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >B.Sc. Nursing</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >Bachelor of Physiotherapy [BPT]</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >B.Sc. Optometry [B.Sc Opto]</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >B.Sc. Medical Lab Technology [B.Sc MLT]</Typography>
                    </Box>
                </Box >

                <Box className="flex flex-col px-8 gap-2" >
                    <Typography level="title-lg" className='py-0 flex  border-b-4 border-[#7c51a1]' sx={{ color: '#504b4f' }}>
                        Diploma Courses
                    </Typography>
                    <Box>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >Diploma in Radio Diagnosis & Radiotherapy Technology [DRRT]</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >Diploma in Operation Theatre and Anesthesia Technology [DOTAT]</Typography>
                        <Typography level='body-md' startDecorator={<ArrowRightIcon fontSize='small' />} >Diploma in Dialysis Technology [DDT]</Typography>
                    </Box>
                </Box >
            </Box >
        </Box >
    )
}

export default Courses