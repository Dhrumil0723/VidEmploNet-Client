import React from 'react'

const InterviewCountCard = (props) => {
  return (
      <div className='bg-white p-6 space-5'>
          <div className='bg-[#D2ECEB] p-6'>
              <p className='mb-4 text-xl font-medium'>{props.title}</p>
              <p className='text-5xl text-[#00AEB3]'>{props.number}</p>
          </div>
      </div>
  )
}

export default InterviewCountCard
