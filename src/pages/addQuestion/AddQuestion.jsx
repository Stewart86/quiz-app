import {
  Button,
  CardActions,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
} from "@material-ui/core"
import { LEVELS, SUBJECTS } from "../../helper/constants"
import React, { useEffect, useState } from "react"
import { getOne, post, updateOne } from "../../firestore/questions"
import { useHistory, useParams } from "react-router"

import { InsertAnswerForm } from "./InsertAnswerForm"
import { InsertCategoriesForm } from "./InsertCategoriesForm"
import { InsertQuestionForm } from "./InsertQuestionForm"
import { WarningSnackBar } from "../../components/WarningSnackBar"
import { green } from "@material-ui/core/colors"
import { isMultipleChoiceQuestionValid } from "../../helper/validation"
import { makeStyles } from "@material-ui/core/styles"
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

export const AddQuestion = () => {
  const classes = useStyles()
  const { id } = useParams()
  const history = useHistory()

  const [categories, setCategories] = useState({
    subject: SUBJECTS[0],
    level: LEVELS[0],
    type: ["multipleChoice"],
    choices: [""],
  })
  const [openSnackBar, setOpenSnackBar] = useState({ open: false, msg: "" })
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState({ open: false, msg: "" })
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState(1)
  const [rand, setRandom] = useState(random(5))
  const [explain, setExplain] = useState("")

  useEffect(() => {
    const getQuestion = async (id) => {
      const db = await getOne(id)
      setCategories(db)
      setQuestion(db.question)
      return db
    }
    if (id) {
      getQuestion(id)
    }
  }, [id])

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
    const list = [...categories.choices]
    list.splice(index, 1)
    setCategories({ ...categories, choices: list })
  }

  const handleAddClick = (event) => {
    setCategories({
      ...categories,
      choices: [...categories.choices, event.target.value],
    })
  }
  const handleSetChoice = (value, i) => {
    let list = [...categories.choices]
    list[i] = value
    setCategories({ ...categories, choices: list })
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
      choices: categories.choices,
      answer,
      explain,
      type,
    }
    try {
      const validation = isMultipleChoiceQuestionValid(fullQuestion)

      if (validation) {
        if (id) {
          await updateOne(id, fullQuestion)
          setOpenSnackBar({ open: true, msg: "Question Successfully updated." })
          history.goBack()
        } else {
          await post(fullQuestion)
          await updateTopic(
            categories.subject,
            categories.level,
            categories.topic
          )
          handleNextInsert()
        }
      }
    } catch (error) {
      setWarning({ open: true, msg: error.message })
      setLoading(false)
    }
  }
  const handleNextInsert = () => {
    setAnswer(1)
    setQuestion("")
    setCategories({ ...categories, choices: [""] })
    setRandom(random(5))
    setLoading(false)
    setOpenSnackBar({ open: true, msg: "Question Successfully added." })
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
            question={categories.question}
            editorTitle={"Question"}
            handleEditorChange={handleEditorChange}
          />
        </Grid>
        <Grid item>
          <InsertAnswerForm
            choices={categories.choices}
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
            question={categories.explain}
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
              {id ? "Update" : "Insert"}
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </CardActions>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackBar.open}
        message={openSnackBar.msg}
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
