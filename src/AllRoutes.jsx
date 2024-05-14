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
import AdminDashboard from './admin/pages/dashboard/AdminDashboard'
import JobDetails from './pages/Recruiter/Dashboard/JobDetails'
import AboutCompany from './pages/Recruiter/Dashboard/AboutCompany'
import EditAboutCompany from './pages/Recruiter/Dashboard/EditAboutCompany'
import Company from './pages/Recruiter/Dashboard/Company'
import CandidatesList from './pages/Recruiter/Dashboard/CandidatesList'
import CandidatesDetails from './pages/Recruiter/Dashboard/CandidatesDetails'
import JobListing from './pages/Candidate/Dashboard/JobListing'
import MyApplication from './pages/Candidate/Dashboard/MyApplication'
import JobDetail from './pages/Candidate/Dashboard/JobDetail'
import AdminLayout from './admin/pages/dashboard/AdminLayout'
import RecruiterList from './admin/pages/dashboard/RecruiterList'
import CandidateList from './admin/pages/dashboard/CandidateList'
import AdminPlans from './admin/pages/dashboard/AdminPlans'
import AdminChangePassword from './admin/pages/dashboard/AdminChangePassword'

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
              <Route path='candidates' element={<Candidates />}>
                <Route index element={<CandidatesList />} />
                <Route path=':id' element={<CandidatesDetails />} />
              </Route>
              <Route path='about-company' element={<Company />}>
                <Route index element={<AboutCompany />} />
                <Route path='edit-about-company' element={<EditAboutCompany />} />
              </Route>
            </Route>
          )}

          {/* all candidate routes */}

          {user?.role == 'candidate' && (
            <Route path='/dashboard' element={<CandidateLayout />}>
              <Route index element={<JobListing />} />
              <Route path='job-detail/:id' element={<JobDetail />} />
              <Route path='my-application' element={<MyApplication />} />
            </Route>
          )}
        </Route>

        {/* all admin routes */}

        {user?.role == 'admin' && (
          <Route path='/admin/dashboard' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='recruiter' element={<RecruiterList />} />
            <Route path='candidate' element={<CandidateList />} />
            <Route path='plans' element={<AdminPlans />} />
            <Route path='change-password' element={<AdminChangePassword />} />
          </Route>
        )}
      </Routes>
    </>
  )
}

export default AllRoutes
