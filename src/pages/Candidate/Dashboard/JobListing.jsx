import React, { useEffect, useState } from 'react'
import FindJobSection from '../../../components/Candidate/FindJobSection'
import FilterOption from '../../../components/Candidate/FilterOption'
import JobListingCard from '../../../components/Candidate/JobListingCard'
import axios from 'axios'
import { useImmer } from 'use-immer'
import ReactPaginate from 'react-paginate'
import useDebounce from '../../../hooks/useDebounce '

const JobListing = () => {
  const [jobData, setJobData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const debouncedSearchQuery = useDebounce(searchQuery, 2000)

  const [filterData, setFilterData] = useImmer({
    totalPages: 1,
    currentPage: 1,
    pageSize: 6,
    city: '',
    filterDateTime: ''
  })

  const fetchJob = async (search) => {
    try {
      const response = await axios.get(
        `api/job?page=${filterData.currentPage}&limit=${filterData.pageSize}&city=${filterData.city}&filterDateTime=${filterData.filterDateTime}&search=${search}`
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

  // console.log(jobData)

  useEffect(() => {
    fetchJob(debouncedSearchQuery)
  }, [filterData, debouncedSearchQuery])

  const handlePageClick = (selectedPage) => {
    setFilterData((draft) => {
      draft.currentPage = selectedPage.selected + 1
    })
  }

  const handleCityChange = (selectedOption) => {
    if (selectedOption) {
      setFilterData((draft) => {
        draft.city = selectedOption.value
        draft.currentPage = 1
      })
    } else {
      setFilterData((draft) => {
        draft.city = ''
        draft.currentPage = 1
      })
    }
  }

  const handleFilterDateTimeChange = (selectedOption) => {
    if (selectedOption) {
      setFilterData((draft) => {
        draft.filterDateTime = selectedOption.value
        draft.currentPage = 1
      })
    } else {
      setFilterData((draft) => {
        draft.filterDateTime = ''
        draft.currentPage = 1
      })
    }
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
      <FindJobSection
        value={searchQuery}
        onChange={(e) => setSearchQuery(e?.target?.value)}
        handleCityChange={handleCityChange}
        handleFilterDateTimeChange={handleFilterDateTimeChange}
      />
      <div className=' px-16 py-8 '>
        {/* <FilterOption /> */}
        <div className='bg-white p-4'>
          <p className='font-semibold text-xl'>Job Openings</p>
          <div className='grid grid-cols-3 gap-6'>
            {jobData.map((data, key) => (
              <JobListingCard data={data} />
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
      </div>
    </>
  )
}

export default JobListing
