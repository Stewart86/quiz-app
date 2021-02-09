import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core"

import Editor from "rich-markdown-editor"
import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  answers: {
    marginTop: theme.spacing(2),
  },
  question:{ ...theme.typography.body1, fontSize:"1.4em", marginBottom: theme.spacing(5)},
}))

export const PrintableQuestions = ({ count, question }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          title={`Question ${count}`}
          subheader={`${question.subject} | ${question.level} | ${question.topic} | ${question.difficulty}`}
        />
        <CardContent>
          <Editor
            className={classes.question}
            readOnly
            defaultValue={question.question}
          />
          <Divider />
          {question.choices.map((choice, i) => {
            return (
              <CardActionArea key={i}>
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
