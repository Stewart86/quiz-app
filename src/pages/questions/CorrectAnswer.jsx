import React from "react"
import { Typography } from "@material-ui/core"
import { createMuiTheme } from "@material-ui/core/styles"

export const CorrectAnswer = ({ questions }) => {
  const theme = createMuiTheme()
  let correctAnsCount = 0

  Object.keys(questions).forEach((key, i) => {
    if (questions[key]["result"] === true) {
      correctAnsCount += 1
    }
  })

  const length = Object.keys(questions).length

  return (
    <Typography
      style={{
        color:
          correctAnsCount > length / 2
            ? theme.palette.success.main
            : theme.palette.error.main,
      }}
      paragraph
      variant={"h4"}>{`${correctAnsCount} / ${length} `}</Typography>
  )
}
