import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Candidates from './pages/Recruiter/Dashboard/Candidates'
import Dashboard from './pages/Recruiter/Dashboard/Dashboard'
import Job from './pages/Recruiter/Dashboard/Job'
import JobOpening from './pages/Recruiter/Dashboard/JobOpening'
import CreateNewJob from './pages/Recruiter/Dashboard/CreateNewJob'
import UserLogin from './pages/auth/UserLogin'
import UserSignUp from './pages/auth/UserSignUp'
import ProtectedRoutes from './ProtectedRoutes'
import NotFound from './components/Common/NotFound'
import Home from './pages/Home'
import RecruiterLayout from './pages/Recruiter/Dashboard/RecruiterLayout'
import { parseCookies } from 'nookies'
import CandidateLayout from './pages/Candidate/Dashboard/CandidateLayout'
import AdminLogin from './admin/pages/auth/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import JobDetails from './pages/Recruiter/Dashboard/JobDetails'

const AllRoutes = () => {
  const cookies = parseCookies()

  const user = cookies?.user?.length > 0 ? JSON.parse(cookies?.user) : ''

  return (
    <>
      <Routes>
        {/* all public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='*' element={<NotFound />} />

        {/* all protected routes */}
        <Route element={<ProtectedRoutes />}>
          
          {/* Here Recruiter routes */}
          {user?.role == 'recruiter' && (
            <Route path='/dashboard' element={<RecruiterLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='job-opening' element={<Job />}>
                <Route index element={<JobOpening />} />
                <Route
                  path='create-job/'
                  element={<CreateNewJob key='create-job' />}
                />
                <Route
                  path='create-job/:id'
                  element={<CreateNewJob key='update-job' />}
                />
                <Route path=':id' element={<JobDetails />} />
              </Route>
              <Route path='candidates' element={<Candidates />} />
              <Route path='about-company' element={<Dashboard />} />
            </Route>
          )}

          {/* all candidate routes */}

          {user?.role == 'candidate' && (
            <Route path='/dashboard' element={<CandidateLayout />}></Route>
          )}
        </Route>

        {/* all admin routes */}

        {user?.role == 'admin' && (
          <Route path='/admin/dashboard' element={<AdminDashboard />}></Route>
        )}
      </Routes>
    </>
  )
}

export default AllRoutes
