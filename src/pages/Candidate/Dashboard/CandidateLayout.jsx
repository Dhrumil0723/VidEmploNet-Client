import React from 'react'
import CandidateHeader from '../../../components/Candidate/CandidateHeader'
import { Outlet } from 'react-router-dom'

const CandidateLayout = () => {
  return (
    <>
      <div className='bg-[#EAECF0]'>
        <CandidateHeader />
        <Outlet />
      </div>
    </>
  )
}

export default CandidateLayout
