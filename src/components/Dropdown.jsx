import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"

import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

export const Dropdown = ({ handleOnChange, selection, data, type }) => {
  const classes = useStyles()
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={type}>{type}</InputLabel>
      <Select
        labelId={type}
        id={`${type}-select`}
        value={selection[type]}
        onChange={(e) => handleOnChange(e, type)}>
        {data[type].length > 0
          ? data[type].map((k, i) => {
              return (
                <MenuItem key={i} value={k}>
                  {k}
                </MenuItem>
              )
            })
          : ""}
      </Select>
    </FormControl>
  )
}
