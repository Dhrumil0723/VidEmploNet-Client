import React from 'react'

const JobCard = () => {
  return (
    <div className='bg-white p-6 h-full'>
      <div className='font-medium text-xl'>Current Job openings</div>
      <div className='bg-white border p-4 my-6'>
        <p className='text-xl mb-4'>UI/UX designer</p>
        <div className='border-b-2 border-[#D0D5DD]'></div>
        <p>12 applications</p>
        <div className='flex justify-evenly mt-2'>
            <div className='bg-[#ECFDF3] text-[#027A48] px-4 rounded-full'>4 New</div>
            <div className='bg-[#FEF0C7] text-[#B54708] px-2 rounded-full'>4 In Progress</div>
            <div className='bg-[#FDECEC] text-[#7A0202] px-2 rounded-full'>4 Rejected</div>
        </div>
        <div className='border-b-2 border-[#D0D5DD] mt-4'></div>
        <div className='flex mt-4'>
            <p className='font-medium'>Uploaded date: </p>
            <p className='ml-2 text-[#667085]'>Jan 25, 2024</p>
        </div>
      </div>
    </div>
  )
}

export default JobCard
