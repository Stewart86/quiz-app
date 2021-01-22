import { TextField, Paper, Grid, Button } from "@material-ui/core"
import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"

import InsertQuestion from "../pages/InsertQuestion"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    padding: theme.spacing(0.5),
  },
  paper: {
    margin: theme.spacing(3),
  },
}))

export default function InsertQuestionOptions() {
  const classes = useStyles()
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [categories, setCategories] = useState({})

  const handleInsertClick = () => {
    setShowQuestionForm(true)
  }

  const handleChange = (event) => {
    let obj = categories
    obj[event.target.id] = event.target.value
    setCategories(obj)
  }

  return (
    <>
      {!showQuestionForm ? (
        <Grid container>
          <Grid item xs={4} />
          <Grid>
            <Paper className={classes.root}>
              <form>
                <Grid container direction="column">
                  <Grid item>
                    <TextField
                      id={"subject"}
                      label="Subject"
                      className={classes.textField}
                      variant="filled"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id={"level"}
                      label="Level"
                      className={classes.textField}
                      variant="filled"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id={"type"}
                      label="Type"
                      className={classes.textField}
                      variant="filled"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id={"school"}
                      label="School"
                      className={classes.textField}
                      variant="filled"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id={"year"}
                      label="Year"
                      className={classes.textField}
                      variant="filled"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color={"primary"}
                  onClick={handleInsertClick}>
                  Next
                </Button>
              </form>
            </Paper>
          </Grid>
          <Grid />
        </Grid>
      ) : (
        <InsertQuestion categories={categories} />
      )}
    </>
  )
}
