import { Option, Select } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

const RegionJoy = ({ regValue, getRegion, pin, DisableRegion }) => {


    // const emRegion = useSelector((state) => state?.getRegionList?.RegionList, _.isEqual)
    const [region, setRegion] = useState([{ reg_slno: 0, reg_name: 'Select Region' }])
    const regionList = useMemo(() => pin, [pin])

    const [value, setValue] = useState(region[0]);


    useEffect(() => {
        regionList.length > 0 && setRegion(regionList)
    }, [regionList])


    const Onclick = useCallback((value) => {
        if (value !== null) {
            setValue(value)
            getRegion(value)
        } else {
            getRegion(0)
        }
    }, [getRegion])

    return (

        <Select
            placeholder="Select Region"
            value={value}
            onChange={(event, newValue) => {
                Onclick(newValue);
            }}
            size='md'
            variant='outlined'
            disabled={DisableRegion}
        >
            <Option disabled value={0}>  Select Region </Option>
            {
                pin?.map((val, index) => {
                    return <Option key={index} value={val.reg_slno}>{val.reg_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(RegionJoy)