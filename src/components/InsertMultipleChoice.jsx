import { Button, Grid, Paper, TextField } from "@material-ui/core"
import React, { Fragment } from "react"

import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  textField: {
    padding: theme.spacing(0.5)
  },
  paper: {
    margin: theme.spacing(3),
  },
  addRemoveBtn: {
    margin: theme.spacing(3),
  }
}))
export default function InsertMultipleChoice({choices, handleSetChoice, handleRemoveClick, handleAddClick}) {
  const classes = useStyles()

  return (
    <>
      <Grid container>
        {choices.map((x, i) => {
          return (
            <Fragment key={i}>
              <Grid item xs={10}>
                <Paper className={classes.paper}>
                  <TextField fullWidth className={classes.textField} defaultValue={`Choice ${i + 1}`} onChange={(event) => handleSetChoice(event.value, i)} />
                </Paper>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant='contained'
                  color={"primary"}
                  className={classes.addRemoveBtn}
                  onClick={handleRemoveClick}>
                  <RemoveIcon/>
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant='contained'
                  color={"primary"}
                  className={classes.addRemoveBtn}
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
