import { Loading, Printable, QuestionsSelection, Quiz } from "../components"
import React, { useEffect, useState } from "react"
import { getCategories, getQuestions } from "../firestore/questions"

import { questionComponents as components } from "../helper/enum"
import { questionKeyRename } from "../helper/utilities"

export const Questions = () => {
  const [data, setData] = useState({})
  const [questions, setQuestions] = useState({})
  const [show, setShowComponent] = useState(components.loading)

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories()
      setData(categories)
      setShowComponent(components.questionsSelection)
    }
    fetchData()
  }, [])

  const handlePrintable = async (selection) => {
    console.log(selection)
    setShowComponent(components.loading)
    setQuestions(questionKeyRename(await getQuestions(selection)))
    console.log(questions)
    setShowComponent(components.printable)
  }

  const handleGetQuestions = async (selection) => {
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
