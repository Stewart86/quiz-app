import React, { useState } from "react"

import { InsertQuestionForm, InsertCategoriesForm } from "../components"

export const InsertQuestion = () => {
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [categories, setCategories] = useState({ type: ["multipleChoice"] })

  const handleInsertClick = () => {
    let validate = 0
    Object.keys(categories).forEach((k, i) => {
      validate += 1
    })
    console.log(validate)
    if (validate !== 5) {
      alert("all input must be completed")
    } else {
      setShowQuestionForm(true)
    }
  }

  const handleChange = (event) => {
    let obj = categories
    obj[event.target.id] = event.target.value
    setCategories(obj)
  }

  const handleNextInsert = () => {
    setShowQuestionForm(false)
  }
  return (
    <>
      {!showQuestionForm ? (
        <InsertCategoriesForm
          categories={categories}
          handleChange={handleChange}
          handleInsertClick={handleInsertClick}
        />
      ) : (
        <InsertQuestionForm
          categories={categories}
          handleNextInsert={handleNextInsert}
        />
      )}
    </>
  )
}
