import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Grow,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import { blue, green, red } from "@material-ui/core/colors"

import Editor from "rich-markdown-editor"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  answerCard: {
    marginBottom: theme.spacing(4),
  },
  question:{ ...theme.typography.body1, fontSize:"1.4em"},
}))

export const Question = ({
  index,
  question,
  onHandleSelection,
  onHandleAnswerClick,
}) => {
  const classes = useStyles()
  const [selection, setSelection] = useState(question.selection)

  const showResult = (currentChoice) => {
    if (question.result !== undefined) {
      if (currentChoice === Number(question.answer) - 1) {
        return green[300]
      } else if (currentChoice !== question.selectedAnswer) {
        return "#fff"
      } else {
        return red[300]
      }
    }
    if (question.selection !== undefined || question.selection !== null) {
      if (currentChoice === question.selectedAnswer) {
        return blue[300]
      }
    }
  }
  const handleSelection = (sel) => {
    setSelection(sel)
    onHandleSelection(sel)
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
              <Editor
                className={classes.question}
                readOnly
                defaultValue={question.question}
                value={question.question}
              />
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
                  onClick={() => handleSelection(i)}>
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
        <Button
          color={"primary"}
          variant={"contained"}
          onClick={() => onHandleAnswerClick(selection)}>
          Confirm
        </Button>
      </Grid>
    </>
  )
}
