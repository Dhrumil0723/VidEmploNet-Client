import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { IoWalletOutline } from 'react-icons/io5'
import { TbBriefcase } from 'react-icons/tb'
import { IoLocationOutline } from 'react-icons/io5'
import { TbNotes } from 'react-icons/tb'
import JobHeader from '../../../components/Candidate/JobHeader'

const JobDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(false)

  const fetchJobData = async () => {
    try {
      const response = await axios.get(`api/job/${id}`)
      setData(response?.data?.data)
    } catch (error) {
      console.error('Error fetching product details', error)
    }
  }

  useEffect(() => {
    fetchJobData()
  }, [id])

  return (
    <>
      <JobHeader />
      <div className='pb-8'>
        <div className='bg-white p-6 mx-6'>
          <div className='flex justify-between items-center'>
            <p className='font-semibold text-xl'>{data?.job?.jobTitle}</p>
          </div>
          <div className='grid grid-cols-2 gap-6 my-2'>
            <div className='flex'>
              <p className='bg-[#E6D2B5] p-4 rounded-full'>
                <IoWalletOutline className='text-3xl text-white' />
              </p>
              <div className='ml-4'>
                <p className='text-xl'>{data?.job?.salaryRange}</p>
                <p>Salary</p>
              </div>
            </div>
            <div className='flex'>
              <p className='bg-[#E6D2B5] p-4 rounded-full'>
                <TbBriefcase className='text-white text-3xl' />
              </p>
              <div className='ml-4'>
                <p className='text-xl'>{data?.job?.jobExperience} years</p>
                <p>Experience</p>
              </div>
            </div>
            <div className='flex'>
              <p className='bg-[#E6D2B5] p-4 rounded-full'>
                <IoLocationOutline className='text-white text-3xl' />
              </p>
              <div className='ml-4'>
                <p className='text-xl'>
                  {data?.job?.city}, {data?.job?.state}
                </p>
                <p>Location</p>
              </div>
            </div>
            <div className='flex'>
              <p className='bg-[#E6D2B5] p-4 rounded-full'>
                <TbNotes className='text-white text-3xl' />
              </p>
              <div className='ml-4'>
                <p className='text-xl'>
                  {data?.job?.workingMode} - {data?.job?.jobType}
                </p>
                <p>Job Type</p>
              </div>
            </div>
          </div>
          <div className='border-b-2 border-[#35BEC1] my-6'></div>
          <div className='jb_description_wrapper'>
            <p className='text-xl font-semibold my-4'>Job Description</p>
            <div
              dangerouslySetInnerHTML={{ __html: data?.job?.jobDescription }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default JobDetail
