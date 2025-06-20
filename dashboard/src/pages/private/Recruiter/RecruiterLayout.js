import React from 'react'
import { Outlet } from 'react-router-dom'
import RecruiterAppBar from '../../../components/private/RecruiterAppBar'
import { Toolbar } from '@mui/material'

const RecruiterLayout = () => {
    return (
        <RecruiterAppBar>
            <Toolbar />
            <Outlet />
        </RecruiterAppBar>
    )
}

export default RecruiterLayout
