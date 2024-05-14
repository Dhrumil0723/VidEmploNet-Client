import React from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AdminSideBar from '../../components/AdminSideBar'
import AdminHeader from '../../components/AdminHeader'

const AdminLayout = () => {

  const { pathname } = useLocation();
  let pageTitle = (pathname?.split('/')[3] || pathname?.split('/')[2]).replace('-', ' ');
  pageTitle = pageTitle.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <>
      <div className='grid grid-cols-5'>
        <AdminSideBar />
        <div className='col-span-4'>
          <AdminHeader title={pageTitle} name='Create new job' />
          <div className='overflow-y-auto dashboard-main bg-[#D2ECEB] p-6'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLayout
