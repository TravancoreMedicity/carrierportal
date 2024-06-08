import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const CustBackDropWithState = ({ open, handleClose }) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, flexDirection: 'column' }}
            open={open}
            onClick={handleClose}
        >
            <CircularProgress color="inherit" sx={{ mb: 1.5 }} /> Please wait...
        </Backdrop>
    )
}

export default CustBackDropWithState