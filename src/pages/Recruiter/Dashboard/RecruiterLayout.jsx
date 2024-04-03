import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../../components/Recruiter/SideBar'
import Header from '../../../components/Recruiter/Header'

const RecruiterLayout = () => {
  return (
    <>
      <div className='grid grid-cols-5'>
        <SideBar />
        <div className='col-span-4'>
          <Header title='Dashboard' name='Create new job' />
          <div className='overflow-y-auto dashboard-main bg-[#D2ECEB] p-6'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default RecruiterLayout
