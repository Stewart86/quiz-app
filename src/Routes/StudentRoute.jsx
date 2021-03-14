import React, { useContext } from "react"
import { Redirect, Route } from "react-router"

import { AuthContext } from "../components/AuthProvider"
import { FullScreenContentLayout } from "../layouts/FullScreenContentRoute"

export const StudentRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <FullScreenContentLayout>
      <Route
        {...rest}
        render={(props) =>
          currentUser.uid ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/"} />
          )
        }
      />
    </FullScreenContentLayout>
  )
}
