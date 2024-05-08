import React, { useState } from 'react'
import logo from '../../asserts/images/logo.png'
import profile from '../../asserts/images/profile-photo.png'
import { FaChevronDown, FaRegUser } from 'react-icons/fa6'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { destroyCookie, parseCookies } from 'nookies'
import { IoLogOutOutline } from 'react-icons/io5'

const CandidateHeader = () => {
  const [isToggled, setIsToggled] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const cookies = parseCookies()

  const logout = () => {
    destroyCookie(null, 'authToken')
    destroyCookie(null, 'user')
    navigate('/login')
  }

  const user = cookies?.user?.length > 0 ? JSON.parse(cookies?.user) : ''

  const handleToggle = () => {
    setIsToggled(!isToggled)
  }

  return (
    <>
      <div className='flex items-center justify-between p-4 border-b-2 border-[#00727D]'>
        <div>
          <img src={logo} alt='Logo' className='h-12' />
        </div>
        <div className='flex gap-4'>
          <Link
            to={'/dashboard'}
            className={`font-semibold text-lg py-2 px-4  ${
              pathname === '/dashboard' ||
              pathname?.split('/')[2] === 'job-detail'
                ? 'bg-[#00AEB3] text-white'
                : 'text-[#344054]'
            }`}
          >
            Job Opening
          </Link>
          <Link
            to={'/dashboard/my-application'}
            className={`font-semibold text-lg py-2 px-4  ${
              pathname?.split('/')[2] === 'my-application'
                ? 'bg-[#00AEB3] text-white'
                : 'text-[#344054]'
            }`}
          >
            My Application
          </Link>
        </div>
        <div className='flex items-center justify-between gap-4 cursor-pointer' onClick={handleToggle}>
          <img src={profile} alt='Profile Photo' />
          <p className='font-semibold text-lg'>
            {user?.firstName + ' ' + user?.lastName}
          </p>
          <FaChevronDown />
        </div>
        {isToggled && (
          <div className='absolute right-10 top-[4rem] shadow  p-2 bg-white '>
            <div className='flex flex-col-reverse gap-2'>
              <div className='flex items-center gap-2'>
                <IoLogOutOutline className='text-xl' />
                <button onClick={logout}> Logout</button>
              </div>
              <div className='flex items-center gap-2'>
                <FaRegUser />
                <button>Profile</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CandidateHeader
