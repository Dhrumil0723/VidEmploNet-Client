import React from 'react'
import { parseCookies } from 'nookies'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const cookies = parseCookies();
    const user = cookies.authToken
    const token = user ? true : false ;
    return token ? <Outlet /> : <Navigate to='/login' />
    
}

export default ProtectedRoutes