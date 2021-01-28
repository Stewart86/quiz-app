import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Slide,
  Toolbar,
} from "@material-ui/core"
import React, { useState } from "react"
import _, { random } from "lodash"

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import PrintIcon from "@material-ui/icons/Print"
import { Question } from "./Question"
import { QuestionsDrawer } from "./QuestionsDrawer"
import { grey } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  featureBar: {
    minHeight: 100,
    alignItems: "flex-end",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    backgroundColor: grey[50],
    justifyContent: "flex-end",
  },
  questionContainer: {
    margin: theme.spacing(10),
  },
  functionBtn: {
    margin: theme.spacing(3),
  },
}))

export const Quiz = ({ questions, handleEndClick, handlePrintable }) => {
  const classes = useStyles()

  const makeDrawerList = (questions) => {
    let result = {}
    Object.keys(questions).forEach((key, i) => {
      result[key] = false
    })
    return result
  }
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

  return (
    <>
      <div className={classes.root}>
        <Slide in={true} direction={"down"}>
          <AppBar position={"static"}>
            <Toolbar className={classes.featureBar} variant={"dense"}>
              <IconButton
                className={classes.functionBtn}
                color={"secondary"}
                onClick={handlePrintable}>
                <PrintIcon />
              </IconButton>
              <Button
                className={classes.functionBtn}
                variant={"outlined"}
                color={"secondary"}
                onClick={() => onHandleDrawer(true)}>
                Navigate
              </Button>
              <Button
                className={classes.functionBtn}
                disabled={count === 0}
                variant={"contained"}
                color={"secondary"}
                onClick={handlePreviousClick}>
                <NavigateBeforeIcon /> Previous
              </Button>
              <Button
                className={classes.functionBtn}
                disabled={questions.length - 1 === count}
                variant={"contained"}
                color={"secondary"}
                onClick={handleNextClick}>
                Next
                <NavigateNextIcon />
              </Button>
              <Button
                className={classes.functionBtn}
                variant={"outlined"}
                color={"secondary"}
                onClick={handleEndClick}>
                End
              </Button>
            </Toolbar>
          </AppBar>
        </Slide>
      </div>
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
