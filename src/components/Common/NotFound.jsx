import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <>
        <div className='flex justify-center items-center flex-col px-6 py-4 gap-8'>
            <p className='text-6xl'>404</p>
            <p>Page Not Found</p>
            <p>Sorry, the page you are looking for does not exist.</p>
            <button onClick={()=>navigate('/login')} className='bg-[#005C69] w-full text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline' type='submit'>
                Home
            </button>
        </div>
    </>
  )
}

export default NotFound