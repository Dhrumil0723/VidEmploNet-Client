import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TextError from '../../../components/Common/TextError'
import { _alphabetRegex_ } from '../../../lib/Regex'
import Select from 'react-select'
import {
  cityOptions,
  employeesOptions,
  typeOfCompanyOptions
} from '../../../lib/Common/AllGlobalFunction'
import CkEditor from '../../../components/CKEditor/CKEditor'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { parseCookies } from 'nookies'

const validationSchema = Yup.object({
  companyLogo: Yup.string().required(),
  companyName: Yup.string().required('Company Name is required'),
  typeOfCompany: Yup.string().required('Type Of Company is required'),
  companyEmployees: Yup.string().required('Employees is required'),
  companyLocation: Yup.string().required('Location is required'),
  companyEmail: Yup.string()
    .email('Invalid Email')
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Enter correct Email'
    )
    .required('Company Email is required'),
  companyURL: Yup.string().required('Company Url is required'),
  aboutCompany: Yup.string().required('About Company Url is required')
})

const initialValues = {
  companyLogo: '',
  companyName: '',
  typeOfCompany: '',
  companyEmployees: '',
  companyLocation: '',
  companyEmail: '',
  companyURL: '',
  aboutCompany: ''
}

const editorConfig = {
  ckfinder: {
    uploadUrl: ''
  }
}

const EditAboutCompany = () => {
  const cookies = parseCookies()

  const navigate = useNavigate()

  const user = cookies?.user?.length > 0 ? JSON.parse(cookies?.user) : ''

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = new FormData()
      for (const key in values) {
        data.append(key, values[key])
      }

      for (var pair of data.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }

      // console.log(data)
      const response = await axios.put(`/api/recruiter?id=${user?._id}`, data)
      if (response?.data?.code === 200) {
        resetForm({ values: '' })
        toast.success(response.data.message)
        navigate(-1)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(`Something went wrong !! ${error}`)
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/recruiter?id=${user?._id}`)
      setValues(response?.data?.data)
    } catch (error) {
      console.log('Something went wrong!!', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  })

  const { values, setFieldValue, touched, errors, setValues } = formik

  // console.log(values)

  return (
    <>
      <div className='bg-white p-4'>
        <form onSubmit={formik?.handleSubmit}>
          <input
            type='file'
            onChange={(e) => {
              // console.log(e.target.files)
              setFieldValue('companyLogo', e.target.files[0])
            }}
            name='companyLogo'
          />

          <div className='flex justify-self-end mt-6'>
            <div className='mb-4  mr-4 w-full'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='companyName'
              >
                Company Name
              </label>
              <input
                className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='companyName'
                type='text'
                name='companyName'
                placeholder='Enter Company Name'
                maxLength={30}
                onChange={(e) => {
                  let inputValue = e?.target?.value
                  let isValid = _alphabetRegex_.test(inputValue)
                  let fieldName = e?.target?.name
                  if (isValid || !inputValue) {
                    setFieldValue([fieldName], inputValue)
                  }
                }}
                value={values.companyName}
                onBlur={(e) => {
                  let fieldName = e?.target?.name
                  setFieldValue(fieldName, values[fieldName]?.trim())
                }}
              />
              <TextError>{touched.companyName && errors.companyName}</TextError>
            </div>
            <div className='mb-4 w-full'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='name'
              >
                Type Of Company
              </label>
              <div className='selector'>
                <Select
                  className='shadow '
                  id='typeOfCompany'
                  name='typeOfCompany'
                  isClearable
                  value={typeOfCompanyOptions.find(
                    (option) => option.value === values.typeOfCompany
                  )}
                  onChange={(e) => {
                    setFieldValue('typeOfCompany', e?.value)
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
                  options={typeOfCompanyOptions}
                />
              </div>
              <TextError>
                {touched.typeOfCompany && errors.typeOfCompany}
              </TextError>
            </div>
          </div>
          <div className='flex justify-self-end mt-6'>
            <div className='mb-4  mr-4 w-full'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='name'
              >
                Employees
              </label>
              <div className='selector'>
                <Select
                  className='shadow '
                  id='companyEmployees'
                  name='companyEmployees'
                  isClearable
                  value={employeesOptions.find(
                    (option) => option.value === values.companyEmployees
                  )}
                  onChange={(e) => {
                    setFieldValue('companyEmployees', e?.value)
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
                  options={employeesOptions}
                />
              </div>
              <TextError>
                {touched.companyEmployees && errors.companyEmployees}
              </TextError>
            </div>
            <div className='mb-4 w-full'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='name'
              >
                Location
              </label>
              <div className='selector'>
                <Select
                  className='shadow '
                  id='companyLocation'
                  name='companyLocation'
                  isClearable
                  value={cityOptions.find(
                    (option) => option.value === values.companyLocation
                  )}
                  onChange={(e) => {
                    setFieldValue('companyLocation', e?.value)
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
              <TextError>
                {touched.typeOfCompany && errors.typeOfCompany}
              </TextError>
            </div>
          </div>
          <div className='flex justify-self-end mt-6'>
            <div className='mb-4  mr-4 w-full'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='companyEmail'
              >
                Company Email
              </label>
              <input
                className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='companyEmail'
                type='email'
                name='companyEmail'
                placeholder='Enter Company Email'
                maxLength={50}
                onChange={(e) => {
                  setFieldValue('companyEmail', e?.target?.value)
                }}
                value={values.companyEmail}
                onBlur={(e) => {
                  let fieldName = e?.target?.name
                  setFieldValue(fieldName, values[fieldName]?.trim())
                }}
              />
              <TextError>
                {touched.companyEmail && errors.companyEmail}
              </TextError>
            </div>
            <div className='mb-4 w-full'>
              <label
                htmlFor='company_URL'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Company Website
              </label>
              <input
                className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='companyURL'
                name='companyURL'
                type='text'
                placeholder='Enter Company URL'
                maxLength={100}
                onChange={(e) => {
                  setFieldValue('companyURL', e?.target?.value)
                }}
                value={values.companyURL}
                onBlur={(e) => {
                  let fieldName = e?.target?.name
                  setFieldValue(fieldName, values[fieldName]?.trim())
                }}
              />
              <TextError>{touched.companyURL && errors.companyURL}</TextError>
            </div>
          </div>
          <div>
            <label
              className='block text-gray-700 text-sm font-bold mb-2 mt-2'
              htmlFor='aboutCompany'
            >
              About Company
            </label>
            <div className='edit-v-contains'>
              <CkEditor
                config={editorConfig}
                data={
                  formik?.values?.aboutCompany
                    ? formik?.values?.aboutCompany
                    : '<p></p>'
                }
                onChange={(event, editor) => {
                  const data = editor.getData()
                  formik?.setFieldValue('aboutCompany', data)
                }}
                placeholder='Enter About Company'
                onBlur={() => {
                  formik?.setFieldValue(
                    'jobDescription',
                    formik?.values?.aboutCompany?.trim()
                  )
                }}
              />
            </div>
            <TextError>{touched.companyName && errors.companyName}</TextError>
          </div>
          <div className='text-center mt-8'>
            <button
              className='bg-[#005C69] py-2 px-6 w-full text-white font-medium'
              type='submit'
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditAboutCompany
