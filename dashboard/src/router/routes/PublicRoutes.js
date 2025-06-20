import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../../pages/public/PublicLayout'
import Email from '../../pages/public/pages/Email'
import ErrorPage from '../../pages/public/ErrorPage'
import Login from '../../pages/public/pages/Login'
import ChangePassword from '../../pages/public/pages/ChangePassword'

function PublicRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<Login />} />
                <Route path="email" element={<Email />} />
                <Route path="changepassword" element={<ChangePassword />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}
export default PublicRoutes
