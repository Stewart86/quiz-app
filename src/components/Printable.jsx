import { Grid } from "@material-ui/core"
import { Question } from "./Question"
import React from "react"

export const Printable = ({ questions }) => {
  const tempRangeLoop = (questions, range) => {
    let result = []
    for (let i = 0; i < range; i++) {
      result.push(<Question key={i} count={i + 1} question={questions[i]} />)
    }
    return result
  }
  return (
    <Grid container spacing={2}>
      {tempRangeLoop(questions, questions.length)}
    </Grid>
  )
}
