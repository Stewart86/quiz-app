import { Container, CssBaseline } from "@material-ui/core"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"

import AccountSettings from "./pages/AccountSettings"
import Admin from "./pages/Admin"
import Error from "./pages/Error"
import InsertQuestion from "./pages/InsertQuestion"
import InsertQuestionOptions from "./pages/InsertQuestionOptions"
import Login from "./pages/Login"
import Nav from "./components/Nav"
import Questions from "./pages/Questions"
import QuestionsSelection from "./pages/QuestionsSelection"
import React from "react"
import Result from "./pages/Result"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(15),
  },
}))

export default function App() {
  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <Nav />
      <Container className={classes.root}>
        <Router>
          <Switch>
            <Route path="/insertquestionoptions">
              <InsertQuestionOptions />
            </Route>
            <Route path="/insertquestion">
              <InsertQuestion />
            </Route>
            <Route path="/questionsselection">
              <QuestionsSelection />
            </Route>
            <Route path="/questions">
              <Questions />
            </Route>
            <Route path="/result">
              <Result />
            </Route>
            <Route path="/accountsettings">
              <AccountSettings />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route exact path="/Login">
              <Login />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Router>
      </Container>
    </>
  )
}
