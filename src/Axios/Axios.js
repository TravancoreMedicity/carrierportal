// @ts-nocheck
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../Constant/Static';

// const accessToken = token();

const axioslogin = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Accept-Language": "en-GB,en"
    }
});

axioslogin.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (err) {
    console.log(err);
})

axioslogin.interceptors.response.use(function (response) {
    if (response.data.status === 102) {
        localStorage.removeItem('token');
        localStorage.removeItem('nextauth.message')
        // toast.error('Session Expired, Please Login Again');
        // window.location.href = 'http://localhost:3000/CandidateLogin'
        toast.error(
            <div className='flex h-20 flex-col' >
                <div className="text-center">
                    Session Expired, Please Login Again
                </div>
                <div className='flex justify-center'>
                    <button
                        className='bg-[#ed766a] text-white rounded-md p-[0.5] w-2/4 my-1'
                        onClick={() => window.location.href = 'http://localhost:3000/CandidateLogin'}>
                        Login
                    </button>
                </div>
            </div>, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }
        );
    }
    return response;
}, function (err) {
    console.log(err);
})



export default axioslogin