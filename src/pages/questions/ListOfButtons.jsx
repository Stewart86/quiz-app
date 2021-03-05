import { Button, Grid } from "@material-ui/core"

import React from "react"
import { createMuiTheme } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  questionBtn: {
    margin: theme.spacing(1),
  },
}))

export const ListOfButtons = ({ questions, handleFromResult }) => {
  const theme = createMuiTheme()

  const classes = useStyles()
  return (
    <Grid container direction={"row"} justify={"flex-start"}>
      {questions &&
        questions.map((value, i) => (
          <Grid key={i.toString()} item>
            <Button
              className={classes.questionBtn}
              variant={"outlined"}
              onClick={() => handleFromResult(value.index)}
              style={{
                width: 150,
                color: value.result
                  ? theme.palette.success.main
                  : value.selectedAnswer !== undefined
                  ? value.result === false
                    ? theme.palette.error.main
                    : theme.palette.info.main
                  : theme.palette.error.main,
              }}>
              Question {value.index}
            </Button>
          </Grid>
        ))}
    </Grid>
  )
}
