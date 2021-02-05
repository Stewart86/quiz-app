import React, { useEffect, useRef, useState } from "react"
import _, { random } from "lodash"

import { Grid } from "@material-ui/core"
import { Question } from "./Question"
import { QuestionsDrawer } from "./QuestionsDrawer"
import { QuizFunctionBar } from "./QuizFunctionBar"
import { Result } from "./Result"
import { makeStyles } from "@material-ui/core"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  questionContainer: {
    margin: theme.spacing(6),
  },
}))

export const Quiz = ({ questions, handlePrintable }) => {
  const classes = useStyles()
  const history = useHistory()
  const unblockHandle = useRef()

  const [questionsState, setQuestionsState] = useState({...questions,selection:""})
  const [showResult, setShowResult] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [count, setCount] = useState(1)
  const [randomNum, setRandom] = useState(null)

  useEffect(() => {
    unblockHandle.current = history.block(() => {
      setShowResult(true)
      return false
    })
    return () => {
      unblockHandle.current.current && unblockHandle.current.current()
    }
  })

  const handleNextClick = () => {
    if (count < Object.keys(questions).length - 1) {
      setCount(count + 1)
    }
  }

  const handlePreviousClick = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const onHandleAnswerClick = (ans) => {
    if (questionsState[count].result === undefined) {
      let curQues = questions[count]
      curQues["result"] = Number(curQues.answer) === ans
      curQues["selectedAnswer"] = ans
      setQuestionsState((state) => _.merge(state, { [count]: curQues }))
    }
    setRandom(random(9999))
  }

  const onHandleSelection = (selection) => {
    let curQues = questions[count]
    curQues["selectedAnswer"] = selection
    setQuestionsState((state) => _.merge(state, { [count]: curQues }))
    setRandom(random(9999))
  }

  const onHandleDrawer = (toggle) => {
    setDrawerOpen(toggle)
  }

  const goto = (i) => {
    setCount((state) => Number(i))
  }

  const handleEndClick = () => {
    setShowResult(true)
  }

  const fromResultGoTo = (i) => {
    setCount((state) => Number(i))
    setShowResult(false)
  }

  return showResult ? (
    <Result questions={questionsState} fromResultGoTo={fromResultGoTo} />
  ) : (
    <>
      <QuizFunctionBar
        handlePrintable={handlePrintable}
        onHandleDrawer={onHandleDrawer}
        handlePreviousClick={handlePreviousClick}
        handleNextClick={handleNextClick}
        handleEndClick={handleEndClick}
        handleDisablePreviousBtn={count === 1}
        handleDisableNextBtn={Object.keys(questionsState).length - 1 === count}
      />
      <QuestionsDrawer
        questions={questionsState}
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
          random={randomNum}
          index={count}
          question={questionsState[count]}
          onHandleSelection={onHandleSelection}
          onHandleAnswerClick={onHandleAnswerClick}
        />
      </Grid>
    </>
  )
}
