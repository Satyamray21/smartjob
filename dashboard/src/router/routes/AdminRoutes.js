import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../../pages/private/Admin/AdminLayout'
import Dashboard from '../../pages/private/Admin/pages/Dashboard'
import JdCreate from '../../pages/private/Admin/pages/JdCreate'
import JdList from '../../pages/private/Admin/pages/JdList'
import JdUpdate from '../../pages/private/Admin/pages/JdUpdate'
import JdView from '../../pages/private/Admin/pages/JdView'
import RecruiterList from '../../pages/private/Admin/pages/RecruiterList'
import RecruiterUpdate from '../../pages/private/Admin/pages/RecruiterUpdate'
import ResumeList from '../../pages/private/Admin/pages/ResumeList'
import ErrorPage from '../../pages/public/ErrorPage'
import SendJdEmail from '../../pages/private/Admin/pages/SendJdEmail'
import RecruiterCreate from '../../pages/private/Admin/pages/RecruiterCreate'
import OtpInput from '../../pages/private/Admin/pages/OtpInput'
import RecruiterView from '../../pages/private/Admin/pages/RecruiterView'
import Profile from '../../pages/private/Admin/pages/Profile'
import RecruiterByAdmin from '../../pages/private/Admin/pages/RecruiterByAdmin'
import JdByAdmin from '../../pages/private/Admin/pages/JdByAdmin'
import AccountBlock from '../../pages/private/Admin/pages/AccountBlock'
import AccountActive from '../../pages/private/Admin/pages/AccountActive'
function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="/jdcreate" element={<JdCreate />} />
                <Route path="/jdlist" element={<JdList />} />
                <Route path='/jdupdate' element={<JdUpdate />} />
                <Route path='/jdview' element={<JdView />} />
                <Route path='/profile' element={<Profile />} />
                <Route path="/sendjdemail" element={<SendJdEmail />} />
                <Route path="/recruitercreate" element={<RecruiterCreate />} />
                <Route path="/otpinput" element={<OtpInput />} />
                <Route path="/accountactive" element={<AccountActive />} />
                <Route path="/accountblock" element={<AccountBlock />} />
                <Route path="/recruiterlist" element={<RecruiterList />} />
                <Route path="/recruiterbyadmin" element={<RecruiterByAdmin />} />
                <Route path="/jdbyadmin" element={<JdByAdmin />} />
                <Route path='/recruiterupdate' element={<RecruiterUpdate />} />
                <Route path='/recruiterview' element={<RecruiterView />} />
                <Route path="/resumelist" element={<ResumeList />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes >
    )
}

export default AdminRoutes
