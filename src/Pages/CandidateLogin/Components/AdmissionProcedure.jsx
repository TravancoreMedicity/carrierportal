import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import { useNavigate } from 'react-router'
import CustBackDropWithState from '../../../Components/CustBackDropWithState'

const Customtypo = ({ words }) => {
    return (
        <Typography
            level="body-sm"
            startDecorator={<span className='text-[#d83faa]' >*</span>}
            sx={{ alignItems: 'flex-start', wordBreak: 'break-word', color: '#272728' }}
        >{words}</Typography>
    )
}

const wordArray = [
    'Government seats will be filled by LBS Centre, the government-approved agency by inviting applications from eligible candidates based on the Merit List prepared and observing all prevailing rules relating to communal reservation of seats.',
    'Management Seats will be filled up by the College by inviting online applications from eligible candidates based on the Merit/ Rank List prepared. Candidates with higher ranks will be given priority in the allotment of seats. A separate Rank List will be prepared for each of the Courses. There will be no reservation of seats for SEBC and or SC/ST candidates under Management quota.',
    'Applications for Management Seats can be submitted online through the college website www.tmc.ac.in.along with an application fee of Rs.500/-.',
    'A candidate needs to submit only one application form for applying for any or all three Courses by remitting a total fee of Rs 500/- only.',
    'Application fee once remitted will not be refunded under any circumstances.',
    'All the candidates admitted shall pay the fees fixed by the Government of Kerala / Office of the Admission Supervisory Committee / Fee Regulatory Committee and as approved or modified by the competent authorities. The prevailing rate of fee for each course also has been furnished in this Prospectus under a separate table.'
]

const wordArray2 = [
    'Should have passed the Higher Secondary examination conducted by the Board of Higher Secondary Education, Kerala, or an examination equivalent thereto as approved by Kerala University of Health Sciences (KUHS), Thrissur. Should have separate minimum pass marks for Physics, Chemistry and Biology and 50% marks in Physics, Chemistry and Biology put together.',
    'The Vocational Higher Secondary Examination, Kerala, has been recognized as equivalent to the Higher Secondary Examination, Kerala.'
]

const wordArray3 = [
    'Candidate shall visit the official website www.tmc.ac.in and click the link “Apply Online”.',
    'There will be four stages for the submission of the application form and all stages are mandatory.',
    'Candidates shall complete all the stages of submission as per the time schedule which will be notified through the website/media.',
    'Stage 1  Enter the candidate details online and fill out the application form.',
    'Stage 2  Candidates should upload their recent photograph, signature, SSLC & Plus two certificates. Certificates should be self-attested by the candidates.',
    'Stage 3  Make payment for the application online.',
    'Stage 4  On completion & submission of the application; please download/print the application/acknowledgement form for future reference.'
]

const wordArray4 = [
    'Copies of the Prospectus can be downloaded from the college website www.tmc.ac.in. at free of cost. Copies of the same will also be available at the Administrative Office of Travancore College of Allied Health Sciences (TCAHS), Kollam for reference and return.'
]


const AdmissionProcedure = () => {

    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);

    const handleClickRegister = () => {
        setOpen(true)
        setTimeout(() => {
            navigate("/CandidateHome/Registration")
            setOpen(false)
        }, 1000);
    }

    return (
        <Box className='flex flex-1 p-5 flex-col justify-items-center px-[15%]' >
            <CustBackDropWithState open={open} handleClose={setOpen} />
            <Box className="flex flex-row items-center justify-items-center " >
                <Typography level="h2" component="div" className='py-6 flex flex-grow' >
                    Admission Procedure
                </Typography>
                <Box
                    className="flex border-b-4 border-[#7c51a1] mx-3 cursor-pointer"
                    onClick={() => window.open('https://collegeofalliedhealth.travancoremedicity.com/wp-content/uploads/2024/06/TCAHS-Prospectus-2024-2025.pdf', '_blank')}
                >
                    Prospectus
                </Box>
                <Box
                    className="flex border-b-4 border-[#7c51a1] mx-3 cursor-pointer"
                    onClick={handleClickRegister}
                >
                    Registration
                </Box>
            </Box >
            <Typography level="h4" component="div" >
                Points to note
            </Typography>
            <Box className="flex flex-col p-8 gap-2" >
                {
                    wordArray.map((item, index) => (
                        <Customtypo key={index} words={item} />
                    ))
                }
            </Box>
            <Typography level="h4" component="div" >
                Eligibility for Admission
            </Typography>
            <Box className="flex flex-col p-8 gap-2" >
                {
                    wordArray2.map((item, index) => (
                        <Customtypo key={index} words={item} />
                    ))
                }
            </Box>
            <Typography level="h4" component="div" >
                How to apply for courses
            </Typography>
            <Box className="flex flex-col p-8 gap-2" >
                {
                    wordArray3.map((item, index) => (
                        <Customtypo key={index} words={item} />
                    ))
                }
            </Box>
            <Typography level="h4" component="div" >
                Availability of Prospectus
            </Typography>
            <Box className="flex flex-col p-8 gap-2" >
                {
                    wordArray4.map((item, index) => (
                        <Customtypo key={index} words={item} />
                    ))
                }
            </Box>
        </Box >
    )
}

export default memo(AdmissionProcedure)