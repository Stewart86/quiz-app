import { Grid } from "@material-ui/core"
import { Nav } from "../components"
import React from "react"

export const CenterContentLayout = ({ children }) => {
  return (
    <>
      <Nav />
      <Grid alignItems={"center"} justify={"center"} container>
        {children}
      </Grid>
    </>
  )
}
