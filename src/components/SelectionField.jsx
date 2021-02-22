import { MenuItem, TextField } from "@material-ui/core"
import React, { useState } from "react"

export const SelectionField = ({
  index,
  options,
  answer,
  submitted,
  onSelectionChange,
  selectedAnswer,
}) => {
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
    <TextField
      select
      value={value}
      onChange={handleSetValue}
      variant={"standard"}
      size={"small"}>
      <MenuItem selected value={-1}></MenuItem>
      {options.map((val, i) => (
        <MenuItem key={val} value={i}>
          {val}
        </MenuItem>
      ))}
    </TextField>
  )
}
