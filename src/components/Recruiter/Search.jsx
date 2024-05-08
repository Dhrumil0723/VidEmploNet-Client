import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

const Search = ({ value, onChange }) => {
//   const [searchText, setSearchText] = useState("")

//   const handleDebounceValue = useDebounce(searchText, 2000)

//   const handleInputChange = (e) => {
//  setSearchText(e?.target?.value)
//   }

  return (
    <div className='flex gap-4 items-center w-full'>
      <div className='bg-[#D2ECEB] flex items-center p-1 w-full'>
        <input
          type='search'
          placeholder='Search'
          value={value}
          className='bg-[#D2ECEB] border-none outline-none w-full pl-2 py-1'
          onChange={onChange}
        />
        <CiSearch className='text-2xl text-[#00AEB3]' />
      </div>
    </div>
  )
}

export default Search
