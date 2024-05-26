import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: {
        status: false,
        user: null,
        token: null
    }
};

export const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = {
                status: true,
                user: action.payload.info,
                token: action.payload.token
            }
        },
        logout: (state) => {
            state.isLoggedIn = {
                status: false,
                user: null,
                token: null
            }
        }
    }
})

export const getUser = (state) => state.login.isLoggedIn.user

export const { login, logout } = LoginSlice.actions
export default LoginSlice.reducer