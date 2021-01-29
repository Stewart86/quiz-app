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
import { green, red } from "@material-ui/core/colors"

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

const ListOfButtons = ({ range, correct }) => {
  const classes = useStyles()
  return (
    <Grid container direction={"row"} justify={"flex-start"}>
      {range.map((value, i) => (
        <Grid key={i.toString()} item>
          <Button
            className={classes.questionBtn}
            variant={"outlined"}
            style={{ width:150, color: correct ? green[500] : red[500] }}>
            Question {i + 1}
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}
export const Result = () => {
  const classes = useStyles()
  console.log("result page")

  const correctAnswer = 2
  const questions = [{}, {}, {}]

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
            <Typography paragraph>
              {" "}
              You have asnwered {correctAnswer} out of {questions.length}{" "}
              correct.
            </Typography>
            <Typography variant={"h6"} gutterBottom>
              Questions Attempted
            </Typography>
            <Divider orientation={"horizontal"} />
            <ListOfButtons
              range={[1, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
              correct={true}
            />
          </CardContent>
          <CardContent>
            <Typography variant={"h6"} gutterBottom>
              Questions Not Attempted
            </Typography>
            <Divider orientation={"horizontal"} />
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum
            </Typography>
            <Typography>
              quod quia rem sapiente unde? Expedita hic corrupti possimus
              architecto quaerat veniam provident perferendis, magni
              perspiciatis ad, ipsum ducimus excepturi autem.
            </Typography>
            <ListOfButtons
              range={[
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
              ]}
              correct={false}
            />
          </CardContent>
          <CardActions>
            {/* TODO: number of question, timer, generate pdf, questions */}
            <Button color={"primary"} variant={"contained"}>
              Back
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
