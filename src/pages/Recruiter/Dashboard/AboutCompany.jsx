import React, { useEffect, useState } from 'react'
import logo from '../../../asserts/images/job-logo.png'
import { IoWalletOutline } from 'react-icons/io5'
import { TbBriefcase } from 'react-icons/tb'
import { IoLocationOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { parseCookies } from 'nookies'

const AboutCompany = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const cookies = parseCookies()
  const user = cookies?.user?.length > 0 ? JSON.parse(cookies?.user) : ''

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/recruiter?id=${user?._id}`)
      setData(response?.data?.data)
    } catch (error) {
      console.log('Something went wrong!!', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // console.log(data)

  return (
    <>
      <div className='bg-white p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-4 justify-center items-center'>
            <div className='bg-[#E2F3F2] p-4 rounded-full'>
            <img src={`http://localhost:3001/${data?.companyLogo}`} alt='Logo' />
            </div>
            <div>
              <p className='font-semibold text-xl'>{data?.companyName}</p>
              <p>Service</p>
            </div>
          </div>
          <button
            className='bg-[#D2ECEB] border-2 border-[#00AEB3] ml-2 py-2 px-6 text-[#005C69] font-medium'
            onClick={() => {
              navigate('edit-about-company')
            }}
          >
            Edit Company Details
          </button>
        </div>

        <div className='grid grid-cols-3 gap-6 mt-8 mb-4'>
          <div className='flex'>
            <p className='bg-[#E6D2B5] p-4 rounded-full'>
              <IoWalletOutline className='text-3xl text-white' />
            </p>
            <div className='ml-4'>
              <p className='text-xl'>{data?.companyEmployees}</p>
              <p>Employees</p>
            </div>
          </div>
          <div className='flex'>
            <p className='bg-[#E6D2B5] p-4 rounded-full'>
              <TbBriefcase className='text-white text-3xl' />
            </p>
            <div className='ml-4'>
              <p className='text-xl'>{data?.companyEmail}</p>
              <p>Contact email</p>
            </div>
          </div>
          <div className='flex'>
            <p className='bg-[#E6D2B5] p-4 rounded-full'>
              <IoLocationOutline className='text-white text-3xl' />
            </p>
            <div className='ml-4'>
              <p className='text-xl'>{data?.companyLocation}, Gujarat</p>
              <p>Location</p>
            </div>
          </div>
        </div>

        <div className='border-b-2 border-[#D0D5DD] mb-4' />

        <div>
          <p className='font-semibold text-xl'>About Company</p>
          <div
            dangerouslySetInnerHTML={{ __html: data?.aboutCompany }}
          />
        </div>
      </div>
    </>
  )
}

export default AboutCompany
