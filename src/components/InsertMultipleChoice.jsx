import {
  Divider,
  IconButton,
  InputBase,
  Paper,
} from "@material-ui/core"

import AddIcon from "@material-ui/icons/Add"
import React from "react"
import RemoveIcon from "@material-ui/icons/Remove"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

export const InsertMultipleChoice = ({
  index,
  choices,
  handleAddClick,
  handleRemoveClick,
  handleSetChoice,
}) => {
  const classes = useStyles()

  return (
    <>
          <Paper component={"form"} className={classes.root}>
            <InputBase
              className={classes.input}
              fullWidth
              placeholder={`Choice ${index + 1}`}
              onChange={(event) => handleSetChoice(event.target.value, index)}
            />
            <Divider className={classes.divider} orientation={"vertical"} />
            <IconButton
              disabled={choices.length === 1}
              variant='contained'
              color={"primary"}
              onClick={(e) => handleRemoveClick(index)}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              variant='contained'
              color={"primary"}
              onClick={handleAddClick}>
              <AddIcon />
            </IconButton>
            <Divider className={classes.divider} orientation={"vertical"} />
          </Paper>
    </>
  )
}
