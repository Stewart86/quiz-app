import { Button, Grid } from "@material-ui/core"
import React, { useState } from "react"
import _, { random } from "lodash"

import { Question } from "./Question"

export const Quiz = ({ questions }) => {
  const [count, setCount] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState({})
  const [test, setTest] = useState("")

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
    // some how this random state is needed for state retention in child
    setTest(random(100.0))
  }
  return (
    <Grid container spacing={2}>
      <Question
      test={test}
        count={count + 1}
        question={questions[count]}
        selectedAnswer={selectedAnswer[count]}
        onHandleAnswerClick={onHandleAnswerClick}
      />
      <Button onClick={handlePreviousClick}>Previous</Button>
      <Button onClick={handleNextClick}>Next</Button>
    </Grid>
  )
}
