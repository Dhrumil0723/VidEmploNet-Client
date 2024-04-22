import React, { useState, useEffect } from 'react'
import InterviewCountCard from '../../../components/Recruiter/InterviewCountCard'
import JobCard from '../../../components/Recruiter/JobCard'
import Calendar from 'react-calendar'
import axios from 'axios'

const Dashboard = () => {
  let cardData = [
    { title: 'Total Candidates', number: 123 },
    { title: 'Total Interview Done', number: 123 },
    { title: 'Interview Pending', number: 123 }
  ]

  const [date, setDate] = useState(new Date())

  const [jobData, setJobData] = useState([])

  const fetchJob = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/job')
      setJobData(response?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchJob()
  }, [])

  const onChange = (value) => {
    setDate(value)
  }

  const tileClassName = ({ date }) => {
    if (
      date.getDate() === new Date().getDate() &&
      date.getMonth() + 1 === new Date().getMonth() + 1
    ) {
      return 'bg-[#00AEB3] rounded text-white'
    }
    return ''
  }

  return (
    <div className='grid grid-cols-3 gap-6 bg-[#D2ECEB]'>
      <div className='col-span-2'>
        <div className='flex'>
          {cardData.map((card, index) => (
            <InterviewCountCard title={card.title} number={card.number} />
          ))}
        </div>
      </div>
      <div className='calendar-main '>
        <Calendar
          prev2Label={null}
          next2Label={null}
          onChange={onChange}
          tileClassName={tileClassName}
        />
      </div>
      <div className='col-span-3'>
      <div className='bg-white p-6'>
          <div className='font-medium text-xl'>Current Job openings</div>
        <div className='grid grid-cols-3 gap-6'>
          {jobData.map((data, key) => (
              <JobCard data={data} />
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Dashboard
