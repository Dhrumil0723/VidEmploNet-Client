import React, { useEffect, useState } from 'react'
import CkEditor from '../../../components/CKEditor/CKEditor'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import TextError from '../../../components/Common/TextError'
import {
  workingModeOptions,
  jobTypeOptions,
  educationStreamOptions,
  courseOptions,
  countryOptions,
  cityOptions,
  stateOptions
} from '../../../lib/Common/AllGlobalFunction'
import Select from 'react-select'
import {
  _alphabetRegex_,
  _experienceRegex_,
  _salaryRegex_
} from '../../../lib/Regex'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Question from '../../../components/Common/Question'
import { parseCookies } from 'nookies'
import { useNavigate, useParams } from 'react-router-dom'

const validationSchema = Yup.object({
  jobTitle: Yup.string().required('Job Title is required'),
  salaryRange: Yup.string()
    .required('Salary Range is required')
    .matches(_salaryRegex_, 'Invalid Input'),
  jobExperience: Yup.string().required('Experience is required'),
  jobType: Yup.string().required('Job Type is required'),
  educationStream: Yup.string().required('Education Stream is required'),
  workingMode: Yup.string().required('Working Model is required'),
  course: Yup.string().required('Course is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required')
})

const initialVal = {
  jobTitle: '',
  salaryRange: '',
  jobExperience: '',
  jobType: '',
  educationStream: '',
  workingMode: '',
  course: '',
  country: '',
  state: '',
  city: '',
  jobDescription: '',
  questions: []
}

const editorConfig = {
  ckfinder: {
    uploadUrl: ''
  }
}

