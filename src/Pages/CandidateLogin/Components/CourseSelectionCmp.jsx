// @ts-nocheck
import React, { useLayoutEffect, useState } from 'react'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import axioslogin from '../../../Axios/Axios';

const CourseSelectionCmp = ({ value, setValue, setValueLength }) => {

    const [cources, setCources] = useState([])

    useLayoutEffect(() => {
        const getCourses = async () => {
            const result = await axioslogin.get(`/app_registration/getCources`)
            console.log(result)
            const { data, success } = result.data
            if (success === 2) {
                console.log(data)
                setCources(data)
                // setValueLength(data?.length)
            }
        }
        getCourses()
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    };

    return (
        <Select
            defaultValue={0}
            onChange={handleChange}
            className='w-full'
            value={value}
        >
            <Option value={0}>Select Course</Option>
            {
                cources?.map((e) => (
                    <Option
                        value={e.cour_slno}
                        key={e.cour_slno}
                    >{e.cource_name}</Option>
                ))
            }
        </Select>
    )
}

export default CourseSelectionCmp