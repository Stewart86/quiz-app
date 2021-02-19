import { Grid } from "@material-ui/core"
import { Nav } from "../components"
import React from "react"
import { Route } from "react-router-dom"

const CenterContentLayout = ({ children }) => {

  return (
    <>
      <Nav />
      <Grid
        alignItems={"center"}
        justify={"center"}
        container>
        {children}
      </Grid>
    </>
  )
}

export const CenterContentRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <CenterContentLayout>
          <Component {...matchProps} />
        </CenterContentLayout>
      )}
    />
  )
}
