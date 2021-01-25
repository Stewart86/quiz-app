import { Button, Grid } from "@material-ui/core"
import React, { useState } from "react"
import _, { random } from "lodash"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import { Question } from "./Question"
import { QuestionsDrawer } from "./QuestionsDrawer"

export const Quiz = ({ questions, handleEndClick }) => {
  const makeDrawerList = (questions) => {
    let result = {}
    Object.keys(questions).forEach((key, i) => {
      result[key] = false
    })
    return result
  }
  const [count, setCount] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState({})
  const [test, setTest] = useState("")
  const [drawerQuestions, setDrawerQuestions] = useState(
    makeDrawerList(questions)
  )
  const [drawerOpen, setDrawerOpen] = useState(false)

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

    // some how this random state is needed for state retention in child
    setTest(random(100.0))

    console.log("after", drawerQuestions)
  }

  const onHandleDrawer = (toggle) => {
    setDrawerQuestions(makeDrawerList(questions))
    setDrawerOpen(toggle)

    // some how this random state is needed for state retention in child
    setTest(random(100.0))
  }

  const goto = (i) => {
    setCount(i)
  }

  return (
    <Grid container spacing={2}>
      <QuestionsDrawer
        questions={drawerQuestions}
        open={drawerOpen}
        onHandleDrawer={onHandleDrawer}
        goto={goto}
      />
      <Grid item container justify={"space-between"}>
        <Button
          variant={"outlined"}
          color={"secondary"}
          onClick={() => onHandleDrawer(true)}>
          Navigate
        </Button>
        <Button
          variant={"outlined"}
          color={"secondary"}
          onClick={handleEndClick}>
          End
        </Button>
      </Grid>
      <Question
        test={test}
        count={count + 1}
        question={questions[count]}
        selectedAnswer={selectedAnswer[count]}
        onHandleAnswerClick={onHandleAnswerClick}
      />
      <Grid item container justify={"space-between"}>
        <Button
          disabled={count === 0}
          variant={"contained"}
          color={"secondary"}
          onClick={handlePreviousClick}>
          <NavigateBeforeIcon /> Previous
        </Button>
        <Button
          disabled={questions.length - 1 === count}
          variant={"contained"}
          color={"secondary"}
          onClick={handleNextClick}>
          Next
          <NavigateNextIcon />
        </Button>
      </Grid>
    </Grid>
  )
}
