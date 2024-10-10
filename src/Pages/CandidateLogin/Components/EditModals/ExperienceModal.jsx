
import { Box, Button, IconButton, Modal, ModalClose, ModalDialog, Table, Tooltip, Typography, } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
// import InputComponent from '../../../Muicomponents/InputComponent';
import InputComponent from '../../../Muicomponents/InputComponent'
import { succesNofity, warningNofity } from '../../../CommonCode/CommonFunc';
import axioslogin from '../../../../Axios/Axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import JoyCheckbox from '../../../Muicomponents/JoyCheckbox';


const ExperienceModal = ({ setCareerModalOpenexp, isModalOpenexp, ApplicationId, setcount, count, personalData }) => {

    const [value, setvalue] = useState(0)
    const [Selectedid, setidSelected] = useState(0)
    const [experience, setexprience] = useState({
        Employer: "", expstartdate: moment(new Date()).format('YYYY-MM-DD'), expenddate: moment(new Date()).format('YYYY-MM-DD'),
        Workingstatus: false, Responsibilities: "", jobexp: "", SupervisorName: '', Additionalinf: '', Other: '', idexp: Math.ceil(Math.random() * 1000),
    });


    const { Employer, expstartdate, expenddate,
        Workingstatus, Responsibilities, jobexp, SupervisorName, Additionalinf, Other } = experience;


    const updateBoard = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setexprience({ ...experience, [e.target.name]: value })

    }, [experience, setexprience]);


    const onClose = useCallback((e) => {
        setCareerModalOpenexp(false)
    }, [setCareerModalOpenexp])


    const postdata = useMemo(() => {
        return {
            experience: experience,
            ApplicationId: ApplicationId,
        }
    }, [ApplicationId, experience])

    const Updatepostdata = useMemo(() => {
        return {
            experience: experience,
            ApplicationId: ApplicationId,
            Applicationslno: personalData?.application_slno,
            id: Selectedid
        }
    }, [personalData, experience, Selectedid, ApplicationId])

    const Datasave = useCallback(async () => {
        if (value === 0) {
            if (Employer === '') {
                warningNofity("Enter Company Name");
            } else if (jobexp === "") {
                warningNofity("Enter Job Title");
            } else {
                const result = await axioslogin.post('/common/insertdataexpdata', postdata);
                const { success, message } = result.data;

                if (success === 2) {
                    succesNofity(message);
                    setcount(count + 1)
                    // expdataset(newExpdata);
                    setCareerModalOpenexp(false)
                    // Optionally, reset the experience state if you want to clear the form
                    setexprience({
                        Employer: "",
                        expstartdate: moment(new Date()).format('YYYY-MM-DD'),
                        expenddate: moment(new Date()).format('YYYY-MM-DD'),
                        Workingstatus: false,
                        Responsibilities: "",
                        jobexp: "",
                        SupervisorName: '',
                        Additionalinf: '',
                        Other: '',
                        idexp: Math.ceil(Math.random() * 1000),
                    });
                }
            }
        } else {
            if (Employer === '') {
                warningNofity("Enter Company Name");
            } else if (jobexp === "") {
                warningNofity("Enter Job Title");
            } else {
                const result = await axioslogin.post('/common/updataexpdata', Updatepostdata);
                const { success, message } = result.data;

                if (success === 2) {
                    succesNofity(message);
                    setcount(count + 1)
                    setvalue(0)
                    // expdataset(newExpdata);
                    setCareerModalOpenexp(false)
                    // Optionally, reset the experience state if you want to clear the form
                    setexprience({
                        Employer: "",
                        expstartdate: moment(new Date()).format('YYYY-MM-DD'),
                        expenddate: moment(new Date()).format('YYYY-MM-DD'),
                        Workingstatus: false,
                        Responsibilities: "",
                        jobexp: "",
                        SupervisorName: '',
                        Additionalinf: '',
                        Other: '',
                        idexp: Math.ceil(Math.random() * 1000),
                    });
                } else {
                    warningNofity(message);

                }
            }
        }
    }, [ApplicationId, experience, Employer, expstartdate, expenddate, Workingstatus, jobexp, Additionalinf, Other, count, setcount]);


    const EditData = useCallback((item) => {

        setexprience({
            Employer: item.Employer || "",
            expstartdate: item.expstartdate || moment(new Date()).format('YYYY-MM-DD'),
            expenddate: item.expenddate || moment(new Date()).format('YYYY-MM-DD'),
            Workingstatus: item.Workingstatus || false,
            Responsibilities: item.Responsibilities || "",
            jobexp: item.jobexp || "",
            SupervisorName: item.SupervisorName || '',
            Additionalinf: item.Additionalinf || '',
            Other: item.Other || '',
            // idexp: item.idexp || Math.ceil(Math.random() * 1000),
        });
        setidSelected(item.idexp)
        setvalue(1)
    }, []);


    const DeleteData = useCallback(async (item) => {

        const Deletepostdata = {
            ApplicationId: ApplicationId,
            Applicationslno: personalData?.application_slno,
            id: item?.idexp
        };

        const result = await axioslogin.post('/common/deleteexpdata', Deletepostdata);
        const { success, message } = result.data;
        if (success === 2) {
            succesNofity(message);
            setCareerModalOpenexp(false)
            setcount(count + 1)
            setvalue(0)
            // Optionally, reset the experience state if you want to clear the form
            setexprience({
                Employer: "",
                expstartdate: moment(new Date()).format('YYYY-MM-DD'),
                expenddate: moment(new Date()).format('YYYY-MM-DD'),
                Workingstatus: false,
                Responsibilities: "",
                jobexp: "",
                SupervisorName: '',
                Additionalinf: '',
                Other: '',
                idexp: Math.ceil(Math.random() * 1000),
            });
        } else {
            warningNofity(message);
        }

    }, [setCareerModalOpenexp]);

    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={isModalOpenexp}
                onClose={onClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog size='sm' sx={{
                    width: '50%', backgroundColor: '#FFFBF5',
                    '@media screen and (max-width: 768px)': {
                        width: '100%',

                    },
                }}>
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Box sx={{ p: 1 }}>

                        <Typography sx={{ fontFamily: "Bahnschrift", color: '#555555', }}>Add your Experience Information</Typography>

                        <Box sx={{ height: window.innerHeight - 350, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>

                            <Box sx={{}}>
                                <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>Company Name / Institution Name
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
                                <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>Job Title
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
                                <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>Start Date
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
                                <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>End Date
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
                                <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>Responsibilities
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
                                <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>Supervisor Name

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
                                <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>Additional Information

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
                                <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", color: '#555555', }}>Supervisor Condact Number

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



                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>

                                <Button sx={{
                                    color: '#555555',
                                    p: 0, width: "15%", '@media screen and (max-width: 768px)': {
                                        width: "40%",
                                    },
                                }} size='sm' variant="outlined"
                                    onClick={Datasave}
                                >
                                    Save
                                </Button>
                            </Box>

                            <Box sx={{ mt: 1 }}>
                                <Table aria-label="basic table" size="sm" sx={{
                                    "--Table-headerUnderlineThickness": "1px",
                                    "--TableCell-height": "0px",
                                    "--TableCell-paddingX": "-11px"
                                }}>
                                    <thead>
                                        <tr>
                                            <th>Sl no</th>
                                            <th style={{}}>Company Name</th>
                                            <th style={{}}>Job Title</th>
                                            <th style={{}}>Supervisor Name</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {personalData?.Experience_details && personalData.Experience_details.length > 0 ? (
                                            personalData.Experience_details.map((exp, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td style={{ wordBreak: 'break-word' }}>
                                                        {exp?.Employer === null ? "not updated" : exp?.Employer}
                                                    </td>
                                                    <td style={{ wordBreak: 'break-word' }}>
                                                        {exp?.jobexp === null ? "not updated" : exp?.jobexp}
                                                    </td>
                                                    <td style={{ wordBreak: 'break-word' }}>
                                                        {exp?.SupervisorName === null ? "not updated" : exp?.SupervisorName}
                                                    </td>
                                                    <td>
                                                        <IconButton size='small' color='primary'>
                                                            <EditIcon sx={{ color: "#555555" }} onClick={() => EditData(exp)} />
                                                        </IconButton>
                                                    </td>
                                                    <td>
                                                        <IconButton size='small' color='primary'>
                                                            <DeleteIcon sx={{ color: "#555555" }} onClick={() => DeleteData(exp)} />
                                                        </IconButton>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} style={{ textAlign: 'center' }}>
                                                    No experience details available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Box>

                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box >
    )
}

export default memo(ExperienceModal)