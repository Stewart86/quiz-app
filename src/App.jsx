import { Admin, Error } from "./pages"
import { CenterContentRoute, FullScreenContentRoute } from "./layouts"
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom"

import { Account } from "./pages/account/Account"
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
          <CenterContentRoute path='/account' component={Account} />
          <CenterContentRoute path='/admin' component={Admin} />
          <Route exact path='/'>
            <Redirect to='/account/signup' />
          </Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
