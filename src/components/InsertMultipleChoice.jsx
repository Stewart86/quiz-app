import { Button, Grid, TextField } from "@material-ui/core"
import React, { Fragment } from "react"

import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  textField: {
    padding: theme.spacing(0.5),
  },
  paper: {
    margin: theme.spacing(3),
  },
  addRemoveBtn: {
    margin: theme.spacing(3),
  },
}))

export default function InsertMultipleChoice({
  choices,
  handleAddClick,
  handleRemoveClick,
  handleAnswerClick,
  handleSetChoice,
}) {
  const classes = useStyles()

  return (
    <>
      <Grid container className={classes.root}>
        {choices.map((x, i) => {
          return (
            <Fragment key={i}>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  className={classes.textField}
                  defaultValue={`Choice ${i + 1}`}
                  onChange={(event) => handleSetChoice(event.target.value, i)}
                />
              </Grid>
              <Grid item>
                <Button
                  disabled={choices.length === 1}
                  variant="contained"
                  color={"primary"}
                  onClick={(e) => handleRemoveClick(i)}>
                  <RemoveIcon />
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  color={"primary"}
                  onClick={handleAddClick}>
                  <AddIcon />
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  color={"secondary"}
                  onClick={handleAnswerClick(i)}>
                  Answer
                </Button>
              </Grid>
            </Fragment>
          )
        })}
      </Grid>
    </>
  )
}
