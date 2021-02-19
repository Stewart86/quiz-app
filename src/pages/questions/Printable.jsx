import {
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"

import { PrintableQuestions } from "./PrintableQuestions"

export const Printable = ({ questions }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <Container>
      <Grid container>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={showAnswer}
              onChange={() => setShowAnswer((state) => !state)}
            />
          }
          label='Show Answer'
        />
      </FormGroup>
      </Grid>
      {showAnswer ? (
        <Grid container direction={"column"}>
          {Object.keys(questions).map((key, i) => (
            <Typography key={key}>
              Question {i + 1}: {questions[key]["answer"]}
            </Typography>
          ))}
        </Grid>
      ) : (
        <Grid container direction={"column"} spacing={2}>
          {Object.keys(questions).map((key) => (
            <PrintableQuestions
              key={key}
              count={key}
              question={questions[key]}
            />
          ))}
        </Grid>
      )}
    </Container>
  )
}
