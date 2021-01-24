import { Loading, Printable, QuestionsSelection } from "../components"
import React, { useEffect, useState } from "react"
import { getCategories, getQuestions } from "../firestore/questions"

import { questionComponents as components } from "../helper/enum"
import { getFirstArrayInObj } from "../helper/utilities"

export const Questions = () => {
  const [state, setState] = useState({})
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState({})
  const [showPrintable, setShowPrintable] = useState(false)
  const [show, setShowComponent] = useState(components.loading)

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories()
      setState(getFirstArrayInObj(categories))
      setData(categories)
      setShowComponent(components.questionsSelection)
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
    setShowComponent(components.loading)
    setQuestions(await getQuestions(state))
    setShowComponent(components.printable)
  }

  const handleGetQuestions = async () => {
    setShowComponent(components.loading)
    setQuestions(await getQuestions(state))
    setShowComponent(components.startQuiz)
  }

  return (
    <>
      {(() => {
        switch (show) {
          case components.loading:
            return <Loading />

          case components.printable:
            return <Printable questions={questions} />

          case components.questionsSelection:
            return (
              <QuestionsSelection
                data={data}
                handleOnChange={handleOnChange}
                state={state}
                handlePrintable={handlePrintable}
                handleGetQuestions={handleGetQuestions}
              />
            )

          default:
            return <Loading />
        }
      })()}
    </>
  )
}
