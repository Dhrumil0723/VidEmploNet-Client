import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Candidates from './pages/Recruiter/Candidates'
import Header from './components/Recruiter/Header'
import SideBar from './components/Recruiter/SideBar'
import Dashboard from './pages/Recruiter/Dashboard'
import Job from './pages/Recruiter/Job'
import JobOpening from './pages/Recruiter/JobOpening'
import CreateNewJob from './pages/Recruiter/CreateNewJob'
import Login from './pages/Login'
import Signup from './pages/Signup'

const AllRoutes = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login' || location.pathname === '/signup'
  return (
    <>
        { isLoginPage ? (
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      ) : (
        <div className='grid grid-cols-5'>
            <SideBar />
          <div className='col-span-4'>
              <Header title='Dashboard' name='Create new job' />
            <div className='overflow-y-auto dashboard-main bg-[#D2ECEB] p-6'>
              {/* <Dashboard /> */}
              <Routes>
                <Route path='/dashboard' element={<Dashboard />} />


                <Route path='/job-opening' element={<Job />}>
                  <Route index element={<JobOpening />} />
                  <Route path='create-job' element={<CreateNewJob />} />
                </Route>

                <Route path='/candidates' element={<Candidates />} />
                <Route path='/about-company' element={<Dashboard />} />
              </Routes>
            </div>
          </div>
        </div>
      ) }
    </>
  )
}

export default AllRoutes