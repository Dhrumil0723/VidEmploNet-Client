import axios from 'axios'
import { ErrorMessage, useFormik, FormikProvider } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaEye } from 'react-icons/fa6'
import { IoEyeOff } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import bg from '../../asserts/images/bg-img.png'
import logo from '../../asserts/images/logo.png'
import TextError from '../../components/Common/TextError'
import { _alphabetRegex_, _emailRegex_, _numberRegex_ } from '../../lib/Regex'
import Loader from '../../components/Common/Loader'
import Select from 'react-select'
import { signUpOptions } from '../../lib/Common/AllGlobalFunction'

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'Enter at least 2 characters for First Name')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(2, 'Enter at least 2 characters for Last Name')
    .required('Last Name is required'),
  email: Yup.string()
    .email('Invalid Email')
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Enter correct Email'
    )
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
  mobileNumber: Yup.string()
    .matches(_numberRegex_, 'Please enter valid mobile number')
    .required('Mobile Number is required'),
  gender: Yup.string().required('Gender is required'),
  role: Yup.string().required('Role is required'),
  companyName: Yup.string().when('role', {
    is: 'recruiter',
    then: () => Yup.string().required('Company Name is required'),
    otherwise: () => Yup.string().notRequired()
  }),
  companyURL: Yup.string().when('role', {
    is: 'recruiter',
    then: () =>
      Yup.string().url('Invalid URL').required('Company URL is required'),
    otherwise: () => Yup.string().notRequired()
  })
})

