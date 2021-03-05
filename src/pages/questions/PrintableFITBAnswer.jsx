import { Grid, Typography } from "@material-ui/core"

import React from "react"

export const PrintableFITBAnswer = ({ questions }) => {
  const extractAnswerFromText = (text) => {
    const val = text
    const splitRe = /({.*?})/g
    const textArr = val.split(splitRe)

    let newQuestion = []
    textArr.forEach((value, i) => {
      // with "{" means its a question
      if (value.includes("{")) {
        // ":" mean selection options given
        if (value.includes(":")) {
          newQuestion.push(value.trim().split(":")[0].replace("{", ""))
          // without ":" mean open answer given
        } else {
          newQuestion.push(value.replace("{", "").replace("}", ""))
        }
      }
    })
    return newQuestion
  }
  return (
    <Grid container direction={"column"}>
      {Object.keys(questions).map((key, i) => (
        <Typography key={key}>
          Question {key}:{" ans = "}
          {extractAnswerFromText(questions[key].question).map((x) => `${x}, `)}
        </Typography>
      ))}
    </Grid>
  )
}
