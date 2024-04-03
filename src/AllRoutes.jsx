import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Candidates from './pages/Recruiter/Dashboard/Candidates'
import Dashboard from './pages/Recruiter/Dashboard/Dashboard'
import Job from './pages/Recruiter/Dashboard/Job'
import JobOpening from './pages/Recruiter/Dashboard/JobOpening'
import CreateNewJob from './pages/Recruiter/Dashboard/CreateNewJob'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProtectedRoutes from './ProtectedRoutes'
import NotFound from './components/Common/NotFound'
import Home from './pages/Home'
import RecruiterLayout from './pages/Recruiter/Dashboard/RecruiterLayout'
import { parseCookies } from 'nookies'
import CandidateLayout from './pages/Candidate/Dashboard/CandidateLayout'

const AllRoutes = () => {
  const cookies = parseCookies()
  return (
    <>
      <Routes>
        {/* all public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />

        {/* all protected routes */}
        <Route element={<ProtectedRoutes />}>
          {/* Here Recruiter routes */}
          {cookies?.role == 'recruiter' ? (
            <Route path='/dashboard' element={<RecruiterLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='job-opening' element={<Job />}>
                <Route index element={<JobOpening />} />
                <Route path='create-job' element={<CreateNewJob />} />
              </Route>
              <Route path='candidates' element={<Candidates />} />
              <Route path='about-company' element={<Dashboard />} />
            </Route>
          ) : (
            <Route path='dashboard' element={<CandidateLayout />}></Route>
          )}
        </Route>
      </Routes>
    </>
  )
}

export default AllRoutes
