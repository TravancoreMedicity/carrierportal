import { Box, Button, Modal, ModalClose, Typography } from '@mui/joy'
import React, { memo, useCallback, useMemo, } from 'react'
import InputComponent from '../../../Muicomponents/InputComponent'
import moment from 'moment';
import JoyCheckbox from '../../../Muicomponents/JoyCheckbox';
import { warningNofity } from '../../../CommonCode/CommonFunc';


const ExperienceModal = ({ setIsModalOpen, isModalOpen, Regionexp, setRegionexp, expdata, expdataset, experience, setexprience }) => {
    const { Employer, expstartdate, expenddate,
        Workingstatus, Responsibilities, jobexp, SupervisorName, Additionalinf, Other } = experience;


    const defaultState = useMemo(() => {
        return {
            Employer: '',
            expstartdate: moment(new Date()).format('YYYY-MM-DD'), expenddate: moment(new Date()).format('YYYY-MM-DD'),
            Workingstatus: false, Responsibilities: '', jobexp: "", SupervisorName: '', Additionalinf: '', Other: ""
        }
    }, [])


    const updateBoard = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setexprience({ ...experience, [e.target.name]: value })
    }, [experience, setexprience]);

    //adding  exp
    const addexpData = useCallback(() => {
        if (Employer === '') {
            warningNofity("Enter Company Name")
        } else if (jobexp === "") {
            warningNofity("Enter Job Title")
        } else {
            const newdata = {
                id: Math.ceil(Math.random() * 1000),
                Employer: Employer,
                expstartdate: expstartdate,
                expenddate: expenddate,
                Workingstatus: Workingstatus,
                Responsibilities: Responsibilities,
                jobexp: jobexp,
                SupervisorName: SupervisorName,
                Additionalinf: Additionalinf,
                Other: Other,
                Regionexp: Regionexp
            }
            const newdatas = [...expdata, newdata]
            expdataset(newdatas)
            setexprience(defaultState)
            setRegionexp(0)

        }

    }, [defaultState, Employer, expstartdate, expenddate, Workingstatus, Responsibilities, jobexp, SupervisorName, Additionalinf,
        Other, Regionexp, expdataset, setexprience, setRegionexp, expdata])

    const Datasave = useCallback(() => {
        if (Employer === '') {
            warningNofity("Enter Company Name")
        } else if (jobexp === "") {
            warningNofity("Enter Job Title")
        } else {
            const newdata = {
                id: Math.ceil(Math.random() * 1000),
                Employer: Employer,
                expstartdate: expstartdate,
                expenddate: expenddate,
                Workingstatus: Workingstatus,
                Responsibilities: Responsibilities,
                jobexp: jobexp,
                SupervisorName: SupervisorName,
                Additionalinf: Additionalinf,
                Other: Other,
                Regionexp: Regionexp
            }
            const newdatas = [...expdata, newdata]
            expdataset(newdatas)
            setexprience(defaultState)
            setRegionexp(0)
            setIsModalOpen(false)
        }

    }, [defaultState, Employer, expstartdate, expenddate, Workingstatus, Responsibilities, jobexp, SupervisorName, Additionalinf,
        Other, Regionexp, expdataset, setexprience, setRegionexp, setIsModalOpen, expdata])
    return (
        <Box>
            <Modal variant="plain" open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "30%",
                        '@media screen and (max-width: 768px)': {
                            width: "80%",
                        },
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 10,

                    }}
                ><ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 0px 0px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Typography level='body-lg'>Add your Experience Information</Typography>

                    <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>

                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Company Name / Institution Name
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={Employer}
                                name="Employer"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Job Title
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={jobexp}
                                name="jobexp"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Start Date
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="date"
                                value={expstartdate}
                                name="expstartdate"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>End Date
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="date"
                                value={expenddate}
                                name="expenddate"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <JoyCheckbox
                                label='Currently Working'
                                name="Workingstatus"
                                checked={Workingstatus}
                                onchange={(e) => updateBoard(e)}
                            />
                        </Box>


                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Responsibilities
                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={Responsibilities}
                                name="Responsibilities"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Supervisor Name

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={SupervisorName}
                                name="SupervisorName"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Additional Information

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={Additionalinf}
                                name="Additionalinf"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Supervisor Condact Number

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <InputComponent
                                // variant="plain"
                                type="Number"
                                value={Other}
                                name='Other'
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>


                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button sx={{
                            p: 0, width: "15%", '@media screen and (max-width: 768px)': {
                                width: "40%",
                            },
                        }} size='sm' variant="outlined" color="success" onClick={addexpData}
                        >
                            Add more
                        </Button>
                        <Button sx={{
                            p: 0, width: "15%", '@media screen and (max-width: 768px)': {
                                width: "40%",
                            },
                        }} size='sm' variant="outlined" color="primary" onClick={Datasave}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>


        </Box>
    )
}

export default memo(ExperienceModal)