import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import { blue, green, red } from "@material-ui/core/colors"

import Editor from "rich-markdown-editor"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  answerHeader: {
    marginTop: theme.spacing(5)
  },
  answerCard: {
    marginBottom: theme.spacing(1),
  },
  question: { ...theme.typography.body1, fontSize: "1.4em" },
}))

export const Question = ({
  index,
  question,
  isLastQuestion,
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

  const printButton = () => {
    if (question.result !== undefined) {
      if (isLastQuestion) {
        return "End"
      } else {
        return "Next"
      }
    } else {
      return "Submit"
    }
  }

  const handleSelection = (sel) => {
    setSelection(sel)
    onHandleSelection(sel)
  }

  const subHeader = `${question.subject} | ${question.level} | ${question.topic} | ${question.year}`

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={`Question ${index}`} subheader={subHeader} />
          <CardContent>
            <Editor
              className={classes.question}
              readOnly
              defaultValue={question.question}
              value={question.question}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid
        className={classes.root}
        container
        direction={"column"}
        item
        xs={12}>
        <Typography className={classes.answerHeader} gutterBottom variant={"h5"}>
          Choose One
        </Typography>
        {question.choices.map((choice, i) => {
          return (
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
          )
        })}
      </Grid>
      <Grid item>
        <Button
          style={{ float: "right" }}
          color={"primary"}
          variant={"contained"}
          onClick={() => onHandleAnswerClick(selection)}>
          {printButton()}
        </Button>
      </Grid>
    </>
  )
}
