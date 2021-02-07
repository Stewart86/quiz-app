import { Loading, Printable, QuestionsSelection, Quiz } from "../components"
import React, { useState } from "react"

import { questionComponents as components } from "../helper/enum"
import { getQuestions } from "../firestore/questions"
import { questionKeyRename } from "../helper/utilities"

export const Questions = () => {
  const [questions, setQuestions] = useState({})
  const [show, setShowComponent] = useState(components.questionsSelection)

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
