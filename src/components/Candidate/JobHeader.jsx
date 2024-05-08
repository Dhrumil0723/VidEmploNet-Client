import React from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate, useLocation } from 'react-router-dom'

const JobHeader = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className='flex justify-between bg-[#D2ECEB] p-6'>
      <div className='flex justify-between items-center'>
        <div
          className='bg-white flex justify-between items-center text-[#00AEB3] p-1 mr-2 cursor-pointer'
          onClick={() => navigate(-1)}
        >
          <div>
            <MdKeyboardArrowLeft className='text-xl' />
          </div>
          <div className='pr-2'>Back</div>
        </div>

        <div className='font-bold text-2xl'>Job Detail</div>
      </div>
      <div className='flex justify-between items-center'>
        <button
          // onClick={() => navigate('/dashboard/job-opening/create-job')}
          className='bg-[#005C69] ml-2 py-2 px-6 text-white font-medium'
        >
          Apply To This Job
        </button>
      </div>
    </div>
  )
}

export default JobHeader
