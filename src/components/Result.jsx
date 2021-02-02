import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core"
import { blue, green, red } from "@material-ui/core/colors"

import { Link } from "react-router-dom"
import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  centerContent: {
    minHeight: "94vh",
  },
  questionBtn: {
    margin: theme.spacing(1),
  },
}))

const ListOfButtons = ({ questions, handleFromResult }) => {
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
export const Result = ({ questions, fromResultGoTo }) => {
  const classes = useStyles()

  const correctAnswer = () => {
    let correctAnsCount = 0
    Object.keys(questions).forEach((key, i) => {
      if (questions[key]["result"] === true) {
        correctAnsCount += 1
      }
    })
    const length = Object.keys(questions).length
    return (
      <Typography
        style={{ color: correctAnsCount > length / 2 ? green[700] : red[700] }}
        paragraph
        variant={"h4"}>{`${correctAnsCount} / ${length} `}</Typography>
    )
  }

  const getAttempted = () => {
    let attempted = []
    let notAttempted = []

    Object.keys(questions).forEach((key) => {
      let out = questions[key]
      out["index"] = key
      if (questions[key]["result"] !== undefined) {
        attempted.push(out)
      } else {
        notAttempted.push(out)
      }
    })
    return { attempted, notAttempted }
  }
  const attempts = getAttempted()

  return (
    <Grid
      className={classes.centerContent}
      alignContent={"center"}
      justify={"center"}
      container>
      <Grid item xs={5}>
        <Card>
          <CardHeader title={"Result"} />
          <CardContent>
            {correctAnswer()}
            <Typography variant={"h6"} gutterBottom>
              Questions Attempted
            </Typography>
            <Divider orientation={"horizontal"} />
            <ListOfButtons
              handleFromResult={fromResultGoTo}
              questions={attempts.attempted}
            />
          </CardContent>
          <CardContent>
            <Typography variant={"h6"} gutterBottom>
              Questions Not Attempted
            </Typography>
            <Divider orientation={"horizontal"} />
            <ListOfButtons
              handleFromResult={fromResultGoTo}
              questions={attempts.notAttempted}
            />
          </CardContent>
          <CardActions>
            <Link
              to={"/question"}
              component={Button}
              color={"secondary"}
              variant={"contained"}>
              Back
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
