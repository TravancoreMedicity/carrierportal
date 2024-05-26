import React from 'react'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const State = ({ name, handleChange, disabled, value }) => {

    const state = [
        { slno: 1, name: 'Andhra Pradesh' },
        { slno: 2, name: 'Arunachal Pradesh' },
        { slno: 3, name: 'Assam' },
        { slno: 4, name: 'Bihar' },
        { slno: 5, name: 'Chhattisgarh' },
        { slno: 6, name: 'Goa' },
        { slno: 7, name: 'Gujarat' },
        { slno: 8, name: 'Haryana' },
        { slno: 9, name: 'Himachal Pradesh' },
        { slno: 10, name: 'Jharkhand' },
        { slno: 11, name: 'Karnataka' },
        { slno: 12, name: 'Kerala' },
        { slno: 13, name: 'Madhya Pradesh' },
        { slno: 14, name: 'Maharashtra' },
        { slno: 15, name: 'Manipur' },
        { slno: 16, name: 'Meghalaya' },
        { slno: 17, name: 'Mizoram' },
        { slno: 18, name: 'Nagaland' },
        { slno: 19, name: 'Odisha' },
        { slno: 20, name: 'Punjab' },
        { slno: 21, name: 'Rajasthan' },
        { slno: 22, name: 'Sikkim' },
        { slno: 23, name: 'Tamil Nadu' },
        { slno: 24, name: 'Telangana' },
        { slno: 25, name: 'Tripura' },
        { slno: 26, name: 'Uttar Pradesh' },
        { slno: 27, name: 'Uttarakhand' },
        { slno: 28, name: 'West Bengal' }
    ]


    return (
        <Select
            color='primary'
            placeholder="Choose State"
            disabled={disabled}
            size='sm'
            value={value}
            // defaultValue="Choose State"
            name={name}
            onChange={handleChange}
            sx={{
                width: '100%',
                "--Select-radius": "8px",
                "--Select-gap": "8px",
                "--Select-placeholderOpacity": 0.5,
                "--Select-focusedThickness": "2px",
                "--Select-minHeight": "32px",
                "--Select-paddingInline": "11px",
                "--Select-decoratorChildHeight": "30px"
            }}
        >
            <Option value={0}>Choose State</Option>
            {
                state.map((state, index) => <Option key={index} value={state.slno}>{state.name}</Option>)
            }
        </Select>
    )
}

export default State