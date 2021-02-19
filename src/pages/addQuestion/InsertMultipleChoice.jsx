import { Divider, IconButton, InputBase, Paper } from "@material-ui/core"

import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined"
import React from "react"
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
  divider: {
    height: 28,
    margin: 4,
  },
}))

export const InsertMultipleChoice = ({
  index,
  choices,
  handleRemoveClick,
  handleSetChoice,
  handleAddClick,
}) => {
  const classes = useStyles()

  return (
    <>
      <Paper component={"form"} className={classes.root}>
        <InputBase
          className={classes.input}
          autoFocus
          fullWidth
          placeholder={`Choice ${index + 1}`}
          value={choices[index]}
          onChange={(event) => handleSetChoice(event, index)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              handleAddClick(event)
            }
          }}
        />
        <Divider className={classes.divider} orientation={"vertical"} />
        <IconButton
          disabled={choices.length === 1}
          variant='contained'
          color={"secondary"}
          onClick={(e) => handleRemoveClick(index)}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Paper>
    </>
  )
}
