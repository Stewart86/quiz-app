import { Chip, TextField, Typography } from "@material-ui/core"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"

import React from "react"
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
}))
const theme = createMuiTheme({
  overrides: {
    MuiTextField: {
      root: {
        width: "8em",
        margin: "8px",
        marginTop: "-8px",
        marginBottom: "12px",
      },
    },
    MuiInput: {
      input: {
        textAlign: "center",
      },
    },
  },
})

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
      } else {
        const answer = value.replace("{", "").replace("}", "")
        newQuestion.push(
          <>
            <TextField
              disabled={submitted}
              key={i}
              variant={"standard"}
              autoComplete={"false"}
              size={"small"}
              onChange={(event) => onSelectionChange(i, event.target.value)}
              value={setSelectedFieldValue(selectedAnswer, i)}
            />
            {submitted && (
              <Chip
                className={
                  selectedAnswer === answer ? classes.success : classes.error
                }
                size={"small"}
                label={answer}
              />
            )}
          </>
        )
      }
    }
  })

  return <ThemeProvider theme={theme}>{newQuestion}</ThemeProvider>
}
