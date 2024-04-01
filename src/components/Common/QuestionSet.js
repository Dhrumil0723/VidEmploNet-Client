import React from 'react'
import Question from './Question'

const QuestionSet = () => {
  return (
    <>
        <div className='flex justify-between mt-4'>
            <p className='font-semibold text-xl'>Question Set</p>
            <button className='text-[#005C69] bg-[#D2ECEB] px-4 py-2'>ADD QUESTION</button>
        </div>
        <Question />
    </>
  )
}

export default QuestionSet