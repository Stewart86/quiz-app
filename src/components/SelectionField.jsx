import { Chip, MenuItem, TextField } from "@material-ui/core"
import React, { useState } from "react"

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
    textAlign: "center"
  },
}))
export const SelectionField = ({
  index,
  options,
  answer,
  submitted,
  onSelectionChange,
  selectedAnswer,
}) => {
  const classes = useStyles()
  const [value, setValue] = useState(selectedAnswer)

  const handleSetValue = (event) => {
    if (submitted) {
      if (answer === event.target.value) {
        // show correct answer
      }
    }
    setValue(event.target.value)
    onSelectionChange(index, Number(event.target.value))
  }

  return (
    <>
      <TextField
        select
        classes={{ root: classes.input }}
        disabled={submitted}
        value={value}
        onChange={handleSetValue}
        variant={"standard"}
        color={"primary"}
        size={"small"}>
        <MenuItem selected value={-1}></MenuItem>
        {options.map((val, i) => (
          <MenuItem key={val} value={i}>
            {val}
          </MenuItem>
        ))}
      </TextField>
      {submitted && (
        <Chip
          className={
            options[selectedAnswer] === answer ? classes.success : classes.error
          }
          size={"small"}
          label={answer}
        />
      )}
    </>
  )
}
