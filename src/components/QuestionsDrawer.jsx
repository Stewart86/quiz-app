import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core"
import { green, red } from "@material-ui/core/colors"

import { Cancel } from "@material-ui/icons"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import React from "react"

export const QuestionsDrawer = ({ questions, open, onHandleDrawer, goto }) => {
  const QuestionItem = ({ question, index }) => {
    return (
      <ListItem
        key={index.toString()}
        onClick={() => goto(index)}
        button
        divider>
        <ListItemIcon>
          {question.result !== undefined ? (
            question.result ? (
              <CheckCircleIcon style={{ color: green[500] }} />
            ) : (
              <Cancel style={{ color: red[500] }} />
            )
          ) : (
            ""
          )}
        </ListItemIcon>
        <ListItemText primary={`Question ${index}`} />
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
            question={questions[key]}
            index={key}
          />
        ))}
      </List>
    </SwipeableDrawer>
  )
}
