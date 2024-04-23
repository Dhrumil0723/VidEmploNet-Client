import React, { useEffect, useState } from 'react'
import axios from 'axios'
import JobCard from '../../../components/Recruiter/JobCard'
import Search from '../../../components/Recruiter/Search'
import ReactPaginate from 'react-paginate'
import Select from 'react-select'
import { pageSizeOptions } from '../../../lib/Common/AllGlobalFunction'

const JobOpening = () => {
  const [jobData, setJobData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchJob = async (page, size, search) => {
    try {
      const response = await axios.get(
        `api/job?page=${page}&limit=${size}&search=${search}`
      );
      // console.log('Response:', response);
      setJobData(response?.data?.data);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchJob(currentPage, pageSize, searchQuery)
  }, [currentPage, pageSize, searchQuery])

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1)
  }

  const handlePageSizeChange = (selectedOption) => {
    if (selectedOption) {
      setPageSize(selectedOption.value)
      // After changing page size, reset to the first page
      setCurrentPage(1)
    } else {
      setPageSize(3)
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e)
    console.log("e ==>", e)
    // After performing a search, reset to the first page
    setCurrentPage(1)
  }

  return (
    <>
      <div className='bg-white p-6'>
        <div className='flex justify-between'>
          <div className='font-medium text-xl'>Current Job openings</div>
          <Search handleSearch={handleSearch} />
        </div>
        <div className='grid grid-cols-3 gap-6'>
          {jobData.map((data, key) => (
            <JobCard data={data} key={key} />
          ))}
        </div>
        <div className='flex justify-around mt-4'>
          <Select
            className='shadow'
            id='pageSize'
            name='pageSize'
            isClearable
            options={pageSizeOptions}
            onChange={handlePageSizeChange}
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
          />
          <ReactPaginate
            className='flex gap-4'
            breakLabel='...'
            pageCount={totalPages}
            renderOnZeroPageCount={0}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    </>
  )
}

export default JobOpening
