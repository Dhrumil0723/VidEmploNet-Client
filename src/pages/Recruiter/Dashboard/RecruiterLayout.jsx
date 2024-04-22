import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../../components/Recruiter/SideBar'
import Header from '../../../components/Recruiter/Header'
import { useLocation } from 'react-router-dom'

const RecruiterLayout = () => {

  const { pathname } = useLocation();
  let pageTitle = (pathname?.split('/')[2] || pathname?.split('/')[1]).replace('-', ' ');
  pageTitle = pageTitle.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <>
      <div className='grid grid-cols-5'>
        <SideBar />
        <div className='col-span-4'>
          <Header title={pageTitle} name='Create new job' />
          <div className='overflow-y-auto dashboard-main bg-[#D2ECEB] p-6'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default RecruiterLayout
