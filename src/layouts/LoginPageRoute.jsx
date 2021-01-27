import { Grid } from "@material-ui/core"
import React from "react"
import { Route } from "react-router-dom"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minHeight: "100vh",
  },
}))

const LoginPageLayout = ({ children }) => {
  const classes = useStyles()
  return (
    <Grid
      className={classes.root}
      alignItems={"center"}
      justify={"center"}
      container>
      {children}
    </Grid>
  )
}

export const LoginPageRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <LoginPageLayout>
          <Component {...matchProps} />
        </LoginPageLayout>
      )}
    />
  )
}
