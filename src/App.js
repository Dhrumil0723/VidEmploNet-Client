import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import AllRoutes from './AllRoutes'
import './App.css';
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer';
import { useLocation } from 'react-router-dom'


axios.defaults.baseURL = 'http://192.168.1.12:3001'
// axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation()
  

  return (
    <>
      <Toaster position='top-right' toastOptions={{ duration: 2000 }} />

      { !(location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin') ) && <Header />}
      <AllRoutes />
      { !(location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin') ) && <Footer />}
    </>
  )
}

export default App;
