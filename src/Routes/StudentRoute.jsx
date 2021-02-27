import React, { useContext } from "react"
import { Redirect, Route } from "react-router"

import { AuthContext } from "../components/AuthProvider"
import { FullScreenContentLayout } from "../layouts/FullScreenContentRoute"
import { Loading } from "../components"

export const StudentRoute = ({ component: Component, ...rest }) => {
  const { currentUser, roles } = useContext(AuthContext)
  return (
    <FullScreenContentLayout>
      <Route
        {...rest}
        render={(props) =>
          currentUser ? (
            roles.student || roles.trial || roles.tutor || roles.admin ? (
              <Component {...props} />
            ) : (
              <Loading />
            )
          ) : (
            <Redirect to={"/"} />
          )
        }
      />
    </FullScreenContentLayout>
  )
}
