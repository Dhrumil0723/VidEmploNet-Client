import React from 'react'
import Select from 'react-select'
import logo from '../../../asserts/images/profile-photo.png'

const CandidatesList = () => {
  return (
    <>
      <div className='bg-white p-6'>
        <div className='flex gap-6'>
          <Select
            id='role'
            name='role'
            isClearable
            // onChange={(e) => {
            //   setFieldValue('roleLable', e?.lable)
            //   setFieldValue('role', e?.value)
            // }}
            // value={values.roleLable}
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
            // options={signUpOptions}
          />
          <Select
            id='role'
            name='role'
            isClearable
            // onChange={(e) => {
            //   setFieldValue('roleLable', e?.lable)
            //   setFieldValue('role', e?.value)
            // }}
            // value={values.roleLable}
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
            // options={signUpOptions}
          />
          <Select
            id='role'
            name='role'
            isClearable
            // onChange={(e) => {
            //   setFieldValue('roleLable', e?.lable)
            //   setFieldValue('role', e?.value)
            // }}
            // value={values.roleLable}
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
            // options={signUpOptions}
          />
        </div>
        <div className='border-b-2 border-[#35BEC1] my-6'></div>
        <div className='border p-4'>
          <div className='flex justify-center items-center gap-4'>
            <div>
              <img src={logo} />
            </div>
            <div>
              <p className='font-bold'>Kenneth Allen</p>
              <p>eddie_lake@gmail.com</p>
            </div>
          </div>
          <div className='border-b-2 border-[#35BEC1] my-6'></div>
          <div>
            <div className='flex justify-center items-center'>
                2 years
            </div>
            <div className='flex justify-center items-center'>
                Mumbai, India
            </div>
            <div className='border-b-2 border-[#35BEC1] my-6'></div>
            <div className='text-[#027A48]'>Accepted</div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default CandidatesList
