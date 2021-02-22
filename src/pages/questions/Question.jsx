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

import { ConvertToFillInTheBlank } from "../../components/ConvertToFillInTheBlank"
import Editor from "rich-markdown-editor"
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

  const printButtonText = () => {
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

  return (
    <>
      <Grid item>
        <Card>
          <CardHeader title={`Question ${index}`} subheader={subHeader} />
          <CardContent>
            {question.type !== 1 ? (
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
                defaultValue={question.question}
                value={question.question}
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
