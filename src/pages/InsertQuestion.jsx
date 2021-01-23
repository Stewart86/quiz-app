import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  FormLabel,
} from "@material-ui/core"
import React, { useState } from "react"
import { postNewQuestion, updateNewCategories } from "../firestore/questions"

import { Editor } from "@tinymce/tinymce-react"
import InsertMultipleChoice from "../components/InsertMultipleChoice"
import { useHistory } from "react-router-dom"

export default function InsertQuestion({ categories }) {
  const history = useHistory()

  const [choices, setChoices] = useState([""])
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState(-1)

  const handleEditorChange = (content, editor) => {
    setQuestion(content)
  }

  const handleRemoveClick = (index) => {
    const list = [...choices]
    list.splice(index, 1)
    setChoices(list)
  }

  const handleAddClick = (event) => {
    setChoices([...choices, event.value])
    console.log(choices)
  }
  const handleSetChoice = (value, i) => {
    console.log(value)
    let list = [...choices]
    list[i] = value
    setChoices(list)
  }

  const handleAnswerClick = (i) => {
    setAnswer(i)
  }

  const handleInsertQuestion = async () => {
    await postNewQuestion({
      ...categories,
      question: question,
      choices: choices,
      type: "multipleChoice",
      answer: answer,
    })
    await updateNewCategories(categories)
    history.push("/insertquestionoptions")
  }

  return (
    <Card>
      <CardHeader title={"Insert Question"} />
      <CardContent>
        <Editor
          initialValue='<p>This is the initial content of the editor</p>'
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
          <InsertMultipleChoice
            choices={choices}
            handleSetChoice={handleSetChoice}
            handleRemoveClick={handleRemoveClick}
            handleAddClick={handleAddClick}
            handleAnswerClick={handleAnswerClick}
            answer={answer}
          />
        <CardActionArea>
          <CardActions>
            <Button onClick={handleInsertQuestion}>Insert</Button>
          </CardActions>
        </CardActionArea>
      </CardContent>
    </Card>
  )
}
