import { Container, Grid } from "@material-ui/core"

import { PrintableQuestions } from "./PrintableQuestions"
import React from "react"

export const Printable = ({ questions }) => (
  <Container>
    <Grid container direction={"column"} spacing={2}>
      {Object.keys(questions).map((key) => (
        <PrintableQuestions key={key} count={key} question={questions[key]} />
      ))}
    </Grid>
  </Container>
)
