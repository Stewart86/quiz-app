import { Backdrop, CircularProgress, Fade } from "@material-ui/core"

import React from "react"

export const Loading = () => {
  return (
    <Fade in>
      <Backdrop invisible open>
        <CircularProgress color={"primary"} />
      </Backdrop>
    </Fade>
  )
}
