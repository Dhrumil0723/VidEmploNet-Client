import axios from 'axios'
import { ErrorMessage, Form, Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaEye, FaHouseMedicalCircleExclamation } from 'react-icons/fa6'
import { IoEyeOff } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import bg from '../asserts/images/bg-img.png'
import logo from '../asserts/images/logo.png'
import TextError from '../components/Common/TextError'
import { FormikProvider } from 'formik'

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Enter at least 2 characters for last name')
    .matches(/[^0-9]/, 'Name should not contain any Numbers')
    .matches(/[\w]/, 'Name should not have symbols')
    .required('Last name is required'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid Email'
    )
    .email('Invalid Email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is Required!')
    .min(6, 'Password should be 6 chars minimum.')
    .max(16, 'Password should be 16 chars maximum.')
    .matches(/[a-zA-Z]/, 'Password should contain at least one character')
    .matches(/[0-9]/, 'Password should contain Numbers')
    .matches(/[^\w]/, 'Password requires a symbol'),
  confirmPass: Yup.string()
    .required('Confirm Password is Required!')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  mobile_Number: Yup.string()
    .matches(/^\d{10}$/, 'Please enter a valid 10-digit mobile number')
    .required('Mobile Number is required'),
  role: Yup.string().required('Role is required'),
  company_Name: Yup.string().when('role', {
    is: 'recruiter',
    then: () => Yup.string().required('Company Name is required'),
    otherwise: () => Yup.string().notRequired()
  }),
  company_URL: Yup.string().when('role', {
    is: 'recruiter',
    then: () =>
      Yup.string().url('Invalid URL').required('Company URL is required'),
    otherwise: () => Yup.string().notRequired()
  })
})

