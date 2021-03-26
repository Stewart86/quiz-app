import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core"
import { LEVELS, SUBJECTS, TYPES } from "../../helper/constants"
import React, { useContext, useEffect, useState } from "react"

import { AuthContext } from "../../components/AuthProvider"
import PrintIcon from "@material-ui/icons/Print"
import { QUESTION_TYPE } from "../../helper/enum"
import { genNumOfQuestions } from "../../helper/utilities"
import { getTopic } from "../../firestore/topics"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  centerContent: {
    minHeight: "94vh",
    width: "100%",
    paddingLeft: "80px",
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
  dropdown: {
    width: 230,
  },
  levelBtn: {
    borderRadius: 33,
    height: 43,
    minWidth: 43,
    padding: 6,
  },
  subjectBtn: {
    width: 100,
  },
}))

export const QuestionsSelection = ({
  type,
  handlePrintable,
  handleGetQuestions,
}) => {
  const classes = useStyles()

  const [category, setCategory] = useState({ ...type, numOfQuestions: 5 })
  const [topics, setTopics] = useState([])
  const [topicCount, setTopicCount] = useState(null)
  const [selectedTopics, setSelectedTopics] = useState([])
  const [numOfQuestions, setNumOfQuestions] = useState(5)
  const [isBeginDisabled, setIsBeginDisabled] = useState(true)
  const [isTrial, setIsTrial] = useState(true)
  const [selectAll, setSelectAll] = useState(false)

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (category.type && category.subject && category.level) {
      handleGetTopics(category.type, category.subject, category.level)
      setSelectedTopics([])
      setSelectAll(false)
      setCategory((state) => ({ ...state, topics: [] }))
      setIsBeginDisabled(true)
    } else {
      handleGetTopics(TYPES[0], SUBJECTS[0], LEVELS[0])
    }
  }, [category.type, category.subject, category.level])

  useEffect(() => {
    if (!isBeginDisabled) {
      if (currentUser.db.status === "active") {
        setIsTrial(false)
      }
      if (currentUser.role === "staff") {
        setIsTrial(false)
      }
    }
    if (isBeginDisabled) {
      setIsTrial(true)
    }
  }, [currentUser.role, currentUser.db.status, isBeginDisabled])

  useEffect(() => {
    if (topicCount === 0) {
      setSelectAll(false)
    } else if (topicCount === selectedTopics.length) {
      handleForm({ topics })
      setSelectAll(true)
    } else if (selectedTopics.length < topicCount) {
      setSelectAll(false)
    }
  }, [topics, topicCount, selectedTopics.length])

  const handleForm = (incomingCategory) => {
    const key = Object.keys(incomingCategory)[0]

    setCategory((state) => {
      let obj = null
      obj = {
        ...state,
        [key]: incomingCategory[key],
      }

      if (key === "numOfQuestions") {
        setNumOfQuestions(obj.numOfQuestions)
      }
      if (obj.subject && obj.level && obj.topics) {
        if (obj.topics.length === 0) {
          setIsBeginDisabled(true)
        } else {
          setIsBeginDisabled(false)
        }
      }
      return obj
    })
  }

  const handleGetTopics = async (type, subject, level) => {
    const dbTopics = await getTopic(type, subject, level)
    setTopics(dbTopics)
    setSelectedTopics(dbTopics)
    setTopicCount(dbTopics.length)
    setIsBeginDisabled(false)
  }

  const handleTopicChange = (event) => {
    setSelectedTopics(() => {
      const topics = event.target.value
      handleForm({ topics })
      return topics
    })
  }

  const handleSelectAll = () => {
    setSelectAll((selectAll) => {
      setSelectedTopics((selTopics) => {
        selTopics = topics
        if (selectAll) {
          selTopics = []
        }
        handleForm({ topics: selTopics })
        return selTopics
      })
      return !selectAll
    })
  }

  return (
    <Grid
      className={classes.centerContent}
      justify={"center"}
      spacing={10}
      direction={"column"}
      container>
      <Grid container justify={"center"} spacing={5} item>
        <Typography variant={"h3"}>Choose Your Quiz</Typography>
      </Grid>
      <Grid container justify={"center"} spacing={5} item>
        <ButtonGroup color={"primary"}>
          {category.type === QUESTION_TYPE.note
            ? ["English", "Chinese"].map((value) => (
                <Button
                  className={classes.subjectBtn}
                  key={value}
                  color={"primary"}
                  variant={
                    category.subject === value ? "contained" : "outlined"
                  }
                  onClick={() => handleForm({ subject: value })}>
                  {value}
                </Button>
              ))
            : SUBJECTS.map((value) => (
                <Button
                  className={classes.subjectBtn}
                  key={value}
                  color={"primary"}
                  variant={
                    category.subject === value ? "contained" : "outlined"
                  }
                  onClick={() => handleForm({ subject: value })}>
                  {value}
                </Button>
              ))}
        </ButtonGroup>
      </Grid>
      <Grid container justify={"center"} spacing={5} item>
        {LEVELS.map((value) => (
          <Grid key={value} item>
            <Button
              className={classes.levelBtn}
              color={"primary"}
              variant={category.level === value ? "contained" : "outlined"}
              key={value}
              onClick={() => handleForm({ level: value })}>
              {value}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid container justify={"center"} spacing={5} item>
        <Grid item>
          <FormControl>
            <InputLabel>Topic</InputLabel>
            <Select
              className={classes.dropdown}
              multiple
              label={"Topic"}
              value={selectedTopics}
              onChange={handleTopicChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}>
              {topics.map((value) => (
                <MenuItem key={value} value={value}>
                  <Checkbox checked={selectedTopics.indexOf(value) > -1} />
                  <ListItemText primary={value} />
                </MenuItem>
              ))}
            </Select>
            <FormControlLabel
              control={
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              }
              label={"Select All"}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel>
              {category.type === QUESTION_TYPE.note
                ? "Number of Creative Writing"
                : "Number of Questions"}
            </InputLabel>
            <Select
              label={"Number of Questions"}
              className={classes.dropdown}
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
        </Grid>
      </Grid>
      <Grid container direction={"row"} justify={"center"} spacing={5} item>
        <Grid item>
          <Button
            className={classes.button}
            variant={"contained"}
            color={"primary"}
            disabled={isBeginDisabled}
            onClick={() => handleGetQuestions(category)}>
            Begin
          </Button>
        </Grid>
        <Grid item>
          <IconButton
            disabled={isTrial}
            color={"secondary"}
            className={classes.button}
            onClick={() => handlePrintable(category)}>
            <PrintIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
