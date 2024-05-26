// @ts-nocheck
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoute = () => {
    const token = useSelector(state => state.login.isLoggedIn.token)
    const isAuthenticated = token !== null

    return isAuthenticated ? <Outlet /> : <Navigate to="/CandidateLogin" replace />
}

export default ProtectedRoute