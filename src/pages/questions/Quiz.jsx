import { Container, Grid, Slide } from "@material-ui/core"
import React, { useState } from "react"
import { isEqual, isObject } from "lodash"

import { QUESTION_TYPE } from "../../helper/enum"
import { Question } from "./Question"
import { QuestionsDrawer } from "./QuestionsDrawer"
import { QuizFunctionBar } from "./QuizFunctionBar"
import { Result } from "./Result"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  questionContainer: {
    margin: theme.spacing(1),
  },
}))

export const Quiz = ({ questions, handlePrintable }) => {
  const classes = useStyles()

  const [questionsState, setQuestionsState] = useState(questions)
  const [showResult, setShowResult] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [count, setCount] = useState(1)
  const [slideDirection, setSlideDirection] = useState("left")

  const handleNextClick = () => {
    if (count < Object.keys(questions).length + 1) {
      setSlideDirection("left")
      setCount(count + 1)
    }
  }

  const handlePreviousClick = () => {
    if (count > 1) {
      setSlideDirection("right")
      setCount(count - 1)
    }
  }

  const onHandleAnswerClick = (ans) => {
    // no need to show result directly go next
    setSlideDirection("left")
    if (questionsState[count].type === QUESTION_TYPE.note) {
      if (Object.keys(questionsState).length === count) {
        // else if last question show result
        setShowResult(true)
      } else {
        setCount((state) => Number(state + 1))
      }
      return
    }
    // when undefiend === not answered
    if (questionsState[count].result === undefined) {
      let curQues = questions[count]

      // if curQues.answer is object, use FITB logic, else MCQ logic to set result
      if (isObject(curQues.answer)) {
        curQues["result"] = isEqual(curQues.answer, curQues.selectedAnswer)
      } else {
        curQues["result"] = Number(curQues.answer) === ans + 1
        curQues["selectedAnswer"] = ans
      }
      setQuestionsState((state) => ({ ...state, ...{ [count]: curQues } }))
    } else if (Object.keys(questionsState).length === count) {
      // else if last question show result
      setShowResult(true)
    } else {
      // else, answered goto next
      setCount((state) => Number(state + 1))
    }
  }

  const onHandleSelection = (selection) => {
    let curQues = questions[count]
    curQues["selectedAnswer"] = selection
    setQuestionsState((state) => ({ ...state, ...{ [count]: curQues } }))
  }

  const onHandleFITBAnswer = (index, answer) => {
    let curQues = questions[count]
    curQues["selectedAnswer"] = {
      ...curQues.selectedAnswer,
      ...{ [index]: answer },
    }
    setQuestionsState((state) => ({ ...state, ...{ [count]: curQues } }))
  }

  const onHandleDrawer = (toggle) => {
    setDrawerOpen(toggle)
  }

  const goto = (i) => {
    setSlideDirection("down")
    setCount(() => Number(i))
  }

  const handleEndClick = () => {
    setSlideDirection("down")
    setShowResult(true)
  }

  const fromResultGoTo = (i) => {
    setSlideDirection("down")
    setCount(() => Number(i))
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
        handleDisableNextBtn={Object.keys(questionsState).length === count}
      />
      <QuestionsDrawer
        questions={questionsState}
        open={drawerOpen}
        onHandleDrawer={onHandleDrawer}
        goto={goto}
      />
      <Slide key={count} in={true} direction={slideDirection}>
        <Grid
          container
          className={classes.questionContainer}
          direction={"column"}
          spacing={4}
          item>
          <Container>
            <Grid container direction={"column"} spacing={2}>
              <Question
                key={count}
                index={count}
                question={questionsState[count]}
                isLastQuestion={Object.keys(questions).length === count}
                onHandleSelection={onHandleSelection}
                onHandleAnswerClick={onHandleAnswerClick}
                onHandleFITBAnswer={onHandleFITBAnswer}
              />
            </Grid>
          </Container>
        </Grid>
      </Slide>
    </>
  )
}
