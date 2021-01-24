import { AppBar, Button, Toolbar, Typography } from "@material-ui/core"

import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "68px"
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    margin: theme.spacing(2),
  },
}))

export const Nav = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Quiz App
          </Typography>
          <Button
            className={classes.btn}
            href="/insertquestion"
            color="inherit">
            Add
          </Button>
          <Button
            className={classes.btn}
            href="/question"
            color="inherit">
            Question
          </Button>
          <Button className={classes.btn} href="/login" color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
