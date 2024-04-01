import React from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";
import Search from './Search'
import { useNavigate, useLocation } from 'react-router-dom'

const Header = (props) => {
  const navigate = useNavigate()
  const pathName = useLocation()

  

  return (
    <div className='flex justify-between bg-[#D2ECEB] p-6'>
      <div className='flex justify-between items-center'>
      <div className='bg-white flex justify-between items-center text-[#00AEB3] p-1 mr-2'>
        <div>
          <MdKeyboardArrowLeft className='text-xl' />
        </div>
        <div className='pr-2'>
          Back
        </div>
      </div>
      <div className='font-bold text-2xl'>{props.title}</div>
      </div>
      <div className='flex justify-between items-center'>
        <Search />
        <button onClick={()=> navigate('/job-opening/create-job')} className='bg-[#005C69] ml-2 py-2 px-6 text-white font-medium'>{props.name}</button>
      </div>
    </div>
  )
}

export default Header
