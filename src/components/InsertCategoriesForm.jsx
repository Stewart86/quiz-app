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
import { difficulties, levels, subjects } from "../helper/constants"

export const InsertCategoriesForm = ({
  categories,
  handleChange,
  handleInsertClick,
}) => {
  const [selSubject, setSubject] = useState()
  const [selLevel, setLevel] = useState()
  const [selDifficulty, setDifficulty] = useState()
  const [selTopic, setTopic] = useState()

  const handleSubjectChange = (event) => {
    const val = event.target.value
    setSubject(val)
    handleChange({ subject: val })
  }

  const handleLevelChange = (event) => {
    const val = event.target.value
    setLevel(val)
    handleChange({ level: val })
  }

  const handleDifficultyChange = (event) => {
    const val = event.target.value
    setDifficulty(val)
    handleChange({ difficulty: val })
  }

  const handleTopicChange = (event) => {
    const val = event.target.value
    setTopic(val)
    handleChange({ topic: val })
  }
  // topic textbox

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
          <Grid item>
            <FormControl component={"fieldset"}>
              <FormLabel component={"legend"}>Difficulty</FormLabel>
              <RadioGroup
                row
                value={selDifficulty}
                onChange={handleDifficultyChange}>
                {difficulties.map((value) => (
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
