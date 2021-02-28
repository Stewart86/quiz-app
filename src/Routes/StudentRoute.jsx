import React, { useContext } from "react"
import { Redirect, Route } from "react-router"

import { AuthContext } from "../components/AuthProvider"
import { FullScreenContentLayout } from "../layouts/FullScreenContentRoute"
import { Loading } from "../components"

const noRoles = (roles) => {
  if (!roles.student || !roles.trial || !roles.tutor || !roles.admin) {
    return true
  }
  return false
}
export const StudentRoute = ({ component: Component, ...rest }) => {
  const { currentUser, roles } = useContext(AuthContext)

  if (roles === undefined) {
    return <Loading />
  }

  return (
    <FullScreenContentLayout>
      <Route
        {...rest}
        render={(props) =>
          currentUser && noRoles(roles) ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/"} />
          )
        }
      />
    </FullScreenContentLayout>
  )
}
