import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Grow,
  Typography,
} from "@material-ui/core"
import { green, red } from "@material-ui/core/colors"

import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  answerCard: {
    marginBottom: theme.spacing(4),
  },
}))

export const Question = ({ index, question, onHandleAnswerClick }) => {
  const classes = useStyles()

  const showResult = (currentChoice) => {
    if (question.result !== undefined) {
      if (currentChoice === question.answer) {
        return green[300]
      } else if (currentChoice !== question.selectedAnswer) {
        return "#fff"
      } else {
        return red[300]
      }
    }
  }

  return (
    <>
      <Grid item xs={12} sm={8}>
        <Grow in={true}>
          <Card>
            <CardHeader
              title={`Question ${index}`}
              subheader={`${question.subject} | ${question.level} | ${question.school} | ${question.year}`}
            />
            <CardContent>
              <Typography variant={"subtitle1"} gutterBottom>
                <span dangerouslySetInnerHTML={{ __html: question.question }} />
              </Typography>
            </CardContent>
          </Card>
        </Grow>
      </Grid>
      <Grid
        className={classes.root}
        container
        direction={"column"}
        item
        xs={12}
        sm={4}>
        {question.choices.map((choice, i) => {
          return (
            <Grow key={i.toString()} in={true}>
              <Card className={classes.answerCard}>
                <CardActionArea
                  disabled={question.result !== undefined}
                  key={i}
                  onClick={() => onHandleAnswerClick(i)}>
                  <CardContent
                    style={{
                      backgroundColor: showResult(i),
                    }}>
                    <Typography variant={"h6"}>
                      {i + 1}. {choice}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grow>
          )
        })}
      </Grid>
    </>
  )
}
