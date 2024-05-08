import React from 'react'
import logo from '../../asserts/images/landing-logo.png'
import { useNavigate } from 'react-router-dom'
import { CiPlay1 } from 'react-icons/ci'
import { FaArrowRight } from "react-icons/fa6";

const Header = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className='flex items-center justify-between py-4 px-8 bg-[#00AEB3]'>
        <img src={logo} onClick={()=>navigate('/')} className='cursor-pointer' />
        <div className='flex gap-10 items-center'>
          <p className='font-semibold text-white text-lg cursor-pointer'>Pricing</p>
          <p className='font-semibold text-white text-lg cursor-pointer'>Job Board</p>
          <p className='font-semibold text-white text-lg cursor-pointer'>About Us</p>
          <p className='font-semibold text-white text-lg cursor-pointer' onClick={()=>navigate('/login')}>Login</p>
          <div className='p-4 bg-[#005C69] flex items-center justify-between gap-4 cursor-pointer' onClick={()=>navigate('/signup')}>
            <CiPlay1 className='text-white text-2xl' />
            <p className='font-semibold text-white text-lg'>SignUp</p>
            <FaArrowRight className='text-white text-xl' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
