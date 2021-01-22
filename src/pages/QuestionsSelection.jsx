import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"

import { getCategories } from "../firestore/questions"
import { getFirstArrayInObj } from "../helper/utilities"
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

  const [state, setState] = useState({})
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories()
      setState(getFirstArrayInObj(data))
      setData(data)
    }
    fetchData()
  }, [])

  const handleOnChange = (e, type) => {
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
            key={i}
            handleOnChange={handleOnChange}
            state={state}
            data={data}
            type={k}
          />
        )
      })}
    <Button>Print</Button>{/* TODO: number of question, timer, generate pdf, questions */}
    <Button>Start</Button>
    </Paper>
  )
}
