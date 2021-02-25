import { Admin, Error } from "./pages"
import React, { useEffect, useState } from "react"
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom"

import { Account } from "./pages/account/Account"
import { CenterContentLayout } from "./layouts/CenterContentRoute"
import { CssBaseline } from "@material-ui/core"
import { Loading } from "./components"
import { Login } from "./pages/account/Login"
import { Questions } from "./pages/questions/Questions"
import { StudentRoute } from "./Routes/StudentRoute"
import { auth } from "./firebase"
import { getRole } from "./firestore/users"

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [roles, setRoles] = useState({
    studen: false,
    tutor: false,
    admin: false,
  })

  const getRoleFromDb = async () => {
    const currentUser = auth.currentUser
    if (currentUser) {
      const roles = await getRole(currentUser.uid)
      setRoles(roles)
      setLoading(false)
    }
  }

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user)
    })
    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [])

  useEffect(() => {
    getRoleFromDb()
  }, [isSignedIn])

  if (!isSignedIn) {
    return (
      <>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path='/login'>
              <CenterContentLayout>
                <Login />
              </CenterContentLayout>
            </Route>
            <Route exact path='/'>
              <Redirect to='/login' />
            </Route>
            <Route path='*'>
              <Redirect to='/login' />
            </Route>
          </Switch>
        </Router>
      </>
    )
  }
  return loading ? (
    <Loading />
  ) : (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <StudentRoute
            path='/question'
            authenticated={isSignedIn}
            roles={roles}
            component={Questions}
          />
          <Route path={"/Account"}>
            <Account authenticated={isSignedIn} roles={roles} />
          </Route>
          <Route path={"/admin"}>
            <Admin authenticated={isSignedIn} roles={roles} />
          </Route>
          <Route exact path='/login'>
            <Redirect to={"/question"} />
          </Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
