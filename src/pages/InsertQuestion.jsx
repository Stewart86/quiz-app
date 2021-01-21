import { Button, Paper, Typography } from "@material-ui/core"
import React, { useState } from "react"

import { Editor } from "@tinymce/tinymce-react"
import InsertMultipleChoice from "../components/InsertMultipleChoice"
import { db } from "../firestore"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}))

export default function InsertQuestion() {
  const classes = useStyles()

  const [choices, setChoices] = useState([""])
  const [question, setQuestion] = useState("")
  // const [answer, setAnswer] = useState(0)

  const handleRemoveClick = (index) => {
    const list = [...choices]
    list.splice(index, 1)
    setChoices(list)
  }

  const handleAddClick = (event) => {
    setChoices([...choices, event.value])
  }
  const handleEditorChange = (content, editor) => {
    setQuestion(content)
  }

  const handleInsertQuestion = () => {
    const answer = 1
    console.log({
      question: question,
      choices: choices,
      type: "multipleChoice",
      answer: answer,
    })
    db.collection("questions")
      .doc().set({
        question: question,
        choices: choices,
        type: "multipleChoice",
        answer: answer,
      })
      .then(() => console.log("done"))
      .catch((error) => console.error(error))
  }
  return (
    <>
      <Paper className={classes.paper}>
        <Typography variant={"h2"}>Insert Question</Typography>
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
        <InsertMultipleChoice
          choices={choices}
          handleRemoveClick={handleRemoveClick}
          handleAddClick={handleAddClick}
        />
        <Button
          variant='contained'
          color={"primary"}
          onClick={handleInsertQuestion}>
          Insert
        </Button>
      </Paper>
    </>
  )
}
