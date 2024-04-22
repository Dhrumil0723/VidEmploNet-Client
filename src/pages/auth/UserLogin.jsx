import React, { useState } from 'react'
import bg from '../../asserts/images/bg-img.png'
import logo from '../../asserts/images/logo.png'
import { ErrorMessage, useFormik, FormikProvider, Form } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { FaEye } from 'react-icons/fa6'
import { IoEyeOff } from 'react-icons/io5'
import { setCookie } from 'nookies'
import TextError from '../../components/Common/TextError'
import Loader from '../../components/Common/Loader'
import useAuthenticate from '../../hooks/useAuthenticate'

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required!')
    .email('Please enter valid email'),
  password: Yup.string().required('Password is required!')
})

const UserLogin = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useAuthenticate()

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true)

      const response = await axios.post('/api/user/login', values)


      if (response?.data?.code === 200) {
        toast.success(response.data.message)
        setCookie(null, 'authToken', response?.data?.data?.token, {
          maxAge: 24 * 60 * 60,
          path: '/'
        })
        setCookie(null, 'user', JSON.stringify(response?.data?.data?.isEmail) , {
          maxAge: 24 * 60 * 60,
          path: '/'
        })
        resetForm({ values: '' })
        setTimeout(() => navigate('/dashboard'), 1000)
      } else {
        toast.error(response.data.message)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong !!')
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: handleSubmit
  })

  const { values, setFieldValue } = formik

  return (
    <>
      {loading && <Loader />}
      <FormikProvider value={formik}>
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
          <div
            className='fixed inset-0 bg-cover bg-center z-0'
            style={{ backgroundImage: `url(${bg})` }}
          ></div>

          <div className='z-10 p-6 bg-white shadow-lg max-w-md w-full'>
            <div className='flex justify-center'>
              <img className='h-12 mb-4' src={logo} alt='Logo' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>Login</h2>
            <p>
              Don't have an account?
              <button
                onClick={() => navigate('/signup')}
                className='font-semibold text-gray-600 ml-1 mb-4 underline underline-offset-2'
              >
                Sign up
              </button>
            </p>
            <div className='border-b-2 mb-8'></div>
            <form onSubmit={formik.handleSubmit}>
              <div className='mb-4'>
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
                  placeholder='Email'
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
              <div className='mb-4'>
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
                  placeholder='Password'
                  maxLength={50}
                  onChange={(e) => {
                    setFieldValue('password', e?.target?.value)
                  }}
                  value={values.password}
                  onBlur={(e) => {
                    let fieldName = e?.target?.name
                    if (fieldName) {
                      setFieldValue(fieldName, values[fieldName]?.trim())
                    } else {
                      setFieldValue(fieldName, '')
                    }
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
              <p className='text-right mb-8'>Forgot password?</p>
              <div className='flex items-center justify-between'>
                <button
                  className='bg-[#005C69] w-full text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </FormikProvider>
    </>
  )
}
export default UserLogin
