import {
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
        <ListItem key={index.toString()} onClick={() => goto(index)} button divider>
          <ListItemIcon>
            {completed && <CheckCircleIcon style={{ color: green[500] }} />}
          </ListItemIcon>
          <ListItemText primary={`Question ${index + 1}`} />
        </ListItem>
    )
  }
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={open}
      onClose={() => onHandleDrawer(false)}
      onOpen={() => onHandleDrawer(true)}>
      <List component={"nav"}>
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
