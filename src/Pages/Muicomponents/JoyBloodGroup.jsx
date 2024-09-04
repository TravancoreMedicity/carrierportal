import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import React, { memo, useCallback, useEffect, useState } from 'react'
import _ from 'underscore';
import axioslogin from '../../Axios/Axios';

const JoyBloodGroup = ({ value, setValue, disabled }) => {
    // const dispatch = useDispatch();
    const [flag, setFlag] = useState(0)
    const [BloodGroup, setBloodGroup] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.get('/common/bloodgroup');
            const { success, data } = result.data
            if (success === 1) {
                setBloodGroup(data)
            } else {
                setBloodGroup([])
            }

        }
        fetchData()
    }, [])

    // const empBloodgrp = useSelector((state) => state.getEmployeeBloodgrp.empBlood, _.isEqual)

    useEffect(() => {
        if ((value !== 0) && (flag === 0)) {
            const array = BloodGroup?.find((e) => e.group_slno === parseInt(value))
            setValue(array?.group_slno)
        }
    }, [value, setValue, flag, BloodGroup])

    const onClick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
        }
        else {
            setValue(0)
        }
        return
    }, [setValue])

    return (
        <Select
            value={value}
            disabled={disabled}
            onChange={(event, newValue) => {
                onClick(newValue);
            }}
            size='md'
            variant='outlined'
        >
            <Option disabled value={0}>Select Blood Group</Option>
            {
                BloodGroup?.map((val, index) => {
                    return <Option key={val.group_slno} value={val.group_slno}>{val.group_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyBloodGroup) 