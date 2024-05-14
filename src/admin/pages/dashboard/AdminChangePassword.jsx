import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa6'
import { IoEyeOff } from 'react-icons/io5'
import TextError from '../../../components/Common/TextError'
import { ErrorMessage, useFormik, FormikProvider, Form } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { parseCookies } from 'nookies'

const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Current Password is required'),
  newPassword: Yup.string()
    .required('Password is Required!')
    .min(6, 'Password should be 6 chars minimum.')
    .max(16, 'Password should be 16 chars maximum.')
    .matches(/[a-zA-Z]/, 'Password should contain at least one character')
    .matches(/[0-9]/, 'Password should contain Numbers')
    .matches(/[^\w]/, 'Password requires a symbol'),
  confirmPassword: Yup.string()
    .required('Confirm Password is Required!')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
})

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
}

const AdminChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const cookies = parseCookies()

  const user = cookies?.user?.length > 0 ? JSON.parse(cookies?.user) : ''

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.put(`/api/admin/change-password?id=${user?._id}`, values)

      if (response?.data?.code === 200) {
        toast.success(response.data.message)
        resetForm({ values: '' })
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong !!')
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  })

  const { values, setFieldValue } = formik

  return (
    <>
      <div className='bg-white p-4'>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-lg font-bold mb-2'
                htmlFor='currentPassword'
              >
                Current Password
              </label>
              <div className='flex shadow appearance-none border items-center py-4 px-3 w-1/3'>
                <input
                  className='w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='currentPassword'
                  type={showCurrentPassword ? 'text' : 'password'}
                  name='currentPassword'
                  placeholder='Current Password'
                  maxLength={50}
                  onChange={(e) => {
                    setFieldValue('currentPassword', e?.target?.value)
                  }}
                  onBlur={(e) => {
                    // create a reusable function here
                    let fieldName = e?.target?.name
                    if (fieldName) {
                      setFieldValue(fieldName, values[fieldName]?.trim())
                    } else {
                      setFieldValue(fieldName, '')
                    }
                  }}
                  value={values.currentPassword}
                />
                {showCurrentPassword ? (
                  <FaEye
                    className='cursor-pointer'
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                  />
                ) : (
                  <IoEyeOff
                    className='cursor-pointer'
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                  />
                )}
              </div>
              <ErrorMessage name='currentPassword' component={TextError} />
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-lg font-bold mb-2'
                htmlFor='password'
              >
                New Password
              </label>
              <div className='flex shadow appearance-none border items-center py-4 px-3 w-1/3'>
                <input
                  className='w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='newPassword'
                  type={showNewPassword ? 'text' : 'password'}
                  name='newPassword'
                  placeholder='New Password'
                  maxLength={50}
                  onChange={(e) => {
                    if (e) {
                      setFieldValue('newPassword', e?.target?.value)
                    } else {
                      setFieldValue('newPassword', '')
                    }
                  }}
                  value={values.newPassword}
                  onBlur={(e) => {
                    let fieldName = e?.target?.name
                    if (fieldName) {
                      setFieldValue(fieldName, values[fieldName]?.trim())
                    } else {
                      setFieldValue(fieldName, '')
                    }
                  }}
                />
                {showNewPassword ? (
                  <FaEye
                    className='cursor-pointer'
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  />
                ) : (
                  <IoEyeOff
                    className='cursor-pointer'
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  />
                )}
              </div>
              <ErrorMessage name='newPassword' component={TextError} />
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-lg font-bold mb-2'
                htmlFor='password'
              >
                Confirm Password
              </label>
              <div className='flex shadow appearance-none border items-center py-4 px-3 w-1/3'>
                <input
                  className='w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  maxLength={50}
                  onChange={(e) => {
                    setFieldValue('confirmPassword', e?.target?.value)
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
              <ErrorMessage name='confirmPassword' component={TextError} />
            </div>
            <div className='flex gap-8'>
              <button
                className='bg-[#005C69] w-40 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Save Changes
              </button>
              {/* <button
                className=' border-2 border-[#005C69] text-[#00AEB3] w-32 font-bold py-2 px-4 focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Cancel
              </button> */}
            </div>
          </form>
        </FormikProvider>
      </div>
    </>
  )
}

export default AdminChangePassword
