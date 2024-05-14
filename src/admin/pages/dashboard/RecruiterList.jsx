import React, { useEffect, useLayoutEffect, useState } from 'react'
import FindUserSection from '../../components/FindUserSection'
import { useImmer } from 'use-immer'
import useDebounce from '../../../hooks/useDebounce '
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import { HiOutlinePencil } from 'react-icons/hi2'
import { RiDeleteBinLine } from 'react-icons/ri'
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'

const RecruiterList = () => {
  const [recruiterData, setRecruiterData] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const debouncedSearchQuery = useDebounce(searchQuery, 2000)

  const [filterData, setFilterData] = useImmer({
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
    userStatus: ''
  })

  const fetchData = async (search) => {
    try {
      const response = await axios.get(
        `api/recruiter/all?page=${filterData.currentPage}&limit=${filterData.pageSize}&search=${search}&userStatus=${filterData.userStatus}`
      )
      if (response && response?.data) {
        setRecruiterData(response?.data)

        setFilterData((draft) => {
          draft.totalPages = response?.data?.pagination?.totalPages
        })
      }
    } catch (error) {
      console.log('Something went wrong!!', error)
    }
  }

  useEffect(() => {
    fetchData(debouncedSearchQuery)
  }, [debouncedSearchQuery, filterData])

  // useLayoutEffect(()=>{
  //   fetchData(debouncedSearchQuery)
  // },[debouncedSearchQuery, recruiterData])

  const handlePageClick = (selectedPage) => {
    setFilterData((draft) => {
      draft.currentPage = selectedPage.selected + 1
    })
  }

  const handleUserStatusChange = (selectedOption) => {
    if (selectedOption) {
      setFilterData((draft) => {
        draft.userStatus = selectedOption.value
        draft.currentPage = 1
      })
    } else {
      setFilterData((draft) => {
        draft.userStatus = ''
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
        draft.pageSize = 10
        draft.currentPage = 1
      })
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      })

      if (result.isConfirmed) {
        const response = await axios.delete(`api/admin/user?id=${id}`)

        if (response?.data?.code === 200) {
          toast.success(response.data.message)
          // fetchData(debouncedSearchQuery)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.error('Something went wrong!!', error)
      toast.error('Something went wrong while deleting the job.')
    }
  }

  return (
    <>
      <FindUserSection
        value={searchQuery}
        onChange={(e) => setSearchQuery(e?.target?.value)}
        handleUserStatusChange={handleUserStatusChange}
        handlePageSizeChange={handlePageSizeChange}
      />
      <div className='lg:w-auto xl:w-full bg-white mt-6 px-4 py-2 shadow'>
        <table className='table-auto w-full'>
          <thead>
            <tr className='border-b-2 border-grey-200'>
              <th className='text-gray-500 py-2 text-left'>ID</th>
              <th className='text-gray-500 text-left'>Name</th>
              <th className='text-gray-500 text-left'>Email</th>
              <th className='text-gray-500 text-left'>Status</th>
              <th className='text-gray-500 text-left'>Action</th>
            </tr>
          </thead>
          {recruiterData?.data?.map((data, index) => (
            <tbody>
              <tr key={index} className='border-b-2 border-grey-200'>
                <td className='py-2'>
                  {(filterData.currentPage - 1) * filterData.pageSize +
                    index +
                    1}
                </td>
                <td>{data?.firstName + ' ' + data?.lastName}</td>
                <td>{data?.email}</td>
                <td>
                  <span
                    className={` py-1 px-2 rounded-lg my-2 ${
                      data.userStatus == 'Active'
                        ? 'text-[#027A48] bg-[#D1FADF]'
                        : 'text-[#B54708] bg-[#FEF0C7]'
                    }`}
                  >
                    {data?.userStatus}
                  </span>
                </td>
                <td className='flex items-center gap-4 py-2'>
                  <HiOutlinePencil className='text-[#00AEB3] text-xl cursor-pointer' />
                  <RiDeleteBinLine className='text-[#B42318] text-xl cursor-pointer' onClick={()=>handleDeleteUser(data?._id)} />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
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

export default RecruiterList
