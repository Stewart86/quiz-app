import React, { useState } from "react"

import { Grid } from "@material-ui/core"
import { Question } from "./Question"
import { QuestionsDrawer } from "./QuestionsDrawer"
import { QuizFunctionBar } from "./QuizFunctionBar"
import { Result } from "./Result"
import _ from "lodash"
import { makeDrawerList } from "../helper/utilities"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  questionContainer: {
    margin: theme.spacing(6),
  },
}))

export const Quiz = ({ questions, handlePrintable }) => {
  const classes = useStyles()

  const [showResult, setShowResult] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [count, setCount] = useState(0)
  const [selectedAnswerState, setSelectedAnswer] = useState({})
  const [drawerQuestions, setDrawerQuestions] = useState(
    makeDrawerList(questions)
  )
  const [attemptedList, setAttemptedList] = useState({})

  const handleNextClick = () => {
    if (count < questions.length - 1) {
      setCount(count + 1)
    }
  }

  const handlePreviousClick = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  const onHandleAnswerClick = (ans) => {
    const updateAttemptedQuestion = _.merge(attemptedList, {[count]: {result: Number(questions[count].answer) === ans }})
    setAttemptedList({[count]: {result: Number(questions[count].answer) === ans }})
    const update = _.merge(selectedAnswerState, { [count]: ans })
    setSelectedAnswer(update)

    const tempObj = drawerQuestions
    tempObj[count] = true
    setDrawerQuestions(tempObj)
  }

  const onHandleDrawer = (toggle) => {
    setDrawerOpen(toggle)
  }

  const goto = (i) => {
    setCount(i)
  }

  const handleEndClick = () => {
    setShowResult(true)
  }

  return showResult ? (
    <Result listOfAttempted={attemptedList} listOfNotAttempted={drawerQuestions} />
  ) : (
    <>
      <QuizFunctionBar
        handlePrintable={handlePrintable}
        onHandleDrawer={onHandleDrawer}
        handlePreviousClick={handlePreviousClick}
        handleNextClick={handleNextClick}
        handleEndClick={handleEndClick}
        handleDisablePreviousBtn={count === 0}
        handleDisableNextBtn={questions.length - 1 === count}
      />
      <QuestionsDrawer
        questions={drawerQuestions}
        open={drawerOpen}
        onHandleDrawer={onHandleDrawer}
        goto={goto}
      />
      <Grid
        container
        className={classes.questionContainer}
        direction={"row"}
        spacing={4}
        item
        xs={12}>
        <Question
          count={count + 1}
          question={questions[count]}
          selectedAnswer={selectedAnswerState[count]}
          onHandleAnswerClick={onHandleAnswerClick}
        />
      </Grid>
    </>
  )
}
