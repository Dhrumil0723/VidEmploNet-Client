import React from 'react'
import logo from '../../asserts/images/job-logo.png'
import { IoLocationOutline } from 'react-icons/io5'
import { IoWalletOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { dateTimeFormat } from '../../lib/Common/AllGlobalFunction';


const JobListingCard = ( {data} ) => {

    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return date.toLocaleDateString('en-US', options)
      }

  return (
    <>
      <div className='bg-white border p-4 my-6 cursor-pointer' onClick={() =>{navigate(`/dashboard/job-detail/${data._id}`)}}>
        <p className='font-semibold text-xl'>
          {data?.jobTitle}
        </p>
        <div className='flex items-center gap-4 my-4'>
          <div className='bg-[#E2F3F2] p-4 rounded-full'>
            <img
                // src={`http://localhost:3001/${data?.companyLogo}`}
              src={logo}
              alt='Logo'
            />
          </div>
          <div>
            <p className='font-semibold text-xl'>Codeule</p>
            <p>Service</p>
          </div>
        </div>
        <div className='border-b-2 my-4' />
        <div className='flex items-center gap-4'>
          <IoLocationOutline className='text-[#00AEB3] text-3xl' />
          <p className='text-xl'>{data?.city}, Gujarat</p>
        </div>
        <div className='flex items-center gap-4 justify-evenly my-1'>
            <p className='font-semibold text-[#027A48]'>{data?.workingMode}</p>
            <p className='font-semibold text-[#B54708]'>{data?.jobType}</p>
            <p className='font-semibold text-[#7A0202]'>{data?.jobExperience} years</p>
        </div>
        <div className="border-b-2 my-4" />
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <IoWalletOutline className='text-[#667085]' />
            <p className='text-[#667085]'>{data?.salaryRange}</p>
            </div>
            <div className="flex items-center gap-2">
            <LuClock4 className='text-[#667085]' />
            <p className='text-[#667085]'>{dateTimeFormat(data.createdAt)}</p>
            </div>
        </div>
      </div>
    </>
  )
}

export default JobListingCard
