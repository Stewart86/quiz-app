import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core"

import React from "react"
import grey from "@material-ui/core/colors/grey"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  answers: {
    marginTop: theme.spacing(2),
  },
}))

export const Question = ({
  count,
  test,
  question,
  selectedAnswer,
  onHandleAnswerClick,
}) => {
  const classes = useStyles()

  const handleAnswerClick = (ans) => {
    onHandleAnswerClick(ans)
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          title={`Question ${count}`}
          subheader={`${question.subject} | ${question.level} | ${question.school} | ${question.year}`}
        />
        <CardContent>
          <Typography variant={"subtitle1"} gutterBottom>
            <span dangerouslySetInnerHTML={{ __html: question.question }} />
          </Typography>
          {question.choices.map((choice, i) => {
            return (
              <CardActionArea
                style={{
                  backgroundColor: selectedAnswer === i ? grey[300] : "#fff",
                }}
                key={i}
                onClick={() => handleAnswerClick(i)}>
                <Typography
                  className={classes.answers}
                  variant={"body1"}
                  display={"block"}
                  paragraph>
                  {i + 1}. {choice}
                </Typography>
              </CardActionArea>
            )
          })}
        </CardContent>
      </Card>
    </Grid>
  )
}
