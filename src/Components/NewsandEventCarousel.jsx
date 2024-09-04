import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: 'Admission Procedure',
        imgPath: [
            'Government seats will be filled by LBS Centre, the government-approved agency by inviting applications from eligible candidates based on the Merit List prepared and observing all prevailing rules relating to communal reservation of seats.',
            'Management Seats will be filled up by the College by inviting online applications from eligible candidates based on the Merit/ Rank List prepared. Candidates with higher ranks will be given priority in the allotment of seats. A separate Rank List will be prepared for each of the Courses. There will be no reservation of seats for SEBC and or SC/ST candidates under Management quota.',
            'Applications for Management Seats can be submitted online through the college website www.travancoremedicity.com.along with an application fee of Rs.500/-.',
            'A candidate needs to submit only one application form for applying for any or all three Courses by remitting a total fee of Rs 500/- only.',
            'Application fee once remitted will not be refunded under any circumstances.',
            'All the candidates admitted shall pay the fees fixed by the Government of Kerala / Office of the Admission Supervisory Committee / Fee Regulatory Committee and as approved or modified by the competent authorities. The prevailing rate of fee for each course also has been furnished in this Prospectus under a separate table.'
        ]
    },
    {
        label: 'Eligibility Criteria',
        imgPath: [
            'Should have passed the Higher Secondary examination conducted by the Board of Higher Secondary Education, Kerala, or an examination equivalent thereto as approved by Kerala University of Health Sciences (KUHS), Thrissur. Should have separate minimum pass marks for Physics, Chemistry and Biology and 50% marks in Physics, Chemistry and Biology put together.',
            'The Vocational Higher Secondary Examination, Kerala, has been recognized as equivalent to the Higher Secondary Examination, Kerala.'
        ]
    },
    {
        label: 'How to Apply for Courses',
        imgPath: [
            'Candidate shall visit the official website www.travancoremedicity.com and click the link “Apply Online”.',
            'There will be four stages for the submission of the application form and all stages are mandatory.',
            'Candidates shall complete all the stages of submission as per the time schedule which will be notified through the website/media.',
            'Stage 1  Enter the candidate details online and fill out the application form.',
            'Stage 2  Candidates should upload their recent photograph, signature, SSLC & Plus two certificates. Certificates should be self-attested by the candidates.',
            'Stage 3  Make payment for the application online.',
            'Stage 4  On completion & submission of the application; please download/print the application/acknowledgement form for future reference.'
        ]
    }
];


const NewsandEventCarousel = () => {

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };


    return (
        <Box sx={{
            // maxWidth: 400,
            flexGrow: 1
        }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
                <Typography variant='h6' >{images[activeStep].label}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                style={{ backgroundColor: 'Background' }}
            >
                {images.map((step, index) => (
                    <div key={step.label} className='px-10' >
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                // component="img"
                                sx={{
                                    height: 400,
                                    bgcolor: 'Background.default',
                                    display: 'block',
                                    // maxWidth: 400,
                                    overflow: 'auto',
                                    width: '100%',
                                }}
                            // src={step.imgPath}
                            // alt={step.label}
                            >
                                {
                                    step.imgPath.map((i, index) => (
                                        <Typography key={index} sx={{ mt: 2, }}>
                                            {i}
                                        </Typography>
                                    ))
                                }
                            </Box>
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    )
}

export default NewsandEventCarousel