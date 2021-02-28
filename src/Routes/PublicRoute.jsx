import React, { useContext } from "react"
import { Redirect, Route } from "react-router"

import { AuthContext } from "../components/AuthProvider"
import { CenterContentLayout } from "../layouts/CenterContentRoute"

export const PublicRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext)
  return (
    <CenterContentLayout>
      <Route
        {...rest}
        render={(props) =>
          currentUser === null ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/question"} />
          )
        }
      />
    </CenterContentLayout>
  )
}
