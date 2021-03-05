import "./App.css"

import { Admin, Error } from "./pages"
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom"
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles"
import { cyan, deepOrange } from "@material-ui/core/colors"

import { Account } from "./pages/account/Account"
import { AuthProvider } from "./components/AuthProvider"
import { CenterContentLayout } from "./layouts/CenterContentRoute"
import { CssBaseline } from "@material-ui/core"
import { FullScreenContentLayout } from "./layouts/FullScreenContentRoute"
import { Login } from "./pages/account/Login"
import { Questions } from "./pages/questions/Questions"
import React from "react"
import { StudentRoute } from "./Routes/StudentRoute"

let theme = createMuiTheme({
  typography: {
    fontFamily: "Indie Flower, Open Sans, Raleway,",
    h1: {
      fontFamily: "Indie Flower",
    },
    h2: {
      fontFamily: "Indie Flower",
    },
    h3: {
      fontFamily: "Indie Flower",
    },
    h4: {
      fontFamily: "Indie Flower",
    },
    h5: {
      fontFamily: "Indie Flower",
    },
    h6: {
      fontFamily: "Raleway",
    },
    body1: {
      fontFamily: "Raleway",
    },
    body2: {
      fontFamily: "Raleway",
    },
    button: {
      fontFamily: "Open Sans",
    },
  },
  palette: {
    primary: cyan,
    secondary: deepOrange,
  },
})
theme = responsiveFontSizes(theme)

export default function App() {
  return (
    <ThemeProvider theme={theme}>
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
