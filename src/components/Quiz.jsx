import { Button, Grid } from "@material-ui/core"
import React, { useState } from "react"
import _, { random } from "lodash"

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import { Question } from "./Question"
import { QuestionsDrawer } from "./QuestionsDrawer"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  questionContainer: {
    margin: theme.spacing(10),
  },
  functionBtn: {
    marginTop: theme.spacing(3),
    paddingRight: theme.spacing(17)
  }
}))

export const Quiz = ({ questions, handleEndClick }) => {
  const classes = useStyles()

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

  return (
    <>
      <QuestionsDrawer
        questions={drawerQuestions}
        open={drawerOpen}
        onHandleDrawer={onHandleDrawer}
        goto={goto}
      />
      <Grid container xs={8}/>
      <Grid className={classes.functionBtn} container justify={"space-evenly"} item xs={4}>
        <Button
          variant={"outlined"}
          color={"secondary"}
          onClick={() => onHandleDrawer(true)}>
          Navigate
        </Button>
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
        <Button
          variant={"outlined"}
          color={"secondary"}
          onClick={handleEndClick}>
          End
        </Button>
      </Grid>
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
