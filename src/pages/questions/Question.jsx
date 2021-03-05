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

import { ConvertToFillInTheBlank } from "../../components/ConvertToFillInTheBlank"
import Editor from "rich-markdown-editor"
import { QUESTION_TYPE } from "../../helper/enum"
import { createMuiTheme } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  answerHeader: {
    marginTop: theme.spacing(5),
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
  onHandleFITBAnswer,
}) => {
  const classes = useStyles()
  const [selection, setSelection] = useState(question.selection)
  const theme = createMuiTheme()

  const showResult = (currentChoice) => {
    if (question.result !== undefined) {
      if (currentChoice === Number(question.answer) - 1) {
        return theme.palette.success.main
      } else if (currentChoice !== question.selectedAnswer) {
        return theme.palette.common.white
      } else {
        return theme.palette.error.main
      }
    }
    if (question.selection !== undefined || question.selection !== null) {
      if (currentChoice === question.selectedAnswer) {
        return theme.palette.info.main
      }
    }
  }

  const printButtonText = () => {
    if (question.type === QUESTION_TYPE.note) {
      if (isLastQuestion) {
        return "End"
      }
      return "Next"
    }
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

  const showExplain = () =>
    question.result !== undefined && question.explain !== undefined

  const subHeader = `${question.subject} | ${question.level} | ${question.topic}`

  const noteOrQuestion = () =>
    question.type === QUESTION_TYPE.note ? "Note" : "Question"

  return (
    <>
      <Grid item>
        <Card>
          <CardHeader
            title={`${noteOrQuestion()} ${index}`}
            subheader={subHeader}
          />
          <CardContent>
            {question.type === QUESTION_TYPE.fillInTheBlank ? (
              <ConvertToFillInTheBlank
                onSelectionChange={onHandleFITBAnswer}
                submitted={question.result !== undefined}
                rawText={question.question}
                selectedAnswer={question.selectedAnswer}
              />
            ) : (
              <Editor
                className={classes.question}
                readOnly
                defaultValue={
                  question.type === QUESTION_TYPE.note
                    ? question.explain
                    : question.question
                }
                value={
                  question.type === QUESTION_TYPE.note
                    ? question.explain
                    : question.question
                }
              />
            )}
          </CardContent>
        </Card>
      </Grid>
      {question.type === 1 && (
        <Grid container direction={"column"} item>
          <Typography
            className={classes.answerHeader}
            gutterBottom
            variant={"h5"}>
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
                    <Typography variant={"h5"}>
                      <Typography component={"span"} variant={"subtitle2"}>
                        {i + 1}.
                      </Typography>{" "}
                      {choice}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })}
        </Grid>
      )}
      {showExplain() && (
        <Grid item>
          <Card className={classes.answerCard}>
            <CardHeader title={"Explaination"} />
            <CardContent>
              <Editor
                className={classes.question}
                readOnly
                defaultValue={question.explain}
                value={question.explain}
              />
            </CardContent>
          </Card>
        </Grid>
      )}
      <Grid item>
        <Button
          style={{ float: "right" }}
          color={"primary"}
          variant={"contained"}
          onClick={() => onHandleAnswerClick(selection)}>
          {printButtonText()}
        </Button>
      </Grid>
    </>
  )
}
