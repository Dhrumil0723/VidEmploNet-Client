import React from 'react'
import SideBar from '../../components/Recruiter/SideBar'
import Header from '../../components/Recruiter/Header'
import Dashboard from './Dashboard'

const RecruiterHome = () => {
  return (
    <div className='grid grid-cols-5'>
      <div>
        <SideBar />
      </div>
      <div className='col-span-4'>
        <div>
          <Header title='Dashboard' name='Create new job' />
        </div>
        <div className='overflow-y-auto h-[100vh] dashboard-main'>
          <Dashboard />
        </div>
      </div>
    </div>
  )
}

export default RecruiterHome