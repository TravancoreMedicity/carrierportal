import { Bounce, toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import 'react-toastify/dist/ReactToastify.css';

export const succesNofity = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce
});

export const errorNofity = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce
});

export const warningNofity = (message) => toast.warning(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce
});

export const infoNofity = (message) => toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce
});


export const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
};