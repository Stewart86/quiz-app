import {
  Card,
  CardContent,
  CardHeader,
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
    marginBottom: theme.spacing(5),
  },
}))
export const PrintableNote = ({ question, count }) => {
  const classes = useStyles()
  return (
    <div>
      <Card>
        <CardHeader
          title={`Note ${count}`}
          subheader={`${question.subject} | ${question.level} | ${question.topic}`}
        />
        <CardContent>
          <Editor
            id={count}
            className={classes.question}
            readOnly
            defaultValue={question && question.question}
          />
        </CardContent>
      </Card>
    </div>
  )
}
