import React, { useState } from 'react'
import { selectTimeOptions } from '../../lib/Common/AllGlobalFunction'
import Select from 'react-select'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  question: Yup.string().required('Question is required'),
  questionTime: Yup.string().required('Question Time is required')
})

const Question = ({ questions, setQuestions }) => {
  // const [questions, setQuestions] = useState([])
  const [formData, setFormData] = useState({
    question: '',
    questionTime: '',
    questionRetake: false
  })
  const [isUpdate, setIsUpdate] = useState(false)
  const [selectedQuestionId, setSelectedQuestionId] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      questionTime: selectedOption?.value
    }))
  }

  const handleAddQuestion = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isUpdate) {
      // Update existing question
      const updatedQuestions = questions.map((question) =>
        question.id === selectedQuestionId
          ? { ...formData, id: selectedQuestionId }
          : question
      )
      setQuestions(updatedQuestions)
      setIsUpdate(false)
      setFormData({
        question: '',
        questionTime: '',
        questionRetake: false
      })
    } else {
      // Add new question
      const newQuestion = {
        id: questions.length + 1,
        question: formData.question,
        questionTime: formData.questionTime,
        questionRetake: formData.questionRetake
      }
      setQuestions([...questions, newQuestion])
      setFormData({
        question: '',
        questionTime: '',
        questionRetake: false
      })
    }

    setFormData((prevData) => ({
      ...prevData,
      questionTime: null
    }))
  }

  const handleUpdateQuestion = (id) => {
    const selectedQuestion = questions.find((question) => question.id === id)
    setFormData(selectedQuestion)
    setSelectedQuestionId(id)
    setIsUpdate(true)
  }

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id)
    setQuestions(updatedQuestions)
  }

  return (
    <>
      <p className='font-semibold text-xl mt-4'>Question Set</p>
      <div className='flex items-center mt-4 gap-4'>
        <input
          className='shadow appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          type='text'
          placeholder='Question'
          name='question'
          value={formData.question}
          onChange={handleInputChange}
        />
        <div className='selector w-full'>
          <Select
            className='shadow'
            isClearable
            id='jobType'
            name='jobType'
            onChange={handleSelectChange}
            menuPlacement='auto'
            value={selectTimeOptions.find(
              (option) => option.value === formData.questionTime
            )}
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
            options={selectTimeOptions}
          />
        </div>
        <div className='flex items-center'>
          <input
            type='checkbox'
            checked={formData.questionRetake}
            onChange={handleInputChange}
            id='testToggle'
            name='questionRetake'
            className='hidden'
          />
          <label
            htmlFor='testToggle'
            className={`cursor-pointer ${
              formData.questionRetake ? 'bg-[#00AEB3]' : 'bg-[#9EDDDD]'
            } w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out`}
          >
            <span
              className={`block ${
                formData.questionRetake ? 'translate-x-6' : 'translate-x-0'
              } w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out`}
            ></span>
          </label>
          <span className='ml-2 font-medium'>
            {formData.questionRetake ? 'Retake' : 'Retake'}
          </span>
        </div>
        <button
          className='text-[#005C69] bg-[#D2ECEB] px-4 py-2'
          onClick={handleAddQuestion}
        >
          {isUpdate ? 'Update' : 'ADD'}
        </button>
      </div>

      {/* Display added questions */}
      {questions.map((question) => (
        <div
          key={question.id}
          className='flex gap-4 items-center justify-between mt-4'
        >
          <div className='flex gap-4'>
            <p>
              <span className='font-semibold'>Question:</span>{' '}
              {question.question}
            </p>
            <p>
              <span className='font-semibold'>Selected Time:</span>{' '}
              {question.questionTime}
            </p>
            <p>
              <span className='font-semibold'>Retake Allowed:</span>{' '}
              {question.questionRetake ? 'Yes' : 'No'}
            </p>
          </div>
          <div className='flex gap-4'>
            <button
              className='text-[#005C69] bg-[#D2ECEB] px-4 py-2'
              onClick={() => handleUpdateQuestion(question.id)}
            >
              Update
            </button>
            <button
              className='text-[#005C69] bg-[#D2ECEB] px-4 py-2'
              onClick={() => handleDeleteQuestion(question.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default Question
