import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core"

import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
    minHeight: theme.spacing(30),
    padding: theme.spacing(3),
  },
  answerCard: {
    margin: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

export default function Question({ count, question }) {
  const classes = useStyles()

  return (
    <Grid item spacing={7}>
      <Card className={classes.paper}>
        <Grid container spacing={3}>
          <Grid container item direction={"column"} spacing={3}>
            <CardContent>
              <Typography variant={"h6"} component={"strong"} gutterBottom>
                Question {count}: 
              </Typography>
              <Typography variant={"subtitle1"} gutterBottom>
                <span dangerouslySetInnerHTML={{__html : question.question}}/>
              </Typography>
            </CardContent>
          </Grid>
            <CardActions>
          <Grid container item direction={"column"} spacing={3}>
              {question.choices.map((choice, i) => {
                return (
                  <Grid item spacing={3}>
              <Typography variant={"subtitle2"} paragraph>
                      {i + 1}. {choice}
              </Typography>
                  </Grid>
                )
              })}
          </Grid>
            </CardActions>
        </Grid>
      </Card>
    </Grid>
  )
}
