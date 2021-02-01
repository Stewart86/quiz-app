import { Loading, Printable, QuestionsSelection, Quiz } from "../components"
import React, { useEffect, useState } from "react"
import { getCategories, getQuestions } from "../firestore/questions"
import { getFirstArrayInObj, questionKeyRename } from "../helper/utilities"

import { questionComponents as components } from "../helper/enum"

export const Questions = () => {
  const [selection, setSelection] = useState({})
  const [data, setData] = useState({})
  const [questions, setQuestions] = useState({})
  const [show, setShowComponent] = useState(components.loading)

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories()
      setSelection(getFirstArrayInObj(categories))
      setData(categories)
      setShowComponent(components.questionsSelection)
    }
    fetchData()
  }, [])

  const handleOnChange = (e, type) => {
    setSelection({
      ...selection,
      [type]: e.target.value,
    })
  }

  const handlePrintable = async () => {
    setShowComponent(components.loading)
    setQuestions(questionKeyRename(await getQuestions(selection)))
    setShowComponent(components.printable)
  }

  const handleGetQuestions = async () => {
    setShowComponent(components.loading)
    setQuestions(questionKeyRename(await getQuestions(selection)))
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
                selection={selection}
                handlePrintable={handlePrintable}
                handleGetQuestions={handleGetQuestions}
              />
            )

          case components.startQuiz:
            return (
              <Quiz questions={questions} handlePrintable={handlePrintable} />
            )

          default:
            return <Loading />
        }
      })()}
    </>
  )
}
