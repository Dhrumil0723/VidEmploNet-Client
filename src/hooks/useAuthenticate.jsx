import { React, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { parseCookies } from 'nookies'

const useAuthenticate = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const cookies = parseCookies()

  useEffect(() => {
    const token = cookies?.authToken ? true : false

    if (location?.pathname.startsWith('/admin')) {
      token ? navigate('/admin/dashboard') : navigate('/admin/login')
      // console.log("check 1")
    } else {
      token ? navigate('/dashboard') : navigate('/login')
      // console.log("check 2")
    }
  }, [])
}

export default useAuthenticate
