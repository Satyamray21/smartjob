import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RecruiterLayout from '../../pages/private/Recruiter/RecruiterLayout'
import ErrorPage from '../../pages/public/ErrorPage'
import JobsCandidate from '../../pages/private/Recruiter/pages/JobsCandidate'
import ResumeUploader from '../../pages/private/Recruiter/pages/ResumeUploader'
import Profile from '../../pages/private/Recruiter/pages/Profile'
import Job from '../../pages/private/Recruiter/pages/Job'
import Applications from '../../pages/private/Recruiter/pages/Applications'
import Jobs from './../../pages/private/Recruiter/pages/Jobs';

function RecruiterRoutes() {
    return (
        <Routes>
            <Route path="/" element={<RecruiterLayout />}>
                <Route index element={<Jobs />} />
                <Route path='/job' element={<Job />} />
                <Route path='/jobscandidate' element={<JobsCandidate />} />
                <Route path='/jobs' element={<Jobs />} />
                <Route path='/profile' element={<Profile />} />
                <Route path="/applications" element={<Applications />} />
                <Route path='/resumeuploader' element={<ResumeUploader />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default RecruiterRoutes;
