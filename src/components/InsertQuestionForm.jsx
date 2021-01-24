import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormLabel,
  TextField,
} from "@material-ui/core"
import React, { useState } from "react"
import { postNewQuestion, updateNewCategories } from "../firestore/questions"

import { Editor } from "@tinymce/tinymce-react"
import { InsertMultipleChoice } from "./InsertMultipleChoice"

export const InsertQuestionForm = ({ categories, handleNextInsert }) => {
  const [choices, setChoices] = useState([""])
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState(0)
  const [answerError, setAnswerError] = useState(true)

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
    if (!answer === 0) {
      await postNewQuestion({
        ...categories,
        question: question,
        choices: choices,
        type: "multipleChoice",
        answer: answer,
      })
      await updateNewCategories(categories)
      handleNextInsert()
    }
  }

  return (
    <Card>
      <CardHeader title={"Insert Question"} />
      <CardContent>
        <Editor
          initialValue=''
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
          <Button onClick={handleInsertQuestion}>Insert</Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}
