import React, { useState } from 'react'
import { RiDeleteBinLine } from "react-icons/ri";

const Question = () => {

    const [isSelected, setIsSelected] = useState(false);

    const handleToggle = () => {
        setIsSelected(!isSelected);
    };

  return (
    <>
        <div className='flex items-center mt-4 gap-4'>
            <input className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' placeholder='Question'  />
            <select className='shadow border py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                <option disabled selected>Select Time</option>
                <option>30 Second</option>
                <option>1 minute</option>
            </select>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleToggle}
                    id="testToggle"
                    className="hidden"
                />
                <label
                    htmlFor="testToggle"
                    className={`cursor-pointer ${
                    isSelected ? 'bg-[#00AEB3]' : 'bg-[#9EDDDD]'
                    } w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out`}
                >
                    <span
                    className={`block ${
                        isSelected ? 'translate-x-6' : 'translate-x-0'
                    } w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out`}
                    ></span>
                </label>
                <span className="ml-2 font-medium">{isSelected ? 'Retake' : 'Retake'}</span>
                </div>
                <button className='shadow border px-3 py-4'>
                    <RiDeleteBinLine className='text-2xl' />
                </button>
             </div>
    </>
  )
}

export default Question