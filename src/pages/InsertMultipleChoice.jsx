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
}) {
  const classes = useStyles()

  return (
    <>
      <Grid container className={classes.root}>
        {choices.map((x, i) => {
          return (
            <Fragment key={i}>
              <Grid item  xs={10}>
                <TextField
                  fullWidth
                  className={classes.textField}
                  defaultValue={`(${i + 1})  `}
                />
              </Grid>
              <Grid item  xs={1}>
                <Button
                  disabled={choices.length === 1}
                  variant='contained'
                  color={"primary"}
                  onClick={(e) => handleRemoveClick(i)}>
                  <RemoveIcon />
                </Button>
              </Grid>
              <Grid item  xs={1}>
                <Button
                  variant='contained'
                  color={"primary"}
                  onClick={handleAddClick}>
                  <AddIcon />
                </Button>
              </Grid>
            </Fragment>
          )
        })}
      </Grid>
    </>
  )
}
