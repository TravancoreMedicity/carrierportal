import { AspectRatio, Box, Button, Typography } from '@mui/joy'
import React, { useEffect } from 'react'
import Google from '../../../assets/Google.png'
import { useDispatch } from 'react-redux'
import { login } from '../../../Redux/LoginSlice'
import { useNavigate } from 'react-router-dom'

const CandidateLogin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const googleRedirectToGoogle = () => {
        window.location.href = 'https://localhost:5000/auth/google';
    };

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('usdsa');
        const info = query.get('info');
        if (token !== null) {
            localStorage.setItem('token', token);
            dispatch(login({ token, info }));
            navigate('/CandidateHome', { replace: true });
        }
    }, [])

    return (
        <Box
            className="flex cursor-pointer items-center space-x-2 px-10 py-2 border rounded-full bg-gradient-to-r  border-[#747775] hover:bg-[#c5d1f7] hover:from-[#c0a0ed] hover:to-[#a9e6f9]"
            onClick={googleRedirectToGoogle}
        >
            <Box className="flex" >
                <img
                    src={Google}
                    alt='Google Image'
                    width={45}
                    height={45}
                />
            </Box>
            <Typography level='h4' >Sign in with Google</Typography>
        </Box>
    )
}

export default CandidateLogin