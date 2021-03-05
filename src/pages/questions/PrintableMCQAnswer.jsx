import { Grid, Typography } from "@material-ui/core"

import React from "react"

export const PrintableMCQAnswer = ({ questions }) => {
  return (
    <Grid container direction={"column"}>
      {Object.keys(questions).map((key, i) => (
        <Typography key={key}>
          Question {i + 1}: ans = {questions[key]["answer"]}
        </Typography>
      ))}
    </Grid>
  )
}