const Signup = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [signedIn, setSignedIn] = useState(false)

  const formik = useFormik({
    initialValues: {
      firstName: '',
      last_Name: '',
      email: '',
      confirmpass: '',
      password: '',
      mobile_Number: '',
      role: 'candidate',
      company_Name: '',
      company_URL: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(JSON.stringify(values, null, 2))
      try {
        const response = await axios.post('/signup', values)
        if (response.data.code === 200) {
          toast.success(response.data.message)
          setSignedIn(true)
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  const { values, setFieldValue, errors, setErrors, touched, setTouched } = formik

  if (signedIn) {
    navigate('/dashboard')
  }

  return (
    <FormikProvider value={formik}>
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div
        className='fixed inset-0 bg-cover bg-center z-0'
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      <div className='z-10 p-6 bg-white shadow-lg max-w-3xl w-full my-8'>
        <div className='flex justify-center'>
          <img className='h-12 mb-4' src={logo} alt='Logo' />
        </div>
        <h2 className='text-3xl font-bold text-gray-800 mb-4'>Signup</h2>
        <p>
          Already have an account?
          <button
            onClick={() => navigate('/login')}
            className='font-semibold text-gray-600 ml-1 mb-4 underline underline-offset-2'
          >
            Login
          </button>
        </p>
        <div className='border-b-2 mb-4'></div>
       
          <form onSubmit={() => {}}>
            <div className='mb-4'>
              <label
                htmlFor='role'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Role
              </label>
              <select
                id='role'
                name='role'
                onChange={() => {}}
                value={values.role}
                className='shadow border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              >
                <option value='candidate'>Candidate</option>
                <option value='recruiter'>Recruiter</option>
              </select>
              {errors.role && <p className='text-red-500'>{errors.role}</p>}
            </div>
            {console.log('==>', values)}
            <div className='flex justify-self-end'>
              <div className='mb-4  mr-4 w-full'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='name'
                >
                  First Name
                </label>
                <input
                  className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='firstName'
                  type='text'
                  name='firstName'
                  placeholder='Enter First Name'
                  maxLength={20}
                  onChange={(e) => {
                    let inputValue = e?.target?.value
                    let isValid = _alphabetRegex_.test(inputValue)
                    let fieldName = e?.target?.name
                    if (isValid || !inputValue) {
                      setFieldValue([fieldName], inputValue)
                    }
                  }}
                  value={values.firstName}
                  onBlur={(e) => {
                    let fieldName = e?.target?.name
                    setFieldValue(fieldName, values[fieldName]?.trim())
                  }}
                />
                {console.log('==>', errors)}
                {/* <ErrorMessage name='firstName' component={TextError} /> */}
                <ErrorMessage name='firstName' />
              </div>
              <div className='mb-4  mr-4 w-full'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='name'
                >
                  Last Name
                </label>
                <input
                  className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='first_Name'
                  type='text'
                  name='last_Name'
                  placeholder='Enter Last Name'
                  onChange={() => {}}
                  value={values.last_Name}
                  onBlur={() => {}}
                />
                {<p className='text-red-500'>{errors.last_Name}</p>}
              </div>
            </div>
            <div className='flex justify-self-end'>
              <div className='mb-4 mr-4 w-full'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='Enter email'
                >
                  Email
                </label>
                <input
                  className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  name='email'
                  placeholder='Enter Email'
                  onChange={() => {}}
                  value={values.email}
                  onBlur={() => {}}
                />
                {<p className='text-red-500'>{errors.email}</p>}
              </div>
              <div className='mb-4 w-full'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='mobile_Number'
                >
                  Mobile Number
                </label>
                <input
                  className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='mobile_Number'
                  type='number'
                  name='mobile_Number'
                  placeholder='Enter Mobile Number'
                  onChange={() => {}}
                  value={values.mobile_Number}
                  onBlur={() => {}}
                />
                {<p className='text-red-500'>{errors.mobile_Number}</p>}
              </div>
            </div>
            <div className='flex justify-self-end'>
              <div className='mb-4  mr-4 w-full'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='password'
                >
                  Password
                </label>
                <div className='flex shadow appearance-none border items-center py-4 px-3'>
                  <input
                    className='w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    placeholder='Create Password'
                    onChange={() => {}}
                    value={values.password}
                    onBlur={() => {}}
                  />
                  {showPassword ? (
                    <FaEye
                      className='cursor-pointer'
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  ) : (
                    <IoEyeOff
                      className='cursor-pointer'
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  )}
                </div>
                {<p className='text-red-500'>{errors.password}</p>}
              </div>
              <div className='mb-4 mr-4 w-full'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='confirmpass'
                >
                  Confirm Password
                </label>
                <div className='flex shadow appearance-none border items-center py-4 px-3'>
                  <input
                    className='w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='confirmpass'
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmpass'
                    placeholder='Confirm Password'
                    onChange={() => {}}
                    value={values.confirmpass}
                    onBlur={() => {}}
                  />
                  {showConfirmPassword ? (
                    <FaEye
                      className='cursor-pointer'
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    />
                  ) : (
                    <IoEyeOff
                      className='cursor-pointer'
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    />
                  )}
                </div>
                {<p className='text-red-500'>{errors.confirmpass}</p>}
              </div>
            </div>
            {values.role === 'recruiter' && (
              <div className='flex justify-self-end'>
                <div className='mb-4  mr-4 w-full'>
                  <label
                    htmlFor='company_Name'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Company Name
                  </label>
                  <input
                    id='company_Name'
                    name='company_Name'
                    type='text'
                    placeholder='Company Name'
                    onChange={() => {}}
                    onBlur={() => {}}
                    value={values.company_Name}
                    className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                  {errors.company_Name && (
                    <p className='text-red-500'>{errors.company_Name}</p>
                  )}
                </div>
                <div className='mb-4 w-full'>
                  <label
                    htmlFor='company_URL'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Company Website
                  </label>
                  <input
                    id='company_URL'
                    name='company_URL'
                    type='text'
                    placeholder='Enter Company URL'
                    onChange={() => {}}
                    onBlur={() => {}}
                    value={values.company_URL}
                    className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                  {errors.company_URL && (
                    <p className='text-red-500'>{errors.company_URL}</p>
                  )}
                </div>
              </div>
            )}
            <div className='flex items-center justify-between'>
              <button
                className='bg-[#005C69] w-full text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Signup
              </button>
            </div>
          </form>
        
      </div>
    </div></FormikProvider>
  )
}

export default Signup
