import { Button, Grid, Paper, TextField } from "@material-ui/core"
import React, { Fragment, useState } from "react"

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
export default function InsertMultipleChoice() {
  const [choices, setChoices] = useState([""])
  const classes = useStyles()
const handleRemoveClick = index => {
    const list = [...choices];
    list.splice(index, 1);
    setChoices(list);
  };
  return (
    <>
      <Grid container>
        {choices.map((x, i) => {
          return (
            <Fragment key={i}>
              <Grid item xs={10}>
                <Paper className={classes.paper}>
                  <TextField fullWidth className={classes.textField} defaultValue={`Choice ${i + 1}`} />
                </Paper>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant='contained'
                  color={"primary"}
                  className={classes.addRemoveBtn}
                  onClick={(e) => handleRemoveClick(i)}>
                  <RemoveIcon/>
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant='contained'
                  color={"primary"}
                  className={classes.addRemoveBtn}
                  onClick={(e) => setChoices([...choices, e.value])}>
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
