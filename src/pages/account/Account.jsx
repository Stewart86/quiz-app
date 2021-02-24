import React, { useEffect, useState } from "react"
import { Route, Switch } from "react-router"

import { AccountSettings } from "./AccountSettings"
import { AdminRoute } from "../../Routes/AdminRoute"
import { Loading } from "../../components"
import { Login } from "./Login"
import { Manage } from "./manage/Manage"
import { PublicRoute } from "../../Routes/PublicRoute"
import { Renew } from "./Renew"
import { Reset } from "./Reset"
import { SignUp } from "./SignUp"
import { auth } from "../../firebase"
import { get } from "../../firestore/users"

export const Account = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      get(user.uid)
      setIsSignedIn(!!user)
      setLoading(false)
    })
    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <>
      <Switch>
        {/** if not authenticated, redirect to /account/login */}
        <PublicRoute
          path={"/account/login"}
          authenticated={isSignedIn}
          component={Login}
        />
        <PublicRoute
          path={"/account/signup"}
          authenticated={isSignedIn}
          component={SignUp}
        />
        <PublicRoute
          path={"/account/reset"}
          authenticated={isSignedIn}
          component={Reset}
        />
        <AdminRoute
          path={"/account/renew/:id"}
          authenticated={isSignedIn}
          component={Renew}
        />
        <AdminRoute
          path={"/account/manage"}
          authenticated={isSignedIn}
          component={Manage}
        />
        <AdminRoute
          path={"/account/settings"}
          authenticated={isSignedIn}
          component={AccountSettings}
        />
      </Switch>
    </>
  )
}
