import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  FormLabel,
  TextField,
} from "@material-ui/core"
import React, { useState } from "react"
import { postNewQuestion, updateNewCategories } from "../firestore/questions"

import { Editor } from "@tinymce/tinymce-react"
import { InsertMultipleChoice } from "./InsertMultipleChoice"
import { green } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/core/styles"

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
}))

export const InsertQuestionForm = ({ categories, handleNextInsert }) => {
  const classes = useStyles()
  const [choices, setChoices] = useState([""])
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState(-1)
  const [answerError, setAnswerError] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleAnswerError = (answer) => {
    const val = answer.target.value
    if (val > choices.length || val < 1) {
      setAnswerError(true)
    } else {
      setAnswerError(false)
      setAnswer(val - 1)
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
      await updateNewCategories(categories)
      setLoading(false)
      handleNextInsert()
    }
  }

  return (
    <Card>
      <CardHeader title={"Insert Question"} />
      <CardContent>
        <Editor
          apiKey="nsjjba31x54f5slt84a74owxenrmbe9xlj1esq35wwm7h3w7"
          initialValue=""
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar: `undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help`,
          }}
          onEditorChange={handleEditorChange}
        />
        <FormLabel component={"legend"}>Question Category</FormLabel>
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
          helperText={answerError ? "Enter the correct answer only" : ""}
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
    </Card>
  )
}
