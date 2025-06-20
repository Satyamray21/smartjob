import React from 'react'
import { Outlet } from 'react-router-dom'
import PublicAppBar from '../components/public/PublicAppBar'
import { AppBar } from '@mui/material'
import Footer from './public/Footer'


function PublicLayout() {
    return (
        <div>
            <PublicAppBar />
            <AppBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default PublicLayout
