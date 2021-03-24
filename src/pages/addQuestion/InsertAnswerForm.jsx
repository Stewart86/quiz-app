import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core"

import AddIcon from "@material-ui/icons/Add"
import { InsertMultipleChoice } from "./InsertMultipleChoice"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))
export const InsertAnswerForm = ({
  choices,
  handleAnswer,
  answer,
  handleSetChoice,
  handleRemoveClick,
  handleAddClick,
}) => {
  const classes = useStyles()
  return (
    <Card>
      <CardHeader title={"Answer"} />
      <CardContent>
        {choices.map((x, i) => {
          return (
            <InsertMultipleChoice
              key={i}
              index={i}
              choices={choices}
              handleSetChoice={handleSetChoice}
              handleRemoveClick={handleRemoveClick}
              handleAddClick={handleAddClick}
            />
          )
        })}
        <CardActions>
          <Button
            variant={"contained"}
            color={"secondary"}
            className={classes.button}
            onClick={handleAddClick}
            startIcon={<AddIcon />}>
            Add
          </Button>
        </CardActions>
        <CardActions>
          <FormControl>
            <InputLabel>Answer</InputLabel>
            <Select value={answer} onChange={handleAnswer}>
              {choices.map((value, i) => (
                <MenuItem key={i} value={i + 1}>
                  choice {i + 1} ({value})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardActions>
      </CardContent>
    </Card>
  )
}
