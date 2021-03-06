import "./App.css"

import { Admin, Error } from "./pages"
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom"

import { Account } from "./pages/account/Account"
import { AuthProvider } from "./components/AuthProvider"
import { CenterContentLayout } from "./layouts/CenterContentRoute"
import { CssBaseline } from "@material-ui/core"
import { FullScreenContentLayout } from "./layouts/FullScreenContentRoute"
import { Login } from "./pages/account/Login"
import { Questions } from "./pages/questions/Questions"
import React from "react"
import { StudentRoute } from "./Routes/StudentRoute"
import { ThemeProvider } from "./ThemeProvider"

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CssBaseline />
        <Router>
          <Switch>
            <StudentRoute path='/question' component={Questions} />
            <Route path={"/Account"}>
              <Account />
            </Route>
            <Route path={"/admin"}>
              <FullScreenContentLayout>
                <Admin />
              </FullScreenContentLayout>
            </Route>
            <Route path='/login'>
              <CenterContentLayout>
                <Login />
              </CenterContentLayout>
            </Route>
            <Route exact path='/'>
              <Redirect to='/login' />
            </Route>
            <Route path='/error'>
              <Error />
            </Route>
            <Route path='*'>
              <Error />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}
