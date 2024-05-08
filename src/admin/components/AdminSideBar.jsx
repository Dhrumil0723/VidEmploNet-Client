import React, { useState, useRef, useEffect } from 'react'
import logo from '../../asserts/images/logo.png'
import profile from '../../asserts/images/profile-photo.png'
import { CiHome } from 'react-icons/ci'
import { VscBriefcase } from 'react-icons/vsc'
import { BsPeople } from 'react-icons/bs'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { FaChevronDown, FaRegUser } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { destroyCookie, parseCookies } from 'nookies'
import { IoLogOutOutline } from 'react-icons/io5'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

const AdminSideBar = () => {
  const location = useLocation()
  const { pathname } = location
  const [isToggled, setIsToggled] = useState(false)
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const cookies = parseCookies()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const user = cookies?.user?.length > 0 ? JSON.parse(cookies?.user) : ''

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsToggled(false)
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleToggle = () => {
    setIsToggled(!isToggled)
  }

  const logout = () => {
    destroyCookie(null, 'authToken')
    destroyCookie(null, 'user')
    navigate('/login')
  }

  return (
    <div className='flex justify-between flex-col h-[100vh] p-4 bg-[#E2F3F2]'>
      <div>
        <div className='mt-3 mb-6'>
          <img className='h-10' src={logo} alt='logo' />
        </div>
        <div className=''>
          <Link
            to='/admin/dashboard'
            className={`flex flex-row items-center p-2 cursor-pointer ${
              pathname?.split('/')[2] === 'dashboard'
                ? 'bg-[#005C69] text-white'
                : ''
            }`}
          >
            <div>
              <CiHome className='w-6 h-6 mr-2' />
            </div>
            <div>Dashboard</div>
          </Link>
          <Link
            className={`flex flex-row items-center p-2 cursor-pointer ${
              pathname?.split('/')[3] === 'Users'
                ? 'bg-[#005C69] text-white'
                : ''
            }`}
          >
            <div>
              <BsPeople className='w-6 h-6 mr-2' />
            </div>
            <div className='flex justify-between items-center'>
              Users
              {isDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
              {isDropdownOpen && (
                <div className='ml-4'>
                  <Link to='/admin/recruiter' className='text-black'>
                    Recruiter
                  </Link>
                  <Link to='/admin/candidate' className='text-black'>
                    Candidate
                  </Link>
                </div>
              )}
            </div>
          </Link>
          <Link
            to='/dashboard/candidates'
            className={`flex flex-row items-center p-2 cursor-pointer ${
              pathname?.split('/')[3] === 'Plans'
                ? 'bg-[#005C69] text-white'
                : ''
            }`}
          >
            <div>
              <VscBriefcase className='w-6 h-6 mr-2' />
            </div>
            <div>Plans</div>
          </Link>
          <Link
            to='/dashboard/about-company'
            className={`flex flex-row items-center p-2 rounded cursor-pointer ${
              pathname?.split('/')[3] === 'change-password'
                ? 'bg-[#005C69] text-white'
                : ''
            }`}
          >
            <div>
              <HiOutlineBuildingOffice2 className='w-6 h-6 mr-2' />
            </div>
            <div>Change Password</div>
          </Link>
        </div>
        {isToggled && (
          <div className='absolute bottom-20 shadow left-60 p-2 bg-white '>
            <div className='flex flex-col-reverse gap-2'>
              {/* <div className='flex items-center gap-2'>
                <IoLogOutOutline className='text-xl' />
                <button onClick={logout}> Logout</button>
              </div> */}
              <div className='flex items-center gap-2'>
                <FaRegUser />
                <button>Profile</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className='border-b-2 border-[#35BEC1]'></div>
        <div
          className='flex justify-between items-center cursor-pointer'
          onClick={handleToggle}
          ref={containerRef}
        >
          <div className='mt-8 flex'>
            <div>
              <img src={profile} className='h-12 w-12 mr-4' alt='profile-pic' />
            </div>
            <div>
              <p className='font-medium'>
                {/* {user?.firstName + ' ' + user?.lastName} */}
                Admin
              </p>
            </div>
          </div>
          <div>
            <FaChevronDown />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSideBar
