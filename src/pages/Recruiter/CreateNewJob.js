import React from 'react'
import CkEditor from '../../components/CKEditor/CKEditor';
import { useFormik, } from 'formik'
import QuestionSet from '../../components/Common/QuestionSet'

const CreateNewJob = () => {

  const editorConfig = {
    ckfinder: {
      uploadUrl: '',
    },
  };

  const formik = useFormik({
    initialValues: {
      job_Title: '',
      description: '',
    }
  })

  return (
    <div className='bg-white p-6'>
      <div className='flex justify-self-end'>
            <div className='mb-4  mr-4 w-full'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='job_title'
              >
                Job Title
              </label>
              <input
                className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='job_title'
                type='text'
                name='job_title'
                placeholder='Enter job title'
              />
              {/* {<p className='text-red-500'>{formik.errors.full_Name}</p>} */}
            </div>
            <div className='mb-4 w-full'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='salary'
              >
                Enter Salary Range
              </label>
              <input
                className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                type='email'
                name='email'
                placeholder='Enter Email'
              />
              {/* {<p className='text-red-500'>{formik.errors.email}</p>} */}
            </div>
      </div>
      <div className='flex justify-self-end'>
            <div className='mb-4  mr-4 w-full'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='job_title'
              >
                Experience in year
              </label>
              <input
                className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='job_title'
                type='text'
                name='job_title'
                placeholder='Enter experience in year'
              />
              {/* {<p className='text-red-500'>{formik.errors.full_Name}</p>} */}
            </div>
            <div className='mb-4 w-full'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='Enter email'
              >
                Job Type
              </label>
              <input
                className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                type='email'
                name='email'
                placeholder='Enter job type'
              />
              {/* {<p className='text-red-500'>{formik.errors.email}</p>} */}
            </div>
      </div>
      <div className='flex justify-self-end'>
            <div className='mb-4  mr-4 w-full'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='job_title'
              >
                Education Steam
              </label>
              <input
                className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='job_title'
                type='text'
                name='job_title'
                placeholder='Enter education steam'
              />
              {/* {<p className='text-red-500'>{formik.errors.full_Name}</p>} */}
            </div>
            <div className='mb-4 w-full'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='Enter email'
              >
                Course
              </label>
              <input
                className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                type='email'
                name='email'
                placeholder='Enter course'
              />
              {/* {<p className='text-red-500'>{formik.errors.email}</p>} */}
            </div>
      </div>
      <div className='flex justify-self-end'>
            <div className='mb-4  mr-4 w-full'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='job_title'
              >
                State
              </label>
              <input
                className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='job_title'
                type='text'
                name='job_title'
                placeholder='Enter state'
              />
              {/* {<p className='text-red-500'>{formik.errors.full_Name}</p>} */}
            </div>
            <div className='mb-4 w-full'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='Enter email'
              >
                City
              </label>
              <input
                className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                type='email'
                name='email'
                placeholder='Enter Email'
              />
              {/* {<p className='text-red-500'>{formik.errors.email}</p>} */}
            </div>
      </div>
          <div className='mb-4 w-full'>
          <select className='shadow border py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                <option disabled selected>Select Time</option>
                <option>30 Second</option>
                <option>1 minute</option>
            </select>
            {/* {<p className='text-red-500'>{formik.errors.full_Name}</p>} */}
      </div>
      <div>
        <div className='border-b-2 border-[#D0D5DD]'></div>
        <label className='block text-gray-700 text-sm font-bold mb-2 mt-2' htmlFor='job_title'>
          Job Description
        </label>
        <div className='edit-v-contains'>
                <CkEditor
                config={editorConfig}
                  data={
                    formik?.values?.description
                      ? formik?.values?.description
                      : '<p></p>'
                  }
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    formik?.setFieldValue('description', data)
                  }}
                  onBlur={() => {
                    formik?.setFieldValue(
                      'description',
                      formik?.values?.description?.trim()
                    )
                  }}
                />
              </div>
      </div>
      <QuestionSet />
    </div>
  )
}

export default CreateNewJob

