import { Box, IconButton, Modal, ModalClose, ModalDialog, Table, Typography, } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import InputComponent from '../../../Muicomponents/InputComponent'
import { succesNofity, warningNofity } from '../../../CommonCode/CommonFunc';
import axioslogin from '../../../../Axios/Axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


const SkillModal = ({ setCareerModalOpenSkill, isModalOpenskill, ApplicationId, setcount, count }) => {
    const [skills, setSkills] = useState('')
    const [tableData, setTableData] = useState([])
    const [value, setvalue] = useState(0)

    const [slno, setSlno] = useState(0)
    const [countdata, setCountdata] = useState(0)

    const postdata = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
            skills: skills

        }
    }, [ApplicationId, skills])
    const checkData = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
        }
    }, [ApplicationId])

    const updatedata = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
            skills: skills,
            slno: slno
        }
    }, [ApplicationId, skills, slno])

    useEffect(() => {

        const getJobSkills = async (checkData) => {
            const result = await axioslogin.post('/career/skills/get', checkData)
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
        setSkills(item?.skills_desc)
        setSlno(item?.skill_slNo)
    }, [])

    const DeleteItem = useCallback(async (item) => {
        const result = await axioslogin.delete(`/career/skills/delete/${item?.skill_slNo}`)
        const { success, message } = result.data
        if (success === 1) {
            setCountdata(countdata + 1)
            setcount(count + 1)
            succesNofity(message)
            setCareerModalOpenSkill(false)
        } else {
            warningNofity(message)
        }
    }, [countdata, count])

    const SubmitFormData = useCallback(async (event) => {
        if (skills === "") {
            warningNofity("Skill Field Is Empty")
        } else {
            if (value === 1) {
                const result = await axioslogin.post('/career/Updateskilldata', updatedata)
                const { success, message } = result.data
                if (success === 2) {
                    succesNofity(message)
                    setSkills('')
                    setcount(count + 1)

                    setvalue(0)
                    setCareerModalOpenSkill(false)
                    setCountdata(countdata + 1)
                } else {
                    warningNofity(message)
                }
            } else {
                const result = await axioslogin.post('/career/insertskilldata', postdata)
                const { success, message } = result.data
                if (success === 2) {
                    succesNofity(message)
                    setSkills('')
                    setcount(count + 1)

                    setCareerModalOpenSkill(false)

                    setCountdata(countdata + 1)
                } else {
                    warningNofity(message)
                }
            }
        }



    }, [postdata, countdata, count])
    const onClose = useCallback((e) => {
        setCareerModalOpenSkill(false)
    }, [isModalOpenskill])

    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={isModalOpenskill}
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
                    <Box>
                        <Box

                            sx={{

                                borderRadius: 'md',
                                // boxShadow: 'lg',
                                marginTop: 2,
                                '@media screen and (max-width: 768px)': {
                                    padding: 1,
                                },
                            }}>
                            <Typography level="body-md" sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', }}>Add Your Skills</Typography>

                            <Box sx={{ display: "flex", alignItems: "center", pb: 0.5 }} >
                                <Box sx={{ flex: 1, pr: 1 }}>
                                    <InputComponent
                                        // variant="plain"
                                        type="text"
                                        value={skills}
                                        name="skills"
                                        onchange={(e) => setSkills(e.target.value)}
                                        size="md"
                                    />

                                </Box>
                                <Box sx={{ flex: 0, px: 0.5 }} >
                                    <IconButton variant="outlined" size='sm' onClick={SubmitFormData} color='primary'>
                                        <AddIcon sx={{ color: "#555555" }} />
                                    </IconButton>
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
                                            <th >Sl no</th>
                                            <th style={{ width: '40%' }}>Skills</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData?.map((item, index) => {

                                            const slNo = index + 1;
                                            return (
                                                <tr key={index}>
                                                    <td>{slNo}</td>
                                                    <td>{item?.skills_desc === null ? "not updated" : item?.skills_desc}</td>
                                                    <td>
                                                        <IconButton sx={{}} size='small' color='primary' onClick={() => EditData(item)}>
                                                            <EditIcon sx={{ color: "#555555" }} />
                                                        </IconButton>
                                                    </td>
                                                    <td>
                                                        <IconButton sx={{}} size='small' color='primary' onClick={() => DeleteItem(item)}>
                                                            <DeleteIcon sx={{ color: "#555555" }} />
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

export default memo(SkillModal)