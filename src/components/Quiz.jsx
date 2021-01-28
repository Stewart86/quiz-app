import React, { useState } from "react"
import _, { random } from "lodash"

import { Grid } from "@material-ui/core"
import { Question } from "./Question"
import { QuestionsDrawer } from "./QuestionsDrawer"
import { QuizFunctionBar } from "./QuizFunctionBar"
import { Result } from "./Result"
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
  const [selectedAnswer, setSelectedAnswer] = useState({})
  const [test, setTest] = useState("")
  const [drawerQuestions, setDrawerQuestions] = useState(
    makeDrawerList(questions)
  )

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
    const update = _.merge(selectedAnswer, { [count]: ans })
    setSelectedAnswer(update)

    const tempObj = drawerQuestions
    tempObj[count] = true
    setDrawerQuestions(tempObj)

    setDrawerQuestions(tempObj)
    // some how this random state is needed for state retention in child
    setTest(random(100.0))
  }

  const onHandleDrawer = (toggle) => {
    setDrawerOpen(toggle)

    // some how this random state is needed for state retention in child
    setTest(random(100.0))
  }

  const goto = (i) => {
    setCount(i)
  }

  const handleEndClick = () => {
    console.log("handle end click")
    setShowResult(true)
  }

  return showResult ? (
    <Result />
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
          test={test}
          count={count + 1}
          question={questions[count]}
          selectedAnswer={selectedAnswer[count]}
          onHandleAnswerClick={onHandleAnswerClick}
        />
      </Grid>
    </>
  )
}
