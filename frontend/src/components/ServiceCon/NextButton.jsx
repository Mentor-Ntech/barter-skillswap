import React from 'react'
import { useNavigate } from 'react-router-dom'

export const NextButton = () => {

    const navigate = useNavigate()

    const handleNext = () => {
        navigate("/booking-form")
    }
  return (
    <div>
        <button onClick={handleNext}>Next</button>
    </div>
  )
}
