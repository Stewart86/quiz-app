import { Loading, Printable, QuestionsSelection, } from "../components"
import React, { useEffect, useState } from "react"
import { getCategories, getQuestions } from "../firestore/questions"

import { getFirstArrayInObj } from "../helper/utilities"

export const Questions = () => {
  const [state, setState] = useState({})
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState({})
  const [showPrintable, setShowPrintable] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories()
      setState(getFirstArrayInObj(categories))
      setData(categories)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleOnChange = (e, type) => {
    setState({
      ...state,
      [type]: e.target.value,
    })
  }

  const handlePrintable = async () => {
    setLoading(true)
    setQuestions(await getQuestions(state))
    setShowPrintable(true)
    setLoading(false)
  }

  const handleGetQuestions = async () => {
    setLoading(true)
    setQuestions(await getQuestions(state))
    setLoading(false)
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : showPrintable ? (
        <Printable questions={questions} />
      ) : (
        <QuestionsSelection
          data={data}
          handleOnChange={handleOnChange}
          state={state}
          handlePrintable={handlePrintable}
          handleGetQuestions={handleGetQuestions}
        />
      )}
    </>
  )
}
