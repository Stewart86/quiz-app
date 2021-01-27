import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Grow,
  Typography,
} from "@material-ui/core"

import React from "react"
import grey from "@material-ui/core/colors/grey"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  answers: {
    marginTop: theme.spacing(2),
  },
  answerCard: {
    marginBottom: theme.spacing(4),
  },
}))

export const Question = ({
  count,
  question,
  selectedAnswer,
  onHandleAnswerClick,
}) => {
  const classes = useStyles()

  const handleAnswerClick = (ans) => {
    onHandleAnswerClick(ans)
  }

  return (
    <>
      <Grid item xs={12} sm={8}>
        <Grow in={true}>
          <Card>
            <CardHeader
              title={`Question ${count}`}
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
            <Grow in={true}>
              <Card className={classes.answerCard}>
                <CardContent>
                  <CardActionArea
                    style={{
                      backgroundColor:
                        selectedAnswer === i ? grey[300] : "#fff",
                    }}
                    key={i}
                    onClick={() => handleAnswerClick(i)}>
                    <Typography variant={"body1"} display={"block"} paragraph>
                      {i + 1}. {choice}
                    </Typography>
                  </CardActionArea>
                </CardContent>
              </Card>
            </Grow>
          )
        })}
      </Grid>
    </>
  )
}
