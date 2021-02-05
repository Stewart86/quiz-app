import {
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Switch,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"

import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded"
import PrintIcon from "@material-ui/icons/Print"
import { getTopic } from "../firestore/topics"
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
}))
export const QuestionsSelection = ({
  data,
  handleOnChange,
  selection,
  handlePrintable,
  handleGetQuestions,
}) => {
  const classes = useStyles()

  const [activeStep, setActiveStep] = useState(0)
  const [category, setCategory] = useState({})
  const [topics, setTopics] = useState([])
  const [getTopicsLoader, setGetTopicsLoader] = useState(false)
  const [selectAll, setSelectAll] = useState(true)

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
        if (obj["subject"] && obj["level"]) {
          handleGetTopics(obj["subject"], obj["level"])
        }
      }
      return obj
    })
  }

  const handleGetTopics = async (subject, level) => {
    setGetTopicsLoader(true)
    const dbTopics = await getTopic(subject, level)
    setTopics(dbTopics)
    setGetTopicsLoader(false)
  }

  const handleSelectAll = () => {
    setSelectAll((state) => !state)
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
            <StepLabel>Subject</StepLabel>
            <StepContent>
              <Typography gutterBottom>
                Please select subject to revise.
              </Typography>
              <ButtonGroup color={"primary"}>
                {data.subject.map((value) => (
                  <Button
                    endIcon={
                      category["subject"] === value ? (
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
                {data.level.map((value) => (
                  <Button
                    endIcon={
                      category["level"] === value ? (
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
                {topics.map((value) => (
                  <FormControlLabel
                    label={value}
                    control={<Checkbox name={value} checked={selectAll} />}
                  />
                ))}
              </FormGroup>
              <Button className={classes.button} onClick={handleBack}>
                Back
              </Button>
              <Button className={classes.button} onClick={handleNext}>
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
                {data.difficulty.map((value) => (
                  <Button
                    endIcon={
                      category["difficulty"] === value ? (
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
