import { Box, IconButton, Modal, ModalClose, ModalDialog, Table, Tooltip, Typography, } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import InputComponent from '../../../Muicomponents/InputComponent'
import axioslogin from '../../../../Axios/Axios';
import { succesNofity, warningNofity } from '../../../CommonCode/CommonFunc';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useSpring, animated } from '@react-spring/web';
import { Backdrop } from '@mui/material';


const Fade = React.forwardRef((props, ref) => {
    const { in: open, children, ownerState, ...other } = props
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});
const ReferenceModal = ({ isModalOpenReference, setCareerModalOpenReference, ApplicationId, count, setcount, }) => {
    const [Name, SetName] = useState("")
    const [Designation, SetDesignation] = useState("")
    const [number, SetNumber] = useState('')
    const [mail, Setmail] = useState("")
    const [tableData, setTableData] = useState([])
    // const [count, setCount] = useState(0)
    const [value, setvalue] = useState(0)
    const [slno, setSlno] = useState(0)
    const [countdata, setCountdata] = useState(0)


    const checkData = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
        }
    }, [ApplicationId])
    useEffect(() => {

        const getJobSkills = async (checkData) => {
            const result = await axioslogin.post('/career/reference/get', checkData)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setCountdata(0)
            }
            else {
                setTableData([])
            }
        }
        getJobSkills(checkData)

    }, [countdata, checkData])


    const postdata = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
            name: Name,
            number: number,
            Designation: Designation,
            mail: mail,
            slno: slno

        }
    }, [ApplicationId, mail, Designation, number, Name, slno])

    const SubmitFormData = useCallback(async (event) => {
        if (Name === "") {
            warningNofity("Please enter the name")
        }
        else if (number === "") {
            warningNofity("Please enter the number")
        } else {
            if (value === 1) {
                const result = await axioslogin.post('/career/UpdateReference', postdata)
                const { success, message } = result.data
                if (success === 2) {
                    succesNofity(message)
                    SetName("")
                    SetDesignation("")
                    SetNumber("")
                    Setmail("")
                    setvalue(0)
                    setCountdata(countdata + 1)
                    setcount(count + 1)
                    setCareerModalOpenReference(false)

                }
                else {
                    warningNofity(message)
                }

            } else {
                const result = await axioslogin.post('/career/InsertReference', postdata)
                const { success, message } = result.data
                if (success === 2) {
                    succesNofity(message)
                    SetName("")
                    SetDesignation("")
                    SetNumber("")
                    Setmail("")
                    setCountdata(countdata + 1)
                    setcount(count + 1)
                    setCareerModalOpenReference(false)

                }
                else {
                    warningNofity(message)
                }

            }
        }
    }, [postdata, count, countdata])

    const EditData = useCallback((item) => {
        setvalue(1)
        SetName(item?.name)
        setSlno(item?.reference_slno)
        Setmail(item?.mail_id)
        SetNumber(item?.number)
        SetDesignation(item?.designation)
    }, [])

    const DeleteItem = useCallback(async (item) => {
        const result = await axioslogin.delete(`/career/Reference/delete/${item?.reference_slno}`)
        const { success, message } = result.data
        if (success === 1) {
            setCountdata(countdata + 1)
            setcount(count + 1)
            setCareerModalOpenReference(false)

            succesNofity(message)
        } else {
            warningNofity(message)
        }
    }, [countdata, count])
    const onClose = useCallback((e) => {
        setCareerModalOpenReference(false)
    }, [setCareerModalOpenReference])
    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={isModalOpenReference}
                onClose={onClose}
                // closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
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
                    <Box>
                        <Box

                            sx={{
                                p: 1,
                                height: window.innerHeight - 250, overflowX: "auto", '::-webkit-scrollbar': { display: "none" },
                                borderRadius: 'md',
                                // boxShadow: 'lg',
                                // marginTop: 2,
                                '@media screen and (max-width: 768px)': {
                                    padding: 1,
                                },
                            }}>
                            <Box>
                                <Typography level="body-md" sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', }}>Referance Details</Typography>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography sx={{ mt: 1, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>Name
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1, pr: 1, mt: 1 }}>
                                <InputComponent
                                    // variant="plain"
                                    // placeholder={"Name"}
                                    type="text"
                                    value={Name}
                                    name="Name"
                                    onchange={(e) => SetName(e.target.value)}
                                    size="md"
                                    style={{
                                        width: '100%',
                                        '--Input-focusedThickness': '0.02rem',
                                        '--Input-focusedHighlight': '#6e7782',
                                    }}
                                />

                            </Box>
                            <Box sx={{}}>
                                <Typography sx={{ mt: 1, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>Designation
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1, pr: 1, mt: 1 }}>
                                <InputComponent
                                    // variant="plain"
                                    // placeholder={"Designation"}
                                    type="text"
                                    value={Designation}
                                    name="Designation"
                                    onchange={(e) => SetDesignation(e.target.value)}
                                    size="md"
                                    style={{
                                        width: '100%',
                                        '--Input-focusedThickness': '0.02rem',
                                        '--Input-focusedHighlight': '#6e7782',
                                    }}
                                />

                            </Box>
                            <Box sx={{}}>
                                <Typography sx={{ mt: 1, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>Condact number
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1, pr: 1, mt: 1 }}>
                                <InputComponent
                                    // variant="plain"
                                    // placeholder={"Condact number"}
                                    type='number'
                                    value={number}
                                    name="number"
                                    onchange={(e) => SetNumber(e.target.value)}
                                    size="md"
                                    style={{
                                        width: '100%',
                                        '--Input-focusedThickness': '0.02rem',
                                        '--Input-focusedHighlight': '#6e7782',
                                    }}
                                />

                            </Box>
                            <Box sx={{}}>
                                <Typography sx={{ mt: 1, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>Mail Id
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1, pr: 1, mt: 1 }}>
                                <InputComponent
                                    // variant="plain"
                                    // placeholder={"Mail Id"}
                                    type="text"
                                    value={mail}
                                    name="mail"
                                    onchange={(e) => Setmail(e.target.value)}
                                    size="md"
                                    style={{
                                        width: '100%',
                                        '--Input-focusedThickness': '0.02rem',
                                        '--Input-focusedHighlight': '#6e7782',
                                    }}
                                />

                            </Box>
                            <Box sx={{ flex: 0, px: 0.5, display: 'flex', justifyContent: 'end', mt: 1 }} >
                                <Tooltip title="Add your Referance Details" sx={{ minWidth: 150, textAlign: 'center', bgcolor: '#8a8a8a' }} arrow>
                                    <IconButton variant="outlined" size='sm' onClick={SubmitFormData} sx={{ p: .5 }}>
                                        <AddCircleOutlineIcon sx={{ color: "#555555" }} />
                                    </IconButton>
                                </Tooltip>

                            </Box>


                            <Box sx={{ mt: 2 }}>
                                <Table aria-label="basic table" size="sm" sx={{
                                    "--Table-headerUnderlineThickness": "1px",
                                    "--TableCell-height": "0px",
                                    "--TableCell-paddingX": "-11px"
                                }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '10%' }}>Sl no</th>
                                            <th >Name</th>
                                            <th>Designation</th>
                                            <th>Number</th>
                                            <th>Mail</th>
                                            <th style={{ width: 30, }}></th>
                                            <th style={{ width: 30, }}></th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {tableData?.map((item, index) => {

                                            const slNo = index + 1;
                                            return (
                                                <tr key={index}>
                                                    <td>{slNo}</td>
                                                    <td>{item?.name === null ? "not updated" : item?.name}</td>
                                                    <td> <Typography sx={{ wordBreak: 'break-word', }}>{item?.designation === null ? "not updated" : item?.designation}</Typography></td>
                                                    <td> <Typography sx={{ wordBreak: 'break-word', }}>{item?.number === null ? "not updated" : item?.number}</Typography></td>
                                                    <td><Typography sx={{ wordBreak: 'break-word', }}>{item?.mail_id === null ? "not updated" : item?.mail_id}</Typography></td>

                                                    <td>
                                                        <IconButton sx={{}} size='small' color='primary' onClick={() => EditData(item)}>
                                                            <Tooltip title="Edit" sx={{ minWidth: 150, textAlign: 'center', bgcolor: '#8a8a8a' }} arrow>

                                                                <EditIcon sx={{ color: "#555555" }} />
                                                            </Tooltip>

                                                        </IconButton>
                                                    </td>
                                                    <td>
                                                        <IconButton sx={{}} size='small' color='primary' onClick={() => DeleteItem(item)}>
                                                            <Tooltip title="Delete" sx={{ minWidth: 150, textAlign: 'center', bgcolor: '#8a8a8a' }} arrow>

                                                                <DeleteIcon sx={{ color: "#555555" }} />
                                                            </Tooltip>

                                                        </IconButton>
                                                    </td>
                                                </tr>
                                            );
                                        })}
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

export default memo(ReferenceModal)