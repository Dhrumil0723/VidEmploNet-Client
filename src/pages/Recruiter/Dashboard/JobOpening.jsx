import React, { useEffect, useState } from 'react'
import axios from 'axios'
import JobCard from '../../../components/Recruiter/JobCard'
import Search from '../../../components/Recruiter/Search'
import ReactPaginate from 'react-paginate'
import Select from 'react-select'
import { pageSizeOptions } from '../../../lib/Common/AllGlobalFunction'
import { useImmer } from 'use-immer'
import useDebounce from '../../../hooks/useDebounce '
import { parseCookies } from 'nookies'

const JobOpening = () => {
  const [jobData, setJobData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const cookies = parseCookies()

  const user = cookies?.user?.length > 0 ? JSON.parse(cookies?.user) : ''

  const debouncedSearchQuery = useDebounce(searchQuery, 2000)

  const [filterData, setFilterData] = useImmer({
    totalPages: 1,
    currentPage: 1,
    pageSize: 3
  })

  const fetchJob = async (search) => {
    try {
      const response = await axios.get(
        `api/job/specific?id=${user?._id}&page=${filterData.currentPage}&limit=${filterData.pageSize}&search=${search}`
      )
      if (response && response?.data) {
        setJobData(response?.data?.data)
        // Update totalPages directly, no need for a function
        setFilterData((draft) => {
          draft.totalPages = response?.data?.pagination?.totalPages
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchJob(debouncedSearchQuery)
  }, [filterData, debouncedSearchQuery])

  const handlePageClick = (selectedPage) => {
    setFilterData((draft) => {
      draft.currentPage = selectedPage.selected + 1
    })
  }

  const handlePageSizeChange = (selectedOption) => {
    if (selectedOption) {
      setFilterData((draft) => {
        draft.pageSize = selectedOption.value
        draft.currentPage = 1
      })
    } else {
      setFilterData((draft) => {
        draft.pageSize = 3
        draft.currentPage = 1
      })
    }
  }

  return (
    <>
      <div className='bg-white p-6'>
        <div className='flex justify-between'>
          <div className='font-medium text-xl'>Current Job openings</div>
          <div className='flex gap-8'>
          <Search
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
          <Select
            className='w-64'
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
          </div>
        </div>
        <div className='grid grid-cols-3 gap-6'>
          {jobData.map((data, key) => (
            <JobCard data={data} key={key} />
          ))}
        </div>
        <div className='flex justify-end mt-4'>
          <ReactPaginate
            className='flex gap-4'
            breakLabel='...'
            pageCount={filterData.totalPages}
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
