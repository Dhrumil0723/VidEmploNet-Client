import React, { useState, useRef, useEffect } from 'react'
import logo from '../../asserts/images/logo.png'
import profile from '../../asserts/images/profile-photo.png'
import { CiHome } from 'react-icons/ci'
import { VscBriefcase } from 'react-icons/vsc'
import { BsPeople } from 'react-icons/bs'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { FaChevronDown } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { destroyCookie } from 'nookies'

const SideBar = () => {
    const location = useLocation();
    const { pathname } = location;
    const [isToggled, setIsToggled] = useState(false)
    const containerRef = useRef(null);
    const navigate = useNavigate()
    

    const handleClickOutside = (e) => {
        if(containerRef.current && !containerRef.current.contains(e.target)) {
            setIsToggled(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
  
    const handleToggle = () => {
      setIsToggled(!isToggled)
    }

    const logout = () => {
        destroyCookie(null, 'authToken')
        navigate('/login')
    }


    return (
        <div className='flex justify-between flex-col h-[100vh] p-4 bg-[#E2F3F2]'>
            <div>
                <div className='mt-3 mb-6'>
                    <img className='h-10' src={logo} alt='logo' />
                </div>
                <div className=''>
                    <Link to='/dashboard' className={`flex flex-row items-center p-2 cursor-pointer ${ pathname === '/dashboard' ? 'bg-[#005C69] text-white' : '' }` }>
                        <div>
                            <CiHome className='w-6 h-6 mr-2' />
                        </div>
                        <div>Dashboard</div>
                    </Link>
                    <Link to='/job-opening' className={`flex flex-row items-center p-2 cursor-pointer ${ pathname?.split("/")[1] === 'job-opening' ? 'bg-[#005C69] text-white' : '' }` }>
                        <div>
                            <VscBriefcase className='w-6 h-6 mr-2' />
                        </div>
                        <div>Job Openings</div>
                    </Link>
                    <Link to='/candidates' className={`flex flex-row items-center p-2 cursor-pointer ${ pathname === '/candidates' ? 'bg-[#005C69] text-white' : '' }` }>
                        <div>
                            <BsPeople className='w-6 h-6 mr-2' />
                        </div>
                        <div>Candidates</div>
                    </Link>
                    <Link to='/about-company' className={`flex flex-row items-center p-2 rounded cursor-pointer ${ pathname === '/about-company' ? 'bg-[#005C69] text-white' : '' }` }>
                        <div>
                            <HiOutlineBuildingOffice2 className='w-6 h-6 mr-2' />
                        </div>
                        <div>About Company</div>
                    </Link>
                </div>
                {isToggled && <div className='absolute bottom-20 left-60 p-2 bg-white '>
                    <div className='flex flex-col-reverse'>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>}
            </div>
            <div>
                <div className='border-b-2 border-[#35BEC1]'></div>
                <div className='flex justify-between items-center cursor-pointer' onClick={handleToggle} ref={containerRef}>
                    <div className='mt-8 flex'>
                        <div><img src={profile} className='h-12 w-12 mr-4' alt='profile-pic' /></div>
                        <div>
                            <p className='font-medium'>Rolex Wilson</p>
                            <p>Codeule</p>
                        </div>
                    </div>
                    <div >
                            <FaChevronDown />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
