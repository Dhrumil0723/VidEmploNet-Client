import React from 'react'
import { CiSearch } from "react-icons/ci";
import Select from 'react-select'
import { userStatusOptions, paginationLimitOptions } from '../../lib/Common/AllGlobalFunction'

const FindUserSection = ({value, onChange, handleUserStatusChange, handlePageSizeChange}) => {
  return (
    <>
      <div className=''>
        <div className='mt-4 flex items-center bg-white p-2 gap-4'>
          <div className='flex items-center border-2 p-2 bg-white  w-full'>
            <CiSearch className='text-2xl text-gray-300 bg-white' />
            <input
              className='focus:outline-none pl-2 w-full'
              type='search'
              placeholder='Search User'
              value={value}
              onChange={onChange}
            />
          </div>
          <Select
            className='w-full'
            id='city'
            name='city'
            isClearable
            onChange={(e) => handleUserStatusChange(e)}
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
            options={userStatusOptions}
          />
          <Select
            className='w-full'
            id='city'
            name='city'
            isClearable
            onChange={(e) => handlePageSizeChange(e)}
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
            options={paginationLimitOptions}
          />
        </div>
      </div>
    </>
  )
}

export default FindUserSection
