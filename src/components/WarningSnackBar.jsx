import { Snackbar } from "@material-ui/core"
import React from "react"
import { makeStyles } from "@material-ui/core"
import { red } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  warning: {
    background: red[600],
  },
}))

export const WarningSnackBar = ({ ...props }) => {
  const classes = useStyles()
  return (
    <Snackbar
      ContentProps={{
        classes: {
          root: classes.warning,
        },
      }}
      {...props}
    />
  )
}
