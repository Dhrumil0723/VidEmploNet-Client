import React from 'react'
import Select from 'react-select'
import { HiOutlineBriefcase } from 'react-icons/hi2'
import { cityOptions, timeOptions } from '../../lib/Common/AllGlobalFunction'

const FindJobSection = ({ value, onChange, handleCityChange, handleFilterDateTimeChange }) => {
  return (
    <>
      <div className='py-8 px-16 border-b-2 border-[#9EDDDD]'>
        <p className='font-semibold text-5xl'>Find Your Dream Job Here</p>
        <div className='mt-4 flex items-center bg-white p-2 gap-4'>
          <div className='flex items-center border-2 p-2 bg-white  w-full'>
            <HiOutlineBriefcase className='text-2xl text-gray-300 bg-white' />
            <input
              className='focus:outline-none pl-2 w-full'
              type='search'
              placeholder='Job Title'
              value={value}
              onChange={onChange}
            />
          </div>
          <Select
            className='w-full'
            id='city'
            name='city'
            isClearable
            onChange={(e) => handleCityChange(e)}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: '#69CDCF',
                primary: '#00727D',
                primary50: '',
                primary75: ''
              }
            })}
            options={cityOptions}
          />
          <Select
            className='w-full'
            id='city'
            name='city'
            isClearable
            onChange={(e) => handleFilterDateTimeChange(e)}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: '#69CDCF',
                primary: '#00727D',
                primary50: '',
                primary75: ''
              }
            })}
            options={timeOptions}
          />
        </div>
      </div>
    </>
  )
}

export default FindJobSection
