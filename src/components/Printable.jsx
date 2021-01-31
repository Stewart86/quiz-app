import { Container, Grid } from "@material-ui/core"

import { PrintableQuestions } from "./PrintableQuestions"
import React from "react"

export const Printable = ({ questions }) => {
  const tempRangeLoop = () => {
    let result = []
    Object.keys(questions).forEach((key, i) => {
      result.push(
        <PrintableQuestions key={key} count={key} question={questions[key]} />
      )
    })
    return result
  }
  return (
    <Container>
      <Grid container direction={"column"} spacing={2}>
        {tempRangeLoop()}
      </Grid>
    </Container>
  )
}
