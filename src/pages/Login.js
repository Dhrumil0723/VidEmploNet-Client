import React, { useState } from 'react'
import bg from '../asserts/images/bg-img.png'
import logo from '../asserts/images/logo.png'
import { ErrorMessage, useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { setCookie } from 'nookies'

// import { BiUserCircle } from "react-icons/bi";
// import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().required('Email is required!'),
  password: Yup.string()
    .required("Password is required!")
    .min(6, "Password should be 6 chars minimum.")
})

const Login = () => {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)


  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/login', values)
        if (response.data.code === 200) {
          toast.success(response.data.message)
          console.log("getting cookie =>", response)
          console.log(response.data)
          setCookie(null, 'authToken', response.data.data.token, {
            maxAge: 24 * 60 * 60,
            path: '/',
          })
          setLoggedIn(true)
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  if (loggedIn) {
    navigate('/dashboard')
  }

  const {values, setFieldValue, resetForm} = formik

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div
        className='absolute inset-0 bg-cover bg-center z-0'
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
              type='text'
              name='email'
              placeholder='Email'
              onChange={(e) => {
                debugger
                let fieldName = e?.target?.name
                let inputValue = e?.target?.value
                  setFieldValue(fieldName, inputValue)
              }}
              value={values?.email}
              onBlur={(e) => {
                let fieldName = e?.target?.name
                setFieldValue(fieldName, values[fieldName].trim())
              }}
            />
            <ErrorMessage name="email" />
            {<p className='text-red-500'>{formik.errors.email}</p>}
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              name='password'
              placeholder='Password'
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {<p className='text-red-500'>{formik.errors.password}</p>}
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
  )
}
export default Login
