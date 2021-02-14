import {
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Switch,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import { difficulties, levels, subjects, types } from "../../helper/constants"
import {
  genNumOfQuestions,
  getSelectionFromTopics,
  isAllSelected,
} from "../../helper/utilities"

import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded"
import PrintIcon from "@material-ui/icons/Print"
import { getTopic } from "../../firestore/topics"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  centerContent: {
    minHeight: "94vh",
  },
  actionContainer: {
    marginBottom: theme.spacing(2),
  },
  subjectArea: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  numOfQuestionsForm: {
    margin: theme.spacing(1),
    minWidth: 185,
  },
}))
export const QuestionsSelection = ({
  handlePrintable,
  handleGetQuestions,
}) => {
  const classes = useStyles()

  const [activeStep, setActiveStep] = useState(0)
  const [category, setCategory] = useState({})
  const [topics, setTopics] = useState({})
  const [getTopicsLoader, setGetTopicsLoader] = useState(false)
  const [selectAll, setSelectAll] = useState(true)
  const [numOfQuestions, setNumOfQuestions] = useState([])

  const handleNext = () => {
    setActiveStep((state) => state + 1)
  }
  const handleBack = () => {
    setActiveStep((state) => state - 1)
  }

  const handleForm = (incomingCategory) => {
    const key = Object.keys(incomingCategory)[0]

    setCategory((state) => {
      const obj = {
        ...state,
        [key]: incomingCategory[key],
      }
      if (key === "level" || key === "subject") {
        if (obj.subject && obj.level) {
          handleGetTopics(obj.subject, obj.level)
        }
      } else if (key === "numOfQuestions") {
        setNumOfQuestions(obj.numOfQuestions)
      }
      return obj
    })
  }

  const handleGetTopics = async (subject, level) => {
    setGetTopicsLoader(true)

    const dbTopics = await getTopic(subject, level)
    let topics = {}
    dbTopics.forEach((value) => {
      topics[value] = true
    })
    setTopics(topics)

    setGetTopicsLoader(false)
  }

  const handleSelectAll = () => {
    setSelectAll((state) => {
      const obj = topics

      if (state) {
        Object.keys(obj).forEach((key) => {
          obj[key] = false
        })
        setTopics(obj)
      } else {
        Object.keys(obj).forEach((key) => {
          obj[key] = true
        })
        setTopics(obj)
      }

      return !state
    })
  }

  const handleCheckBox = (event) => {
    const checked = event.target.checked
    let obj
    if (checked) {
      obj = { [event.target.name]: true }
    } else {
      obj = { [event.target.name]: false }
    }
    setTopics((state) => {
      if (isAllSelected(state, checked)) {
        setSelectAll(true)
      } else {
        setSelectAll(false)
      }
      return { ...state, ...obj }
    })
  }

  const handleTopicNext = () => {
    if (selectAll) {
      handleForm({ topics: ["all"] })
    } else {
      handleForm({ topics: getSelectionFromTopics(topics) })
    }

    handleNext()
  }

  return (
    <Grid
      className={classes.centerContent}
      alignContent={"center"}
      justify={"center"}
      container>
      <Card style={{ minWidth: 760 }}>
        <Stepper activeStep={activeStep} orientation={"vertical"}>
          <Step>
            <StepLabel>Type of Quiz</StepLabel>
            <StepContent>
              <Typography gutterBottom>
                Please select the type of quiz to attempt or notes to study.
              </Typography>
              <ButtonGroup color={"primary"}>
                {types.map((value) => (
                  <Button
                    endIcon={
                      category.type === value ? (
                        <AssignmentTurnedInRoundedIcon />
                      ) : null
                    }
                    onClick={() => handleForm({ type: value })}>
                    {value}
                  </Button>
                ))}
              </ButtonGroup>
              <div className={classes.actionContainer}>
                <Button
                  className={classes.button}
                  disabled={activeStep === 0}
                  onClick={handleBack}>
                  Back
                </Button>
                <Button
                  disabled={getTopicsLoader}
                  className={classes.button}
                  onClick={handleNext}>
                  Next
                  {getTopicsLoader && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Subject</StepLabel>
            <StepContent>
              <Typography gutterBottom>
                Please select subject to revise.
              </Typography>
              <ButtonGroup color={"primary"}>
                {subjects.map((value) => (
                  <Button
                    endIcon={
                      category.subject === value ? (
                        <AssignmentTurnedInRoundedIcon />
                      ) : null
                    }
                    onClick={() => handleForm({ subject: value })}>
                    {value}
                  </Button>
                ))}
              </ButtonGroup>
              <div className={classes.actionContainer}>
                <Button
                  className={classes.button}
                  disabled={activeStep === 0}
                  onClick={handleBack}>
                  Back
                </Button>
                <Button
                  disabled={getTopicsLoader}
                  className={classes.button}
                  onClick={handleNext}>
                  Next
                  {getTopicsLoader && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Level</StepLabel>
            <StepContent>
              <Typography>Please select the education level.</Typography>
              <ButtonGroup color={"primary"}>
                {levels.map((value) => (
                  <Button
                    endIcon={
                      category.level === value ? (
                        <AssignmentTurnedInRoundedIcon />
                      ) : null
                    }
                    onClick={() => handleForm({ level: value })}>
                    {value}
                  </Button>
                ))}
              </ButtonGroup>
              <div className={classes.actionContainer}>
                <Button className={classes.button} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  disabled={getTopicsLoader}
                  className={classes.button}
                  onClick={handleNext}>
                  Next
                  {getTopicsLoader && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Topic</StepLabel>
            <StepContent>
              <Typography>
                Pick a topic for the subject you selected above.
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  label={"Select All"}
                  control={
                    <Switch checked={selectAll} onChange={handleSelectAll} />
                  }
                />
              </FormGroup>
              <Divider />
              <FormGroup style={{ maxHeight: "60vh" }}>
                {Object.keys(topics).map((value) => (
                  <FormControlLabel
                    label={value}
                    control={
                      <Checkbox
                        name={value}
                        checked={topics[value]}
                        onChange={(event) => handleCheckBox(event)}
                      />
                    }
                  />
                ))}
              </FormGroup>
              <Button className={classes.button} onClick={handleBack}>
                Back
              </Button>
              <Button className={classes.button} onClick={handleTopicNext}>
                Next
              </Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Select difficulty</StepLabel>
            <StepContent>
              <Typography>
                Choose a difficulty level or select all for randomised
                difficulties.
              </Typography>
              <ButtonGroup color={"primary"}>
                {difficulties.map((value) => (
                  <Button
                    key={value}
                    endIcon={
                      category.difficulty === value ? (
                        <AssignmentTurnedInRoundedIcon />
                      ) : null
                    }
                    onClick={() => handleForm({ difficulty: value })}>
                    {value}
                  </Button>
                ))}
              </ButtonGroup>
              <div className={classes.actionContainer}>
                <Button className={classes.button} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  disabled={getTopicsLoader}
                  className={classes.button}
                  onClick={handleNext}>
                  Next
                  {getTopicsLoader && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Number of Questions</StepLabel>
            <StepContent>
              <Typography>
                Select the number off questions to attempt.
              </Typography>
              <FormControl className={classes.numOfQuestionsForm}>
                <InputLabel>Number of Questions</InputLabel>
                <Select
                  value={numOfQuestions}
                  onChange={(event) =>
                    handleForm({ numOfQuestions: event.target.value })
                  }>
                  {genNumOfQuestions().map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className={classes.actionContainer}>
                <Button className={classes.button} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  className={classes.button}
                  onClick={() => handleGetQuestions(category)}>
                  Start Quiz
                </Button>
                <IconButton
                  className={classes.button}
                  onClick={() => handlePrintable(category)}>
                  <PrintIcon />
                </IconButton>
              </div>
            </StepContent>
          </Step>
        </Stepper>
      </Card>
    </Grid>
  )
}
