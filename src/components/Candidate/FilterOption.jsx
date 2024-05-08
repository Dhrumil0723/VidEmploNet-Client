import React from 'react'

const FilterOption = () => {
  return (
    <>
      <div className='bg-white p-4'>
        <div>
          <p className='font-semibold text-lg'>Job Type</p>
          <input
            type='checkbox'
            id='full-time'
            name='employment-type'
            value='Full Time'
          />
          <label for='full-time'>Full Time</label>
          <br />
          <input
            type='checkbox'
            id='part-time'
            name='employment-type'
            value='Part Time'
          />
          <label for='part-time'>Part Time</label>
        </div>

        <div className='my-4'>
          <p className='font-semibold text-lg'>Salary Range</p>
          
        </div>
      </div>
    </>
  )
}

export default FilterOption
