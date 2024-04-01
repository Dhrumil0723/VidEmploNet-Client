import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import AllRoutes from './AllRoutes'
import './App.css'

axios.defaults.baseURL = 'http://192.168.1.8:3001'
// axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.withCredentials = true

function App() {

  

  return (
    <>
      <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
      <AllRoutes />
    </>
  )
}

export default App
