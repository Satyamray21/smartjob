import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminAppBar from '../../../components/private/AdminAppBar'
import { Toolbar } from '@mui/material'

const AdminLayout = () => {
    return (
        <AdminAppBar>
            <Toolbar />
            <Outlet />
        </AdminAppBar>
    )
}

export default AdminLayout;
