import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

const Search = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("")
  const handleInputChange = (e) => {
 setSearchText(e?.target?.value)
  }

  return (
    <div className='flex gap-4 items-center w-1/3'>
      <div className='bg-[#D2ECEB] flex items-center p-1 w-full'>
        <input
          type='search'
          placeholder='Search'
          className='bg-[#D2ECEB] border-none outline-none w-full pl-2 py-1'
          onChange={handleInputChange}
        />
        <CiSearch className='text-2xl text-[#00AEB3]' onClick={() => handleSearch(searchText)} />
      </div>
    </div>
  )
}

export default Search
