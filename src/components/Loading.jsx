import { Backdrop, CircularProgress, Typography } from "@material-ui/core"

import React from "react"

export const Loading = () => {
  return (
    <Backdrop open>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
