import { Box, IconButton, Table, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import InputComponent from '../../../Muicomponents/InputComponent'
import axioslogin from '../../../../Axios/Axios';
import { succesNofity, warningNofity } from '../../../CommonCode/CommonFunc';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


const CandidateReference = ({ ApplicationId }) => {
    const [Name, SetName] = useState("")
    const [Designation, SetDesignation] = useState("")
    const [number, SetNumber] = useState('')
    const [mail, Setmail] = useState("")
    const [tableData, setTableData] = useState([])
    const [count, setCount] = useState(0)
    const [value, setvalue] = useState(0)
    const [slno, setSlno] = useState(0)


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
                setCount(0)
            }
            else {
                setTableData([])
            }
        }
        getJobSkills(checkData)

    }, [count, checkData])


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
                    setCount(count + 1)
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
                    setCount(count + 1)
                }
                else {
                    warningNofity(message)
                }

            }
        }
    }, [postdata, count])

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
            setCount(count + 1)
            succesNofity(message)
        } else {
            warningNofity(message)
        }
    }, [count])

    return (
        <Box sx={{
            backgroundColor: 'slate.50',
            padding: 4,
            borderRadius: 'md',
            boxShadow: 'lg',
            marginTop: 2,
            '@media screen and (max-width: 768px)': {
                padding: 1,
            },
        }}>
            <Box>
                <Typography level="body-md">Referance Details</Typography>
            </Box>
            <Box sx={{ flex: 1, pr: 1, mt: 1 }}>
                <InputComponent
                    // variant="plain"
                    placeholder={"Name"}
                    type="text"
                    value={Name}
                    name="Name"
                    onchange={(e) => SetName(e.target.value)}
                    size="md"
                />

            </Box>
            <Box sx={{ flex: 1, pr: 1, mt: 1 }}>
                <InputComponent
                    // variant="plain"
                    placeholder={"Designation"}
                    type="text"
                    value={Designation}
                    name="Designation"
                    onchange={(e) => SetDesignation(e.target.value)}
                    size="md"
                />

            </Box>
            <Box sx={{ flex: 1, pr: 1, mt: 1 }}>
                <InputComponent
                    // variant="plain"
                    placeholder={"Condact number"}
                    type="text"
                    value={number}
                    name="number"
                    onchange={(e) => SetNumber(e.target.value)}
                    size="md"
                />

            </Box>
            <Box sx={{ flex: 1, pr: 1, mt: 1 }}>
                <InputComponent
                    // variant="plain"
                    placeholder={"Mail Id"}
                    type="text"
                    value={mail}
                    name="mail"
                    onchange={(e) => Setmail(e.target.value)}
                    size="md"
                />

            </Box>
            <Box sx={{ flex: 0, px: 0.5, display: 'flex', justifyContent: 'end', mt: 1 }} >
                <Tooltip title="save" >
                    <IconButton variant="outlined" size='sm' color='primary' onClick={SubmitFormData}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>

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
                            <th >Name</th>
                            <th>Designation</th>
                            <th>Number</th>
                            <th>Mail</th>
                            <th>Edit</th>
                            <th>Update</th>

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
                                            <EditIcon />
                                        </IconButton>
                                    </td>
                                    <td>
                                        <IconButton sx={{}} size='small' color='primary' onClick={() => DeleteItem(item)}>
                                            <DeleteIcon />
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

export default memo(CandidateReference)