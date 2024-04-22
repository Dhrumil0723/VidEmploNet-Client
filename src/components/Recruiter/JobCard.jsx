import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ data }) => {

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  return (
      <div className='bg-white border p-4 my-6 cursor-pointer' onClick={() =>{navigate(`/dashboard/job-opening/${data._id}`)}}>
        <p className='text-xl mb-4'>{data.jobTitle}</p>
        <div className='border-b-2 border-[#D0D5DD]'></div>
        <p className='mt-4'>0 applications</p>
        <div className='flex justify-evenly mt-2'>
          <div className='text-[#027A48] px-4 rounded-full'>0 Incomplete</div>
          <div className='text-[#B54708] px-2 rounded-full'>0 Pending</div>
          <div className='text-[#7A0202] px-2 rounded-full'>0 Rejected</div>
        </div>
        <div className='border-b-2 border-[#D0D5DD] mt-4'></div>
        <div className='flex mt-4'>
          <p className='font-medium'>Uploaded date: </p>
          <p className='ml-2 text-[#667085]'>{formatDate(data.updatedAt)}</p>
        </div>
      </div>
  )
}

export default JobCard
