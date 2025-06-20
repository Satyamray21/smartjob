import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../../pages/publicLayout'
import ErrorPage from '../../pages/public/pages/ErrorPage'
import FindTag from '../../pages/public/pages/FindTag'
import EmployeeLogin from '../../pages/public/pages/EmployeeLogin'
import EmployeeRegister from '../../pages/public/pages/EmployeeRegister'
import CondidateRegister from '../../pages/public/pages/CondidateRegister'
import CondidateLogin from '../../pages/public/pages/CondidateLogin'
import Jobs from '../../pages/public/pages/Jobs'
import JobApplicant from '../../pages/public/pages/jobApplicant'
import JobApplication from '../../pages/public/pages/jobApplication'
import JobSearch from '../../pages/public/pages/JobSearch'
import JobFound from '../../pages/public/pages/JobFound'
import AboutUs from '../../pages/public/pages/AboutUs'
import ContactUs from '../../pages/public/pages/ContactUs'
import Services from '../../pages/public/pages/Services'
import HomePage from '../../pages/public/pages/HomePage'
import CompanyList from '../../pages/public/pages/CompanyList'
import Company from '../../pages/public/pages/Company'
import Profile from '../../pages/public/pages/Profile'
import CandidateProfile from '../../pages/public/pages/CandidateProfile'

function PublicRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="aboutus" element={<AboutUs />} />
                <Route path="contactus" element={<ContactUs />} />
                <Route path="services" element={<Services />} />
                <Route path="condidatelogin" element={<CondidateLogin />} />
                <Route path="condidateregister" element={<CondidateRegister />} />
                <Route path="candidateprofile" element={<CandidateProfile />} />
                <Route path="employeelogin" element={<EmployeeLogin />} />
                <Route path="employeeregister" element={<EmployeeRegister />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="jobapplicant" element={<JobApplicant />} />
                <Route path="jobapplication" element={<JobApplication />} />
                <Route path="jobfound" element={<JobFound />} />
                <Route path="findpage" element={<FindTag />} />
                <Route path="companies" element={<Company />} />
                <Route path="profile" element={<Profile />} />
                <Route path="companylist" element={<CompanyList />} />
                <Route path='jobsearch' element={<JobSearch />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default PublicRoutes
