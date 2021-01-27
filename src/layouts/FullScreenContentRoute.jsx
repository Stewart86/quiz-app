import { Grid } from "@material-ui/core"
import { Nav } from "../components"
import React from "react"
import { Route } from "react-router-dom"

const FullScreenContentLayout = ({ children }) => (
  <>
    <Nav />
    <Grid container>{children}</Grid>
  </>
)

export const FullScreenContentRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <FullScreenContentLayout>
          <Component {...matchProps} />
        </FullScreenContentLayout>
      )}
    />
  )
}
