import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"

import Editor from "rich-markdown-editor"
import { InsertMultipleChoice } from "./InsertMultipleChoice"
import { green } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/core/styles"
import { postNewQuestion } from "../firestore/questions"
import { uploadImage } from "../storage/questions"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  multipleChoiceTitle: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3),
  },
  editorWrapper: {
    padding: theme.spacing(3),
  },
  editor: theme.typography.body1,
}))

export const InsertQuestionForm = ({ categories }) => {
  const classes = useStyles()
  const [choices, setChoices] = useState([""])
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState(1)
  const [answerError, setAnswerError] = useState(true)
  const [loading, setLoading] = useState(false)
  const [openSnackBar, setOpenSnackBar] = useState(false)

  const handleSnackBarClose = () => {
    setOpenSnackBar(false)
  }
  const handleAnswerError = (answer) => {
    const val = answer.target.value
    if (val > choices.length || val < 1) {
      setAnswerError(true)
    } else {
      setAnswerError(false)
      setAnswer(val)
    }
  }

  const handleEditorChange = (content, editor) => {
    setQuestion(content)
  }

  const handleRemoveClick = (index) => {
    const list = [...choices]
    list.splice(index, 1)
    setChoices(list)
  }

  const handleAddClick = (event) => {
    setChoices([...choices, event.target.value])
  }
  const handleSetChoice = (value, i) => {
    let list = [...choices]
    list[i] = value
    setChoices(list)
  }

  const handleInsertQuestion = async () => {
    // if empty dont insert
    if (answer === -1) {
      return
    }
    if (answer < choices.length || answer > 1) {
      setLoading(true)
      await postNewQuestion({
        ...categories,
        question: question,
        choices: choices,
        type: "multipleChoice",
        answer: answer,
      })
      handleNextInsert()
      setLoading(false)
      setOpenSnackBar(true)
    }
  }

  const handleNextInsert = () => {
    setAnswer(1)
    setQuestion("")
    setChoices([""])
  }

  const handleUploadImage = async (file) => {
    const url = await uploadImage(file)
    return url
  }

  return (
    <Card>
      <CardHeader title={"Insert Question"} />
      <CardContent>
        <Paper className={classes.editorWrapper}>
          <Editor
            className={classes.editor}
            onChange={(v) => handleEditorChange(v)}
            placeholder={"Enter your question here..."}
            uploadImage={async (file) => handleUploadImage(file)}
          />
        </Paper>
        <Typography
          className={classes.multipleChoiceTitle}
          gutterBottom
          variant={"h5"}>
          Multiple Choices
        </Typography>
        {choices.map((x, i) => {
          return (
            <InsertMultipleChoice
              key={i}
              index={i}
              choices={choices}
              handleSetChoice={handleSetChoice}
              handleRemoveClick={handleRemoveClick}
              handleAddClick={handleAddClick}
            />
          )
        })}
        <TextField
          error={answerError}
          onChange={handleAnswerError}
          type={"number"}
          label={"Answer"}
          value={answer}
          helperText={answerError && "Enter the correct answer only"}
        />
        <CardActions>
          <div className={classes.wrapper}>
            <Button disabled={loading} onClick={handleInsertQuestion}>
              Insert
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </CardActions>
      </CardContent>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackBar}
        message={"Question Successfully added."}
        onClose={handleSnackBarClose}
        autoHideDuration={3000}
      />
    </Card>
  )
}
