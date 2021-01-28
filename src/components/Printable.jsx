import { Container, Grid } from "@material-ui/core"

import { PrintableQuestions } from "./PrintableQuestions"
import React from "react"

export const Printable = ({ questions }) => {
  const tempRangeLoop = (questions, range) => {
    let result = []
    for (let i = 0; i < range; i++) {
      result.push(
        <PrintableQuestions key={i} count={i + 1} question={questions[i]} />
      )
    }
    return result
  }
  return (
    <Container>
      <Grid container direction={"column"} spacing={2}>
        {tempRangeLoop(questions, questions.length)}
      </Grid>
    </Container>
  )
}
