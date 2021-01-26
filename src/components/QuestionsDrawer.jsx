import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core"

import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import React from "react"
import { green } from "@material-ui/core/colors"

export const QuestionsDrawer = ({ questions, open, onHandleDrawer, goto }) => {
  const QuestionItem = ({ completed, index }) => {
    return (
      <Grid item container justify={"space-between"} style={{width:"200px"}}>
        <ListItem key={index} onClick={() => goto(index)} button>
          <ListItemText primary={`Question ${index + 1}`} />
          <ListItemIcon>
            {completed && <CheckCircleIcon style={{ color: green[500] }} />}
          </ListItemIcon>
        </ListItem>
      </Grid>
    )
  }
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={open}
      onClose={() => onHandleDrawer(false)}
      onOpen={() => onHandleDrawer(true)}>
      <List>
        {Object.keys(questions).map((key, i) => (
          <QuestionItem
            key={i.toString()}
            completed={questions[key]}
            index={i}
          />
        ))}
      </List>
    </SwipeableDrawer>
  )
}
