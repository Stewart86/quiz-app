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

import { CorrectAnswer } from "./CorrectAnswer"
import { Link } from "react-router-dom"
import { ListOfButtons } from "./ListOfButtons"
import { Loading } from "../../components"
import { QUESTION_TYPE } from "../../helper/enum.js"
import React from "react"
import { getAttempted } from "../../helper/utilities"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  centerContent: {
    minHeight: "94vh",
  },
}))

export const Result = ({ questions, fromResultGoTo }) => {
  const classes = useStyles()

  const attempts = getAttempted(questions)

  if (questions[Object.keys(questions)[0]].type === QUESTION_TYPE.note) {
    window.location.reload()
    return <Loading />
  }

  return (
    <Grid
      className={classes.centerContent}
      alignContent={"center"}
      justify={"center"}
      container>
      <Grid item>
        <Card>
          <CardHeader title={"Result"} />
          <CardContent>
            <CorrectAnswer questions={questions} />
            <Typography variant={"h5"} gutterBottom>
              Questions Attempted
            </Typography>
            <Divider orientation={"horizontal"} />
            <ListOfButtons
              handleFromResult={fromResultGoTo}
              questions={attempts.attempted}
            />
          </CardContent>
          <CardContent>
            <Typography variant={"h5"} gutterBottom>
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
