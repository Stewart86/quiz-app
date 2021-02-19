import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete"
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core"
import { LEVELS, SUBJECTS } from "../../helper/constants"
import React, { useEffect, useState } from "react"

import { getTopic } from "../../firestore/topics"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  topicInput: {
    marginTop: theme.spacing(3),
  },
}))

const filter = createFilterOptions()

export const InsertCategoriesForm = ({ categories, handleChange }) => {
  const classes = useStyles()

  const [selSubject, setSubject] = useState(categories.subject || SUBJECTS[0])
  const [selLevel, setLevel] = useState(categories.level || LEVELS[0])
  const [selTopic, setSelTopic] = useState({ topic: categories.topic})
  const [topicOptions, setTopicOptions] = useState([])

  useEffect(() => {
    const setOptions = async () => {
      const topics = await getTopic(selSubject, selLevel)
      let arr = []
      topics.forEach((topic) => arr.push({ topic }))
      setTopicOptions(arr)
    }
    if (categories.topic) {
      setSelTopic({topic:categories.topic || ""})
    } else {
      setOptions()
    }
  }, [selSubject, selLevel, categories.topic])

  const handleSubjectChange = async (event) => {
    const subject = event.target.value
    setSubject(subject)
    handleChange({ subject })
  }

  const handleLevelChange = async (event) => {
    const level = event.target.value
    setLevel(level)
    handleChange({ level })
  }

  return (
    <Card>
      <CardHeader title={"Question Categories"} />
      <CardContent>
        <Grid container spacing={3} direction={"column"}>
          <Grid item>
            <FormControl component={"fieldset"}>
              <FormLabel component={"legend"}>Subject</FormLabel>
              <RadioGroup row value={selSubject} onChange={handleSubjectChange}>
                {SUBJECTS.map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl component={"fieldset"}>
              <FormLabel component={"legend"}>Level</FormLabel>
              <RadioGroup row value={selLevel} onChange={handleLevelChange}>
                {LEVELS.map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item>
          <Autocomplete
            className={classes.topicInput}
            value={selTopic}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setSelTopic({
                  topic: newValue,
                })
                handleChange({ topic: newValue })
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setSelTopic({
                  topic: newValue.inputValue,
                })
                handleChange({
                  topic: newValue.inputValue,
                })
              } else {
                setSelTopic(newValue)
                handleChange(newValue)
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params)

              // Suggest the creation of a new value
              if (params.inputValue !== "") {
                filtered.push({
                  inputValue: params.inputValue,
                  topic: `Add "${params.inputValue}"`,
                })
              }

              return filtered
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={topicOptions}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === "string") {
                return option
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue
              }
              // Regular option
              return option.topic
            }}
            renderOption={(option) => option.topic}
            style={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label='Topic' variant='outlined' />
            )}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}
