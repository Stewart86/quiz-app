import { Button, Paper, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"

import { Dropdown } from "../components/Dropdown"
import { Printable } from "../pages/Printable"
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
}))

export default function QuestionsSelection() {
  const classes = useStyles()

  const [state, setState] = useState({})
  const [data, setData] = useState({})
  const [showPrintable, setShowPrintable] = useState(false)

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

  const isPrintable = () => {
    // all categories must not be empty
    let isAllPrintable = []
    let count = 0
    Object.keys(state).forEach((k,i) => {
      if (state[k].length > 0)
      isAllPrintable.push(true)
      count = i+1
    })
    if (isAllPrintable.length !== count) {
      setShowPrintable(false)
      console.error("missing  information unable to print")
      alert("missing  information unable to print")
    }
    else {
      setShowPrintable(true)
    }
  }

  return (
    <>
      {showPrintable ? (
        <Printable />
      ) : (
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
          <Button onClick={isPrintable}>Printable</Button>
          {/* TODO: number of question, timer, generate pdf, questions */}
          <Button>Start</Button>
        </Paper>
      )}
    </>
  )
}
