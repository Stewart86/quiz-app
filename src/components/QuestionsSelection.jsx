import {
  Button,
  ButtonGroup,
  Card,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"

import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded"
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

  const handleNext = () => {
    setActiveStep((state) => state + 1)
  }
  const handleBack = () => {
    setActiveStep((state) => state - 1)
  }

  const handleForm = (category) => {
    const key = Object.keys(category)[0]
    setCategory((state) => {
      const obj = {
        ...state,
        [key]: category[key],
      }
      return obj
    })
  }

  // topic - checkboxes
  // submit

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
                <Button className={classes.button} onClick={handleNext}>
                  Next
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
                <Button className={classes.button} onClick={handleNext}>
                  Next
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
                <Button className={classes.button} onClick={handleNext}>
                  Submit
                </Button>
              </div>
            </StepContent>
          </Step>
        </Stepper>
      </Card>
    </Grid>
  )
}
