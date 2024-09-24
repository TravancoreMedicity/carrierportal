import { Box, IconButton, Table, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import InputComponent from '../../../Muicomponents/InputComponent'
import { succesNofity, warningNofity } from '../../../CommonCode/CommonFunc';
import axioslogin from '../../../../Axios/Axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Paper } from '@mui/material';


const CertificationsEdit = ({ ApplicationId }) => {

    const [certification, Setcertification] = useState("")
    const [course, Setcourse] = useState("")
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
            const result = await axioslogin.post('/career/Certification/get', checkData)
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
            certification: certification,
            course: course,
            slno: slno
        }
    }, [ApplicationId, certification, course])

    const SubmitFormData = useCallback(async (event) => {
        if (certification === '') {
            warningNofity('Please enter the Certification Name')
        } else if (course === "") {
            warningNofity('Please enter the Course Name')

        } else {
            if (value === 1) {
                const result = await axioslogin.post('/career/UpdateCertification', postdata)
                const { success, message } = result.data
                if (success === 2) {
                    succesNofity(message)
                    setvalue(0)
                    setCount(count + 1)
                    Setcertification("")
                    Setcourse("")
                }
                else {
                    warningNofity(message)
                }
            } else {
                const result = await axioslogin.post('/career/InsertCertification', postdata)
                const { success, message } = result.data
                if (success === 2) {
                    succesNofity(message)
                    setvalue(0)
                    setCount(count + 1)
                    Setcertification("")
                    Setcourse("")
                }
                else {
                    warningNofity(message)
                }
            }
        }



    }, [postdata, count])


    const EditData = useCallback((item) => {
        setvalue(1)
        Setcertification(item?.certfication_name)
        setSlno(item?.crt_slno)
        Setcourse(item?.courseName)
    }, [])

    const DeleteItem = useCallback(async (item) => {
        const result = await axioslogin.delete(`/career/Certification/delete/${item?.crt_slno}`)
        const { success, message } = result.data
        if (success === 1) {
            setCount(count + 1)
            succesNofity(message)
        } else {
            warningNofity(message)
        }
    }, [count])

    return (
        <Paper
            variant="outlined"
            sx={{
                // backgroundColor: 'slate.50',
                padding: 4,
                borderRadius: 'md',
                // boxShadow: 'lg',
                marginTop: 2,
                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },
            }}>
            <Box>
                <Typography level="body-md">Certification Details</Typography>
            </Box>
            <Box sx={{ flex: 1, pr: 1, mt: 1 }}>
                <InputComponent
                    // variant="plain"
                    placeholder={"Certification Name"}
                    type="text"
                    value={certification}
                    name="certification"
                    onchange={(e) => Setcertification(e.target.value)}
                    size="sm"
                />

            </Box>
            <Box sx={{ flex: 1, pr: 1, mt: 1 }}>
                <InputComponent
                    // variant="plain"
                    placeholder={"Course Name"}
                    type="text"
                    value={course}
                    name="course"
                    onchange={(e) => Setcourse(e.target.value)}
                    size="sm"

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
                            <th>Certification Name</th>
                            <th>Course Name</th>
                            <th>Edit</th>
                            <th>Update</th>

                        </tr>
                    </thead>

                    <tbody>
                        {tableData?.map((item, index) => {
                            // Move the `const` declaration here
                            const slNo = index + 1;
                            return (
                                <tr key={index}>
                                    <td>{slNo}</td>
                                    <td>{item?.certfication_name === null ? "not updated" : item?.certfication_name}</td>
                                    <td> <Typography sx={{ wordBreak: 'break-word', }}>{item?.courseName === null ? "not updated" : item?.courseName}</Typography></td>
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
        </Paper>
    )
}

export default memo(CertificationsEdit)