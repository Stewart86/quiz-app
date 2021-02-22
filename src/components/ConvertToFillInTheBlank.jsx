import { TextField, Typography } from "@material-ui/core"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"

import React from "react"
import { SelectionField } from "./SelectionField"

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
        newQuestion.push(
          <TextField
            key={i}
            variant={"standard"}
            autoComplete={"false"}
            size={"small"}
            onChange={(event) => onSelectionChange(i, event.target.value)}
            value={setSelectedFieldValue(selectedAnswer, i)}
          />
        )
      }
    }
  })

  return <ThemeProvider theme={theme}>{newQuestion}</ThemeProvider>
}
