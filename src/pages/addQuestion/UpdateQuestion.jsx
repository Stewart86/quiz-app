import {
  Button,
  CardActions,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
} from "@material-ui/core"
import React, { useState } from "react"
import { levels, subjects } from "../../helper/constants"

import { InsertAnswerForm } from "./InsertAnswerForm"
import { InsertCategoriesForm } from "./InsertCategoriesForm"
import { InsertQuestionForm } from "./InsertQuestionForm"
import { WarningSnackBar } from "../../components/WarningSnackBar"
import { green } from "@material-ui/core/colors"
import { isMultipleChoiceQuestionValid } from "../../helper/validation"
import { makeStyles } from "@material-ui/core/styles"
import { post } from "../../firestore/questions"
import { random } from "nanoid"
import { updateTopic } from "../../firestore/topics"

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
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

export const UpdateQuestion = () => {
  const classes = useStyles()

  const [categories, setCategories] = useState({
    subject: subjects[0],
    level: levels[0],
    type: ["multipleChoice"],
  })
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState({ open: false, msg: "" })
  const [question, setQuestion] = useState("")
  const [choices, setChoices] = useState([""])
  const [answer, setAnswer] = useState(1)
  const [rand, setRandom] = useState(random(5))
  const [explain, setExplain] = useState("")

  const handleAnswer = (answer) => {
    const val = answer.target.value
    setAnswer(Number(val))
  }

  const handleEditorChange = (content) => {
    setQuestion(content)
  }
  const handleExplainChange = (content) => {
    setExplain(content)
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
  const handleChange = (newValue) => {
    setCategories((state) => ({ ...state, ...newValue }))
  }
  const handleSnackBarClose = () => {
    setOpenSnackBar(false)
  }
  const handleWarningClose = () => {
    setWarning({ open: false, msg: "" })
  }
  const handleInsertQuestion = async () => {
    setLoading(true)
    const type = "multipleChoice"
    const fullQuestion = {
      ...categories,
      question,
      choices,
      answer,
      explain,
      type,
    }
    try {
      const validation = isMultipleChoiceQuestionValid(fullQuestion)

      if (validation) {
        await post(fullQuestion)
        await updateTopic(
          categories.subject,
          categories.level,
          categories.topic
        )
        handleNextInsert()
      }
    } catch (error) {
      setWarning({ open: true, msg: error.message })
      setLoading(false)
    }
  }
  const handleNextInsert = () => {
    setAnswer(1)
    setQuestion("")
    setChoices([""])
    setRandom(random(5))
    setLoading(false)
    setOpenSnackBar(true)
  }

  return (
    <Container>
      <Grid container spacing={2} direction={"column"}>
        <Grid item>
          <InsertCategoriesForm
            categories={categories}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item>
          <InsertQuestionForm
            key={rand}
            editorTitle={"Question"}
            handleEditorChange={handleEditorChange}
          />
        </Grid>
        <Grid item>
          <InsertAnswerForm
            choices={choices}
            handleAnswer={handleAnswer}
            answer={answer}
            handleSetChoice={handleSetChoice}
            handleRemoveClick={handleRemoveClick}
            handleAddClick={handleAddClick}
          />
        </Grid>
        <Grid item>
          <InsertQuestionForm
            key={rand}
            editorTitle={"Explaination"}
            handleEditorChange={handleExplainChange}
          />
        </Grid>
      </Grid>
      <Grid item>
        <CardActions>
          <div className={classes.wrapper}>
            <Button
              variant={"contained"}
              color={"primary"}
              disabled={loading}
              onClick={handleInsertQuestion}>
              Insert
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </CardActions>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackBar}
        message={"Question Successfully added."}
        onClose={handleSnackBarClose}
        autoHideDuration={3000}
      />
      <WarningSnackBar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={warning.open}
        message={warning.msg}
        onClose={handleWarningClose}
        autoHideDuration={3000}
      />
    </Container>
  )
}
