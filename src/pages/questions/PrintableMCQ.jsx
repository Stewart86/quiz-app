import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@material-ui/core"

import Editor from "rich-markdown-editor"
import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  answers: {
    marginTop: theme.spacing(2),
  },
  question: {
    ...theme.typography.body1,
    fontSize: "1.4em",
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(5),
  },
}))

export const PrintableMCQ = ({ count, question }) => {
  const classes = useStyles()
  return (
    <div>
      <Card>
        <CardHeader
          title={`Question ${count}`}
          subheader={`${question.subject} | ${question.level} | ${question.topic}`}
        />
        <CardContent>
          <Editor
            id={count}
            className={classes.question}
            theme={{ background: classes.question.backgroundColor }}
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
    </div>
  )
}