const CreateNewJob = () => {
  const { id } = useParams()
  const [questions, setQuestions] = useState([])
  const cookies = parseCookies()
  const navigate = useNavigate()
  const user = cookies?.user?.length > 0 ? JSON.parse(cookies?.user) : ''

  const handleSubmit = async (values, { resetForm }) => {
    try {
      values = { ...values, questions, recruiterId: user._id }
      console.log(values)
      const response = id
        ? await axios.put(`/api/job/${id}`, values)
        : await axios.post('/api/job', values)
      if (response?.data?.code === 200) {
        resetForm({ values: '' })
        toast.success(response.data.message)
        navigate(-1)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Something went wrong !!')
    }
  }

  const formik = useFormik({
    initialValues: initialVal,
    validationSchema,
    onSubmit: handleSubmit
  })

  const { values, setFieldValue, touched, errors, setValues } = formik

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/job/${id}`)
      setValues(response?.data?.data?.job)

      id && setQuestions(response?.data?.data?.questions)
    } catch (error) {
      console.log('Something went wrong!!', error)
    }
  }

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id])

  return (
    <form onSubmit={formik?.handleSubmit}>
      <div className='bg-white p-6'>
        <div className='flex justify-self-end'>
          <div className='mb-4  mr-4 w-full'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='jobTitle'
            >
              Job Title
            </label>
            <input
              className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='jobTitle'
              type='text'
              name='jobTitle'
              placeholder='Enter job title'
              maxLength={50}
              onChange={(e) => {
                let inputValue = e?.target?.value
                let isValid = _alphabetRegex_.test(inputValue)
                let fieldName = e?.target?.name
                if (isValid || !inputValue) {
                  setFieldValue([fieldName], inputValue)
                }
              }}
              value={values.jobTitle}
              onBlur={(e) => {
                let fieldName = e?.target?.name
                setFieldValue(fieldName, values[fieldName]?.trim())
              }}
            />
            {/* <ErrorMessage name='jobTitle' component={TextError} /> */}
            <TextError>{touched.jobTitle && errors.jobTitle}</TextError>
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
              id='salaryRange'
              type='text'
              name='salaryRange'
              placeholder='Enter Salary Range'
              maxLength={35}
              onChange={(e) => {
                let inputValue = e?.target?.value
                // let isValid = _salaryRegex_.test(inputValue)
                let fieldName = e?.target?.name
                setFieldValue([fieldName], inputValue)
                // if (isValid || !inputValue) {
                // }
              }}
              value={values.salaryRange}
              onBlur={(e) => {
                let fieldName = e?.target?.name
                setFieldValue(fieldName, values[fieldName]?.trim())
              }}
            />
            {/* <ErrorMessage name='salaryRange' component={TextError} /> */}
            <TextError>{touched.salaryRange && errors.salaryRange}</TextError>

          </div>
        </div>
        <div className='flex justify-self-end'>
          <div className='mb-4  mr-4 w-full'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='jobExperience'
            >
              Experience in year
            </label>
            <input
              className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='jobExperience'
              type='text'
              name='jobExperience'
              placeholder='Enter experience in year'
              maxLength={2}
              onChange={(e) => {
                let inputValue = e?.target?.value
                let isValid = _experienceRegex_.test(inputValue)
                let fieldName = e?.target?.name
                if (isValid || !inputValue) {
                  setFieldValue([fieldName], inputValue)
                }
              }}
              value={values.jobExperience}
              onBlur={(e) => {
                let fieldName = e?.target?.name
                setFieldValue(fieldName, values[fieldName]?.trim())
              }}
            />
            {/* <ErrorMessage name='jobExperience' component={TextError} /> */}
            <TextError>{touched.jobExperience && errors.jobExperience}</TextError>

          </div>
          <div className='mb-4 w-full'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='jobType'
            >
              Job Type
            </label>
            <div className='selector'>
              <Select
                className='shadow '
                id='jobType'
                name='jobType'
                isClearable
                value={jobTypeOptions.find(
                  (option) => option.value === values.jobType
                )}
                onChange={(e) => {
                  if (e?.value) {
                    setFieldValue('jobType', e?.value)
                  } else {
                    setFieldValue('jobType', '')
                  }
                }}
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
                options={jobTypeOptions}
              />
            </div>
            {/* <ErrorMessage name='jobType' component={TextError} /> */}
            <TextError>{touched.jobType && errors.jobType}</TextError>
          </div>
        </div>
        <div className='flex justify-self-end'>
          <div className='mb-4  mr-4 w-full'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='educationStream'
            >
              Education Steam
            </label>
            <div className='selector'>
              <Select
                className='shadow'
                id='educationStream'
                name='educationStream'
                isClearable
                value={educationStreamOptions.find(
                  (option) => option.label === values.educationStream
                )}
                onChange={(e) => {
                  setFieldValue('educationStreamId', e?.value)
                  setFieldValue('educationStream', e?.label)
                }}
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
                options={educationStreamOptions}
              />
            </div>
            {/* <ErrorMessage name='educationStream' component={TextError} /> */}
            <TextError>{touched.educationStream && errors.educationStream}</TextError>
            
          </div>
          <div className='mb-4 w-full'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='course'
            >
              Course
            </label>
            <div className='selector'>
              <Select
                className='shadow'
                id='course'
                name='course'
                isClearable
                value={courseOptions.find(
                  (option) => option.value === values.course
                )}
                onChange={(e) => {
                  setFieldValue('course', e?.value)
                }}
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
                options={courseOptions?.filter(
                  (item) =>
                    item.educationStreamId == formik.values.educationStreamId
                )}
              />
            </div>
            {/* <ErrorMessage name='course' component={TextError} /> */}
            <TextError>{touched.course && errors.course}</TextError>
            
          </div>
        </div>
        <div className='flex justify-self-end'>
          <div className='mb-4  mr-4 w-full'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='workingMode'
            >
              Working Mode
            </label>
            <div className='selector'>
              <Select
                className='shadow'
                id='workingMode'
                name='workingMode'
                isClearable
                value={workingModeOptions.find(
                  (option) => option.value === values.workingMode
                )}
                onChange={(e) => {
                  setFieldValue('workingMode', e?.value)
                }}
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
                options={workingModeOptions}
              />
            </div>
            {/* <ErrorMessage name='workingMode' component={TextError} /> */}
            <TextError>{touched.workingMode && errors.workingMode}</TextError>

          </div>
          <div className='mb-4 w-full'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='country'
            >
              Country
            </label>
            <div className='selector'>
              <Select
                className='shadow'
                id='country'
                name='country'
                isClearable
                value={countryOptions.find(
                  (option) => option.value === values.country
                )}
                options={countryOptions}
                onChange={(e) => {
                  setFieldValue('country', e?.value)
                }}
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
            {/* <ErrorMessage name='country' component={TextError} /> */}
            <TextError>{touched.country && errors.country}</TextError>

          </div>
        </div>
        <div className='flex justify-self-end'>
          <div className='mb-4  mr-4 w-full'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='state'
            >
              State
            </label>
            <div className='selector'>
              <Select
                className='shadow'
                id='state'
                name='state'
                isClearable
                value={stateOptions.find(
                  (option) => option.value === values.state
                )}
                onChange={(e) => {
                  setFieldValue('state', e?.value)
                }}
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
                options={stateOptions}
              />
            </div>
            {/* <ErrorMessage name='state' component={TextError} /> */}
            <TextError>{touched.state && errors.state}</TextError>

          </div>
          <div className='mb-4 w-full'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='city'
            >
              City
            </label>
            <div className='selector'>
              <Select
                className='shadow'
                id='city'
                name='city'
                isClearable
                value={cityOptions.find(
                  (option) => option.value === values.city
                )}
                onChange={(e) => {
                  setFieldValue('city', e?.value)
                }}
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
                options={cityOptions}
              />
            </div>
            {/* <ErrorMessage name='city' component={TextError} /> */}
            <TextError>{touched.city && errors.city}</TextError>

          </div>
        </div>
        <div>
          <div className='border-b-2 border-[#D0D5DD]'></div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2 mt-2'
            htmlFor='jobDescription'
          >
            Job Description
          </label>
          <div className='edit-v-contains'>
            <CkEditor
              config={editorConfig}
              data={
                formik?.values?.jobDescription
                  ? formik?.values?.jobDescription
                  : '<p></p>'
              }
              onChange={(event, editor) => {
                const data = editor.getData()
                formik?.setFieldValue('jobDescription', data)
              }}
              onBlur={() => {
                formik?.setFieldValue(
                  'jobDescription',
                  formik?.values?.jobDescription?.trim()
                )
              }}
            />
          </div>
          {/* <ErrorMessage name='jobDescription' component={TextError} /> */}
          <TextError>{touched.jobDescription && errors.jobDescription}</TextError>

        </div>
        <Question questions={questions} setQuestions={setQuestions} />

        <div className='text-center mt-8'>
          <button
            className='bg-[#005C69] py-2 px-6 w-full text-white font-medium'
            type='submit'
          >
            {id ? 'Update Job' : 'Create Job'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreateNewJob
