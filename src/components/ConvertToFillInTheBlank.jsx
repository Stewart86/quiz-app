import { Chip, Paper, TextField, Typography } from "@material-ui/core"
import React, { Fragment } from "react"

import { SelectionField } from "./SelectionField"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  error: {
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  success: {
    background: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
  input: {
    width: "150px",
    "& input": {
      textAlign: "center",
    },
  },
}))

const setSelectedFieldValue = (sel, i) => {
  if (sel === undefined) {
    return ""
  } else {
    if (sel[i] === undefined) {
      return ""
    }
  }
  return sel[i]
}
export const ConvertToFillInTheBlank = ({
  rawText,
  submitted,
  onSelectionChange,
  selectedAnswer,
  printable = false,
}) => {
  const classes = useStyles()

  const val = rawText
  const splitRe = /({.*?})/g
  const textArr = val.split(splitRe)

  let newQuestion = []

  textArr.forEach((value, i) => {
    if (!value.includes("{")) {
      newQuestion.push(
        <Typography key={i} component={"span"}>
          {value}
        </Typography>
      )
    } else {
      if (value.includes(":")) {
        const answer = value.trim().split(":")[0].replace("{", "")
        const options = value.trim().split(":")[1].replace("}", "").split("|")
        if (options.length > 0) {
          if (printable) {
            newQuestion.push(
              <Paper component={"span"} elevation={5} style={{ padding: 5 }}>
                {options.map((v) => (
                  <span style={{ margin: 10, fontSize: "1.3em" }}>{v}</span>
                ))}
              </Paper>
            )
          } else {
            newQuestion.push(
              <SelectionField
                key={i}
                index={i}
                options={options}
                answer={answer}
                submitted={submitted}
                onSelectionChange={onSelectionChange}
                selectedAnswer={setSelectedFieldValue(selectedAnswer, i)}
              />
            )
          }
        }
      } else {
        const answer = value.replace("{", "").replace("}", "")
        newQuestion.push(
          <Fragment key={i}>
            <TextField
              classes={{ root: classes.input }}
              disabled={submitted}
              variant={"standard"}
              autoComplete={"false"}
              spellCheck={"false"}
              size={"small"}
              color={"primary"}
              onChange={(event) => onSelectionChange(i, event.target.value)}
              value={setSelectedFieldValue(selectedAnswer, i)}
            />
            {submitted && (
              <Chip
                key={i}
                className={
                  selectedAnswer === undefined
                    ? classes.error
                    : selectedAnswer[i] === answer
                    ? classes.success
                    : classes.error
                }
                size={"small"}
                label={answer}
              />
            )}
          </Fragment>
        )
      }
    }
  })

  return <>{newQuestion}</>
}
