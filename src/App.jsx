import { AccountSettings, Admin, Error, Login } from "./pages"
import {
  CenterContentRoute,
  FullScreenContentRoute,
  LoginPageRoute,
} from "./layouts"
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom"

import { CssBaseline } from "@material-ui/core"
import { FillInTheBlank } from "./components"
import { Questions } from "./pages/questions/Questions"
import React from "react"

export default function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path='/fillintheblank'>
            <FillInTheBlank />
          </Route>
          <FullScreenContentRoute path='/question' component={Questions} />
          <CenterContentRoute
            path='/accountsettings'
            component={AccountSettings}
          />
          <CenterContentRoute path='/admin' component={Admin} />
          <LoginPageRoute path='/login' component={Login} />
          <Route exact path='/'>
            <Redirect to='/question' />
          </Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
