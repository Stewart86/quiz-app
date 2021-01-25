import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  SwipeableDrawer,
} from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"

import React from "react"

export const QuestionsDrawer = ({ questions, open, onHandleDrawer, goto }) => {
  const handleDrawer = (boolean) => {
    onHandleDrawer(boolean)
  }
  const test = (q) => {
    Object.keys(q).map((k) => console.log(q[k]))
  }
  return (
    <SwipeableDrawer
      anchor={"left"}
      open={open}
      onClose={() => handleDrawer(false)}
      onOpen={() => handleDrawer(true)}>
      <List>
        {test(questions)}
        {Object.keys(questions).map((key, i) => (
          <ListItem key={i} onClick={() => goto(i)} button>
            <ListItemText primary={`Question ` + (i + 1)} />
            {questions[key] ? (
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
            ) : (
              ""
            )}
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  )
}
