import { Button, Grid } from "@material-ui/core"
import { blue, green, red } from "@material-ui/core/colors"

import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  questionBtn: {
    margin: theme.spacing(1),
  },
}))

export const ListOfButtons = ({ questions, handleFromResult }) => {
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
                  ? green[500]
                  : value.selectedAnswer !== undefined
                  ? value.result === false
                    ? red[500]
                    : blue[500]
                  : red[500],
              }}>
              Question {value.index}
            </Button>
          </Grid>
        ))}
    </Grid>
  )
}
