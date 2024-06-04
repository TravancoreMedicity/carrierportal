import React from 'react'
import Input from '@mui/joy/Input'
import { Tooltip } from '@mui/joy'

const CustomInput = ({ placeholder, type, value, disabled, handleChange, name, className, onClickHandler, title }) => {
    return (
        <Tooltip
            title={title}
            arrow
            color="success"
            placement="left"
            size="md"
            variant="outlined"
        >
            <Input
                fullWidth
                disabled={disabled}
                placeholder={placeholder}
                variant="outlined"
                type={type}
                value={value}
                onChange={handleChange}
                onClick={onClickHandler}
                name={name}
                autoComplete='off'
                color='primary'
                sx={{
                    "--Input-radius": "8px",
                    "--Input-gap": "8px",
                    "--Input-placeholderOpacity": 0.5,
                    "--Input-focusedThickness": "2px",
                    "--Input-minHeight": "32px",
                    "--Input-paddingInline": "11px",
                    "--Input-decoratorChildHeight": "30px",
                    ...className,
                }}
            />
        </Tooltip>
    )
}

export default CustomInput