import { MenuItem, TextField } from "@material-ui/core"
import React, { useState } from "react"

export const SelectionField = ({ options, answer, submitted }) => {
  const [value, setValue] = useState(" ")

  const handleSetValue = (event) => {
    if (submitted) {
      if (answer === event.target.value) {
        // show correct answer
      }
    }
    setValue(event.target.value)
  }

  return (
    <TextField
      select
      value={value}
      onChange={handleSetValue}
      variant={"standard"}
      size={"small"}>
      <MenuItem value=' '> </MenuItem>
      {options.map((val) => (
        <MenuItem value={val}>{val}</MenuItem>
      ))}
    </TextField>
  )
}
