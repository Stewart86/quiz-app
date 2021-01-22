import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    margin: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

const Dropdown = ({ handleOnChange, state, data, type }) => {
  const classes = useStyles()
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={type}>{type}</InputLabel>
      <Select
        labelId={type}
        id={`${type}-select`}
        value={state[type]}
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

export default function QuestionsSelection() {
  const classes = useStyles()

  const data = {
    test: ["aaa", "bbb", "ccc"],
    test2: ["aaa", "bbb", "ccc"],
  }
  const getFirstArrayInObj = (data) => {
    let result = {}
    Object.keys(data).forEach((k, i) => {
      result[k] = data[k][0]
    })
    return result
  }
  const [state, setState] = useState(getFirstArrayInObj(data))

  const handleOnChange = (e, type) => {
    console.log(e.target.value)
    setState({
      ...state,
      [type]: e.target.value,
    })
  }

  return (
    <Paper className={classes.root}>
      <Typography variant={"h3"}>Question Selection</Typography>
      {Object.keys(data).map((k, i) => {
        return (
          <Dropdown
            handleOnChange={handleOnChange}
            state={state}
            data={data}
            type={k}
          />
        )
      })}
    </Paper>
  )
}
