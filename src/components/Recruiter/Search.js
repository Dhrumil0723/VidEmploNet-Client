import React from 'react'
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className='flex gap-4 items-center'>
      <div className='bg-white flex items-center p-1 w-full'>
      <CiSearch className='text-2xl text-[#00AEB3]' />
      <input type='search' placeholder='Search' className='border-none outline-none w-full pl-2 py-1 ' />
      </div>
      {/* <div className='bg-white p-2 items-center'><CiSearch className='text-2xl' /></div> */}
    </div>
  )
}

export default Search
