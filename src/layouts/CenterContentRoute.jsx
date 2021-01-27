import { Grid } from "@material-ui/core"
import { Nav } from "../components"
import React from "react"
import { Route } from "react-router-dom"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  centerContent: {
    minHeight: "94vh",
  },
}))
const CenterContentLayout = ({ children }) => {
  const classes = useStyles()

  return (
    <>
      <Nav />
      <Grid
        className={classes.centerContent}
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
