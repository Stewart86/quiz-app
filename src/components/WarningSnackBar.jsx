import React from "react"
import { Snackbar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  warning: {
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
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
