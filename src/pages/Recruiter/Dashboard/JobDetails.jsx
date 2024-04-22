import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { IoWalletOutline } from 'react-icons/io5'
import { TbBriefcase } from 'react-icons/tb'
import { IoLocationOutline } from 'react-icons/io5'
import { TbNotes } from 'react-icons/tb'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'

const JobDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(false)

  const fetchJobData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/job/${id}`)
      setData(response?.data?.data)
    } catch (error) {
      console.error('Error fetching product details', error)
    }
  }

  const deleteJob = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this job?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      })

      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:3001/api/job/${id}`
        )

        if (response?.data?.code === 200) {
          toast.success(response.data.message)
          setTimeout(() => navigate(-1), 1000)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.error('Something went wrong!!', error)
      toast.error('Something went wrong while deleting the job.')
    }
  }
  

 
  useEffect(() => {
    fetchJobData()
  }, [id])

  return (
    <>
      <div className='bg-white p-6'>
        <div className='flex justify-between items-center'>
          <p className='font-semibold text-xl'>{data?.job?.jobTitle}</p>
          <div className='flex'>
            <button
              className='bg-[#D2ECEB] border-2 border-[#00AEB3] ml-2 py-2 px-6 text-[#005C69] font-medium'
              onClick={deleteJob}
            >
              Delete Job
            </button>
            <button
              className='bg-[#D2ECEB] border-2 border-[#00AEB3] ml-2 py-2 px-6 text-[#005C69] font-medium'
              onClick={() => {
                navigate(`/dashboard/job-opening/create-job/${id}`)
              }}
            >
              Edit Job Description
            </button>
          </div>
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
              <p className='text-xl'>{data?.job?.jobExperience}</p>
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
        <div className='border-b-2 border-[#35BEC1] my-6'></div>
        <p className='text-xl font-semibold'>Question Set</p>
        {data?.questions?.map((question, index) => (
          <div
            key={index}
            className='flex justify-between border-2 border-[#35BEC1] my-4 px-2'
          >
            <p className='my-2'>{question?.question}</p>
            <p className='my-2'>{question?.questionTime}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default JobDetails
