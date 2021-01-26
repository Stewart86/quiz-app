import {
  AccountSettings,
  Admin,
  Error,
  InsertQuestion,
  Login,
  Questions,
  Result,
} from "./pages"
import { CssBaseline, Grid } from "@material-ui/core"
import { FillInTheBlank, Nav } from "./components"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"

import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "30vh",
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    margin: theme.spacing(2),
  },
}))

export default function App() {
  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <Nav />
      <Grid className={classes.root} container>
        <Router>
          <Switch>
            <Route path='/fillintheblank'>
              <FillInTheBlank />
            </Route>
            <Route path='/insertquestion'>
              <InsertQuestion />
            </Route>
            <Route path='/question'>
              <Questions />
            </Route>
            <Route path='/result'>
              <Result />
            </Route>
            <Route path='/accountsettings'>
              <AccountSettings />
            </Route>
            <Route path='/admin'>
              <Admin />
            </Route>
            <Route exact path='/Login'>
              <Login />
            </Route>
            <Route exact path='/'>
              <Login />
            </Route>
            <Route path='*'>
              <Error />
            </Route>
          </Switch>
        </Router>
      </Grid>
    </>
  )
}