const UserSignUp = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loader, setLoader] = useState(false)

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoader(true)
      values = { ...values, userStatus: 'Active'}
      const response = await axios.post('api/user/signup', values)
      if (response?.data?.code === 200) {
        resetForm({ values: '' })
        toast.success(response.data.message)
        navigate('/login')
      } else {
        toast.error(response.data.message)
      }
      setLoader(false)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong !!')
      setLoader(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      confirmPass: '',
      password: '',
      mobileNumber: '',
      gender: '',
      role: '',
      companyName: '',
      companyURL: ''
    },
    validationSchema,
    onSubmit: handleSubmit
  })

  const { values, setFieldValue } = formik

  return (
    <>
      {loader && <Loader />}
      <FormikProvider value={formik}>
        <div className='flex items-center relative justify-center min-h-screen bg-gray-100'>
          <div
            className='absolute inset-0 bg-cover bg-center z-0'
            style={{ backgroundImage: `url(${bg})` }}
          ></div>

          <div className='z-10 p-6 bg-white shadow-lg max-w-3xl w-full my-8'>
            <div className='flex justify-center'>
              <img className='h-12 mb-4' src={logo} alt='Logo' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>SignUp</h2>
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
            <form onSubmit={formik?.handleSubmit}>
              <div className='mb-4 selector'>
                <label
                  htmlFor='role'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  Role
                </label>

                <Select
                  id='role'
                  name='role'
                  isClearable
                  onChange={(e) => {
                    setFieldValue('roleLable', e?.lable)
                    setFieldValue('role', e?.value)
                  }}
                  value={values.roleLable}
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
                  options={signUpOptions}
                />
              </div>
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
                  <ErrorMessage name='firstName' component={TextError} />
                </div>
                <div className='mb-4 w-full'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='name'
                  >
                    Last Name
                  </label>
                  <input
                    className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='lastName'
                    type='text'
                    name='lastName'
                    placeholder='Enter Last Name'
                    maxLength={20}
                    onChange={(e) => {
                      let inputValue = e?.target?.value
                      let isValid = _alphabetRegex_.test(inputValue)
                      let fieldName = e?.target?.name
                      if (isValid || !inputValue) {
                        setFieldValue([fieldName], inputValue)
                      }
                    }}
                    value={values.lastName}
                    onBlur={(e) => {
                      let fieldName = e?.target?.name
                      setFieldValue(fieldName, values[fieldName]?.trim())
                    }}
                  />
                  <ErrorMessage name='lastName' component={TextError} />
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
                    maxLength={50}
                    onChange={(e) => {
                      setFieldValue('email', e?.target?.value)
                    }}
                    value={values.email}
                    onBlur={(e) => {
                      let fieldName = e?.target?.name
                      setFieldValue(fieldName, values[fieldName]?.trim())
                    }}
                  />
                  <ErrorMessage name='email' component={TextError} />
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
                    id='mobileNumber'
                    type='text'
                    name='mobileNumber'
                    placeholder='Enter Mobile Number'
                    maxLength={10}
                    onChange={(e) => {
                      let inputValue = e?.target?.value
                      let isValid = _numberRegex_.test(inputValue)
                      let fieldName = e?.target?.name
                      if (isValid || !inputValue) {
                        setFieldValue([fieldName], inputValue)
                      }
                    }}
                    value={values.mobileNumber}
                    onBlur={(e) => {
                      let fieldName = e?.target?.name
                      setFieldValue(fieldName, values[fieldName]?.trim())
                    }}
                  />
                  <ErrorMessage name='mobileNumber' component={TextError} />
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
                      maxLength={15}
                      onChange={(e) => {
                        setFieldValue('password', e?.target?.value)
                      }}
                      value={values.password}
                      onBlur={(e) => {
                        let fieldName = e?.target?.name
                        setFieldValue(fieldName, values[fieldName]?.trim())
                      }}
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
                  <ErrorMessage name='password' component={TextError} />
                </div>
                <div className='mb-4 w-full'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='confirmPass'
                  >
                    Confirm Password
                  </label>
                  <div className='flex shadow appearance-none border items-center py-4 px-3'>
                    <input
                      className='w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='confirmPass'
                      type={showConfirmPassword ? 'text' : 'password'}
                      name='confirmPass'
                      placeholder='Confirm Password'
                      maxLength={15}
                      onChange={(e) => {
                        setFieldValue('confirmPass', e?.target?.value)
                      }}
                      value={values.confirmPass}
                      onBlur={(e) => {
                        let fieldName = e?.target?.name
                        setFieldValue(fieldName, values[fieldName]?.trim())
                      }}
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
                  <ErrorMessage name='confirmPass' component={TextError} />
                </div>
              </div>
              {values.role === 'recruiter' && (
                <div className='flex justify-self-end'>
                  <div className='mb-4  mr-4 w-full'>
                    <label
                      htmlFor='companyName'
                      className='block text-gray-700 text-sm font-bold mb-2'
                    >
                      Company Name
                    </label>
                    <input
                      className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='companyName'
                      name='companyName'
                      type='text'
                      placeholder='Company Name'
                      maxLength={20}
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
                    <ErrorMessage name='companyName' component={TextError} />
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
                    <ErrorMessage name='companyURL' component={TextError} />
                  </div>
                </div>
              )}
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Gender
                </label>
                <div className='ml-8 '>
                  <label className='inline-flex items-center'>
                    <input
                      type='radio'
                      name='gender'
                      value='male'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.gender === 'male'}
                    />
                    <span className='ml-2'>Male</span>
                  </label>
                  <label className='inline-flex items-center ml-4'>
                    <input
                      type='radio'
                      name='gender'
                      value='female'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.gender === 'female'}
                    />
                    <span className='ml-2'>Female</span>
                  </label>
                  <label className='inline-flex items-center ml-4 pt-2'>
                    <input
                      type='radio'
                      name='gender'
                      value='other'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.gender === 'other'}
                    />
                    <span className='ml-2'>Other</span>
                  </label>
                </div>
                {formik.touched.gender && formik.errors.gender && (
                  <div className='text-red-500'>{formik.errors.gender}</div>
                )}
              </div>
              <div className='flex items-center justify-between'>
                <button
                  className='bg-[#005C69] w-full text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  SignUp
                </button>
              </div>
            </form>
          </div>
        </div>
      </FormikProvider>
    </>
  )
}

export default UserSignUp
