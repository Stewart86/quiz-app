import {
  Button,
  CardActions,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@material-ui/core"
import { FillInTheBlank, Loading } from "../../components"
import { LEVELS, SUBJECTS } from "../../helper/constants"
import React, { useEffect, useState } from "react"
import { getOne, post, updateOne } from "../../firestore/questions"
import { useHistory, useParams } from "react-router"

import { InsertCategoriesForm } from "./InsertCategoriesForm"
import { InsertQuestionForm } from "./InsertQuestionForm"
import { MultipleChoice } from "./MultipleChoice"
import { QUESTION_TYPE } from "../../helper/enum"
import { WarningSnackBar } from "../../components/WarningSnackBar"
import { createMuiTheme } from "@material-ui/core/styles"
import { isMultipleChoiceQuestionValid } from "../../helper/validation"
import { makeStyles } from "@material-ui/core/styles"
import { prepareAnswer } from "../../helper/utilities"
import { random } from "nanoid"
import { updateTopic } from "../../firestore/topics"

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.success.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  successBar: {
    background: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
}))

export const AddQuestion = () => {
  const classes = useStyles()
  const { id } = useParams()
  const history = useHistory()
  const theme = createMuiTheme()

  const [categories, setCategories] = useState({
    type: QUESTION_TYPE.multipleChoice,
    subject: SUBJECTS[0],
    level: LEVELS[0],
    topic: "",
    choices: [""],
    question: "",
    answer: 1,
    explain: "",
  })

  const [openSnackBar, setOpenSnackBar] = useState({ open: false, msg: "" })
  const [warning, setWarning] = useState({ open: false, msg: "" })
  const [loading, setLoading] = useState(false)
  const [rand, setRandom] = useState(random(5))

  const [defaultQuestion, setDefaultQuestion] = useState(null)
  const [defaultExplain, setDefaultExplain] = useState(null)

  useEffect(() => {
    if (id) {
      getQuestion(id)
    }
  }, [id])

  const getQuestion = async (id) => {
    const db = await getOne(id)
    setCategories(db)
    setDefaultExplain(db.explain)
    setDefaultQuestion(db.question)
  }

  const handleAnswer = (event) => {
    const answer = event.target.value
    setCategories({ ...categories, answer })
  }

  const handleEditorChange = (content) => {
    const question = content()
    setCategories({ ...categories, question })
  }

  const handleFITBChange = (question) => {
    const answer = prepareAnswer(question)
    setCategories({ ...categories, question, answer })
  }

  const handleExplainChange = (content) => {
    const explain = content()
    setCategories({ ...categories, explain })
  }

  const handleRemoveClick = (index) => {
    const list = [...categories.choices]
    list.splice(index, 1)
    setCategories({ ...categories, choices: list })
  }

  const handleAddClick = () => {
    setCategories({
      ...categories,
      choices: [...categories.choices, ""],
    })
  }

  const handleSetChoice = (event, i) => {
    const value = event.target.value
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

  const goBack = () => {
    history.goBack()
  }

  const handleInsertQuestion = async () => {
    setLoading(true)

    const fullQuestion = categories
    try {
      const validation = isMultipleChoiceQuestionValid(fullQuestion)

      if (validation.isValid) {
        if (id) {
          await updateOne(id, validation.result)
          await updateTopic(
            categories.type,
            categories.subject,
            categories.level,
            categories.topic
          )
          setOpenSnackBar({ open: true, msg: "Question Successfully updated." })
          history.goBack()
        } else {
          await post(validation.result)
          await updateTopic(
            categories.type,
            categories.subject,
            categories.level,
            categories.topic
          )
          handleNextInsert()
        }
      }
    } catch (error) {
      console.error(error)
      setWarning({ open: true, msg: error.message })
      setLoading(false)
    }
  }

  const handleNextInsert = () => {
    setCategories({ ...categories, answer: 1, question: "", choices: [""] })
    setRandom(random(5))
    setLoading(false)
    setOpenSnackBar({ open: true, msg: "Question Successfully added." })
  }

  return (
    <Container>
      <>
        <Grid container spacing={2} direction={"column"}>
          <Grid item>
            <Typography
              style={{
                color: id
                  ? theme.palette.success.main
                  : theme.palette.error.main,
                padding: 4,
              }}
              variant={"h4"}>
              {id ? "Update" : "Create New"}
            </Typography>
          </Grid>
          <Grid item>
            <InsertCategoriesForm
              categories={categories}
              handleChange={handleChange}
            />
          </Grid>
          {(() => {
            switch (categories.type) {
              case QUESTION_TYPE.multipleChoice:
                return (
                  <MultipleChoice
                    rand={rand}
                    categories={categories}
                    handleEditorChange={handleEditorChange}
                    handleAnswer={handleAnswer}
                    handleSetChoice={handleSetChoice}
                    handleRemoveClick={handleRemoveClick}
                    handleAddClick={handleAddClick}
                    editorDefault={defaultQuestion}
                  />
                )

              case QUESTION_TYPE.fillInTheBlank:
                return (
                  <FillInTheBlank
                    question={categories}
                    handleSetQuestion={handleFITBChange}
                  />
                )

              case QUESTION_TYPE.note:
                return

              default:
                return <Loading />
            }
          })()}
          <Grid item>
            <InsertQuestionForm
              key={rand}
              question={defaultExplain}
              editorTitle={categories.type === 3 ? "Note" : "Explanation"}
              handleEditorChange={handleExplainChange}
            />
          </Grid>
        </Grid>
        <Grid item>
          <CardActions>
            <Button onClick={goBack}>Back</Button>
            <div className={classes.wrapper}>
              <Button
                variant={"contained"}
                color={"primary"}
                disabled={loading}
                onClick={handleInsertQuestion}>
                {id ? "Update" : "Insert"}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </CardActions>
        </Grid>
        <Snackbar
          ContentProps={{
            classes: {
              root: classes.successBar,
            },
          }}
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
      </>
    </Container>
  )
}
