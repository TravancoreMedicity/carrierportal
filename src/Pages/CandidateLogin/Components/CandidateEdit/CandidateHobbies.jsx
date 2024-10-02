import { Box, IconButton, Table, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import InputComponent from '../../../Muicomponents/InputComponent'
import { succesNofity, warningNofity } from '../../../CommonCode/CommonFunc';
import axioslogin from '../../../../Axios/Axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Paper } from '@mui/material';

const CandidateHobbies = ({ ApplicationId }) => {
    const [Hobbies, setHobbies] = useState('')
    const [tableData, setTableData] = useState([])
    const [value, setvalue] = useState(0)
    const [count, setCount] = useState(0)
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
                setCount(0)
            }
            else {
                setTableData([])
            }
        }
        getJobSkills(checkData)

    }, [count, checkData])

    const EditData = useCallback((item) => {
        setvalue(1)
        setHobbies(item?.hobbies)
        setSlno(item?.hobbies_slno)
    }, [])

    const DeleteItem = useCallback(async (item) => {
        const result = await axioslogin.delete(`/career/Hobbies/delete/${item?.hobbies_slno}`)
        const { success, message } = result.data
        if (success === 1) {
            setCount(count + 1)
            succesNofity(message)

        } else {
            warningNofity(message)
        }
    }, [count])


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
                    setCount(count + 1)
                } else {
                    warningNofity(message)
                }
            } else {
                const result = await axioslogin.post('/career/insertHobbiesdata', postdata)
                const { success, message } = result.data
                if (success === 2) {
                    succesNofity(message)
                    setHobbies('')
                    setCount(count + 1)
                } else {
                    warningNofity(message)
                }
            }
        }
    }, [postdata, count])
    return (
        <Box
            variant="outlined"
            sx={{
                height: window.innerHeight - 400,
                padding: 4,
                overflowX: 'scroll',
                borderRadius: 'md',
                // boxShadow: 'lg',
                marginTop: 2,

                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },
            }}>
            <Typography level="body-md">Add Your Hobbies</Typography>

            <Box sx={{ display: "flex", alignItems: "center", pb: 0.5 }} >
                <Box sx={{ flex: 1, pr: 1 }}>
                    <InputComponent
                        // variant="plain"
                        type="text"
                        value={Hobbies}
                        name="Hobbies"
                        onchange={(e) => setHobbies(e.target.value)}
                        size="md"
                    />

                </Box>
                <Box sx={{ flex: 0, px: 0.5 }} >
                    <IconButton variant="outlined" size='sm' color='primary' onClick={SubmitFormData}>
                        <AddIcon sx={{ color: "#FF76CE" }} />
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
                            <th style={{ width: '40%' }}>Hobbies</th>
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
                                    <td>{item?.hobbies === null ? "not updated" : item?.hobbies}</td>
                                    <td>
                                        <IconButton sx={{}} size='small' color='primary' onClick={() => EditData(item)}>
                                            <EditIcon sx={{ color: "#FF76CE" }} />
                                        </IconButton>
                                    </td>
                                    <td>
                                        <IconButton sx={{}} size='small' color='primary' onClick={() => DeleteItem(item)}>
                                            <DeleteIcon sx={{ color: "#FF76CE" }} />
                                        </IconButton>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </Table>
            </Box>
        </Box>
    )
}

export default memo(CandidateHobbies) 