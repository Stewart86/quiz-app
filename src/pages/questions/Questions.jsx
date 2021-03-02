import React, { useState } from "react"

import { DueDateReminder } from "../../components/DueDateReminder"
import { Loading } from "../../components"
import { Printable } from "./Printable"
import { QuestionsSelection } from "./QuestionsSelection"
import { Quiz } from "./Quiz"
import { TypeSelection } from "./TypeSelection"
import { WarningSnackBar } from "../../components/WarningSnackBar"
import { questionComponents as components } from "../../helper/enum"
import { getMany } from "../../firestore/questions"
import { questionKeyRename } from "../../helper/utilities"

export const Questions = () => {
  const [questions, setQuestions] = useState({})
  const [category, setCategory] = useState({})
  const [show, setShowComponent] = useState(components.typeSelection)
  const [openSnackBar, setOpenSnackBar] = useState(false)

  const handleSetCategory = (type) => {
    setCategory({ type })
    setShowComponent(components.questionsSelection)
  }

  const handlePrintable = () => {
    setShowComponent(components.loading)
    setShowComponent(components.printable)
  }

  const tryGetQuestionsOrThrowWarning = async (selection) => {
    const dbQuestions = await getMany(selection)
    if (dbQuestions.length === 0) {
      setOpenSnackBar(true)
      return false
    } else {
      setQuestions(questionKeyRename(dbQuestions))
      return true
    }
  }

  const handleDirectPrint = async (selection) => {
    setShowComponent(components.loading)
    if (await tryGetQuestionsOrThrowWarning(selection)) {
      setShowComponent(components.printable)
    } else {
      setShowComponent(components.questionsSelection)
    }
  }

  const handleGetQuestions = async (selection) => {
    // merge selection and type here
    setShowComponent(components.loading)
    if (await tryGetQuestionsOrThrowWarning(selection)) {
      setShowComponent(components.startQuiz)
    } else {
      setShowComponent(components.questionsSelection)
    }
  }

  return (
    <>
      {(() => {
        switch (show) {
          case components.loading:
            return <Loading />

          case components.typeSelection:
            return <TypeSelection handleSetType={handleSetCategory} />

          case components.printable:
            return <Printable questions={questions} />

          case components.questionsSelection:
            return (
              <QuestionsSelection
                type={category}
                handlePrintable={handleDirectPrint}
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
      <WarningSnackBar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackBar}
        role='alert'
        message={"Question not found."}
        onClose={() => setOpenSnackBar(false)}
        autoHideDuration={3000}
      />
      <DueDateReminder />
    </>
  )
}
