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
import React, { useState } from "react"
import { levels, subjects } from "../../helper/constants"

export const InsertCategoriesForm = ({ handleChange }) => {
  const [selSubject, setSubject] = useState(subjects[0])
  const [selLevel, setLevel] = useState(levels[0])
  const [selTopic, setTopic] = useState()

  const handleSubjectChange = (event) => {
    const subject = event.target.value
    setSubject(subject)
    handleChange({ subject })
  }

  const handleLevelChange = (event) => {
    const level = event.target.value
    setLevel(level)
    handleChange({ level })
  }

  const handleTopicChange = (event) => {
    const topic = event.target.value
    setTopic(topic)
    handleChange({ topic: topic })
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
                {subjects.map((value) => (
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
                {levels.map((value) => (
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
          <TextField
            value={selTopic}
            onChange={handleTopicChange}
            label={"Topic"}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}
