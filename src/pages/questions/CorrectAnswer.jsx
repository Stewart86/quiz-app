import { green, red } from "@material-ui/core/colors"

import React from "react"
import { Typography } from "@material-ui/core"

export const CorrectAnswer = ({ questions }) => {
  let correctAnsCount = 0

  Object.keys(questions).forEach((key, i) => {
    if (questions[key]["result"] === true) {
      correctAnsCount += 1
    }
  })

  const length = Object.keys(questions).length

  return (
    <Typography
      style={{ color: correctAnsCount > length / 2 ? green[700] : red[700] }}
      paragraph
      variant={"h4"}>{`${correctAnsCount} / ${length} `}</Typography>
  )
}
