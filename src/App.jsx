import {
  AccountSettings,
  Admin,
  Error,
  InsertQuestion,
  Login,
  Questions,
} from "./pages"
import { CenterContentRoute, FullScreenContentRoute, LoginPageRoute } from "./layouts"
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom"

import { CssBaseline } from "@material-ui/core"
import { FillInTheBlank } from "./components"
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
            <CenterContentRoute
              path='/insertquestion'
              component={InsertQuestion}
            />
            <FullScreenContentRoute path='/question' component={Questions} />
            <CenterContentRoute
              path='/accountsettings'
              component={AccountSettings}
            />
            <CenterContentRoute path='/admin' component={Admin} />
            <LoginPageRoute path='/login' component={Login} />
            <Route exact path='/'>
              <Redirect to='/login' />
            </Route>
            <Route path='*'>
              <Error />
            </Route>
          </Switch>
        </Router>
    </>
  )
}
