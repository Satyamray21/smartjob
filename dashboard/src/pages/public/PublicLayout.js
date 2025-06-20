import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
// import PublicAppBar from '../../components/public/PublicAppBar'
// import { Toolbar } from '@mui/material'

function PublicLayout() {
    // const location = useLocation();
    // const isNotFound = location.pathname === "*";
    // const footerPath = ["/", "login", "register"];
    // const showFooter = !isNotFound && footerPath.includes(location.pathname)
    return (
        <>
            {/* {showFooter && <PublicAppBar />} */}
            {/* {showFooter && <Toolbar />} */}
            <Outlet />
        </>
    )
}

export default PublicLayout
