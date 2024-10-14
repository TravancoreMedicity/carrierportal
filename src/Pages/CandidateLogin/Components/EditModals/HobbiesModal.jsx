import { Box, IconButton, Modal, ModalClose, ModalDialog, Table, Tooltip, Typography, } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import InputComponent from '../../../Muicomponents/InputComponent'
import { succesNofity, warningNofity } from '../../../CommonCode/CommonFunc';
import axioslogin from '../../../../Axios/Axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
const HobbiesModal = ({ setCareerModalOpenHobbies, isModalOpenHobbies, ApplicationId, count, setcount, }) => {

    const [Hobbies, setHobbies] = useState('')
    const [tableData, setTableData] = useState([])
    const [value, setvalue] = useState(0)
    const [countdata, setCountdata] = useState(0)
    const [slno, setSlno] = useState(0)

    const postdata = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
            Hobbies: Hobbies

        }
    }, [ApplicationId, Hobbies])
    const checkData = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
        }
    }, [ApplicationId])

    const updatedata = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
            Hobbies: Hobbies,
            slno: slno
        }
    }, [ApplicationId, Hobbies, slno])

    useEffect(() => {
        const getJobSkills = async (checkData) => {
            const result = await axioslogin.post('/career/Hobbies/get', checkData)
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

    const EditData = useCallback((item) => {
        setvalue(1)
        setHobbies(item?.hobbies)
        setSlno(item?.hobbies_slno)
    }, [])

    const DeleteItem = useCallback(async (item) => {
        const result = await axioslogin.delete(`/career/Hobbies/delete/${item?.hobbies_slno}`)
        const { success, message } = result.data
        if (success === 1) {
            setCountdata(countdata + 1)
            setcount(count + 1)
            succesNofity(message)
            setCareerModalOpenHobbies(false)

        } else {
            warningNofity(message)
        }
    }, [countdata, count])


    const SubmitFormData = useCallback(async (event) => {
        if (Hobbies === "") {
            warningNofity("Please Enter Hobbies")
        } else {
            if (value === 1) {
                const result = await axioslogin.post('/career/UpdateHobbiesdata', updatedata)
                const { success, message } = result.data
                if (success === 2) {
                    succesNofity(message)
                    setHobbies('')
                    setvalue(0)
                    setCountdata(countdata + 1)
                    setcount(count + 1)
                    setCareerModalOpenHobbies(false)


                } else {
                    warningNofity(message)
                }
            } else {
                const result = await axioslogin.post('/career/insertHobbiesdata', postdata)
                const { success, message } = result.data
                if (success === 2) {
                    succesNofity(message)
                    setHobbies('')
                    setCountdata(countdata + 1)
                    setcount(count + 1)
                    setCareerModalOpenHobbies(false)


                } else {
                    warningNofity(message)
                }
            }
        }
    }, [postdata, countdata, count])
    const onClose = useCallback((e) => {
        setCareerModalOpenHobbies(false)
    }, [setCareerModalOpenHobbies])


    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={isModalOpenHobbies}
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
                            variant="outlined"
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
                            <Typography level="body-md" sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', }}>Add Your Hobbies</Typography>
                            <Box sx={{ mt: 2 }}>
                                <Typography sx={{ mt: 1, fontFamily: "Bahnschrift", color: '#555555', fontSize: { xs: 15 }, fontWeight: 500, opacity: 0.6, }}>Hobbies
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", pb: 0.5 }} >
                                <Box sx={{ flex: 1, pr: 1 }}>
                                    <InputComponent
                                        // variant="plain"
                                        type="text"
                                        value={Hobbies}
                                        name="Hobbies"
                                        onchange={(e) => setHobbies(e.target.value)}
                                        size="md"
                                        style={{
                                            width: '100%',
                                            '--Input-focusedThickness': '0.02rem',
                                            '--Input-focusedHighlight': '#6e7782',
                                        }}
                                    />

                                </Box>
                                <Box sx={{ flex: 0, px: 0.5 }} >
                                    <Tooltip title="Add your Hobbies" sx={{ minWidth: 150, textAlign: 'center', bgcolor: '#8a8a8a' }} arrow>
                                        <IconButton variant="outlined" size='sm' onClick={SubmitFormData} sx={{ p: .5 }}>
                                            <AddCircleOutlineIcon sx={{ color: "#555555" }} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>

                            <Box sx={{ mt: 1 }}>
                                <Table aria-label="basic table" size="sm" sx={{
                                    "--Table-headerUnderlineThickness": "1px",
                                    "--TableCell-height": "0px",
                                    "--TableCell-paddingX": "-11px"
                                }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '10%' }} >Sl no</th>
                                            <th style={{ width: '40%' }}>Hobbies</th>
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
                                                    <td style={{ wordBreak: 'break-word' }}>{item?.hobbies === null ? "not updated" : item?.hobbies}</td>
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

export default memo(HobbiesModal)