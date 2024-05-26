import React from 'react'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const District = ({ name, handleChange, disabled, value }) => {

    const districtNames = [
        { slno: 1, name: 'Thiruvananthapuram' },
        { slno: 2, name: 'Kollam' },
        { slno: 3, name: 'Pathanamthitta' },
        { slno: 4, name: 'Alappuzha' },
        { slno: 5, name: 'Kottayam' },
        { slno: 6, name: 'Idukki' },
        { slno: 7, name: 'Ernakulam' },
        { slno: 8, name: 'Thrissur' },
        { slno: 9, name: 'Palakkad' },
        { slno: 10, name: 'Malappuram' },
        { slno: 11, name: 'Kozhikode' },
        { slno: 12, name: 'Wayanad' },
        { slno: 13, name: 'Kannur' },
        { slno: 14, name: 'Kasaragod' },
        { slno: 15, name: 'Others' },
    ]

    return (
        <Select
            color='primary'
            placeholder="Choose District"
            size='sm'
            disabled={disabled}
            name={name}
            value={value}
            // defaultValue="Choose District"
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
            <Option value={0}>Choose District</Option>
            {
                districtNames.map((district, index) => <Option key={index} value={district.slno}>{district.name}</Option>)
            }
        </Select>
    )
}

export default District