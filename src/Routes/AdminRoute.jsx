import React, { useContext } from "react"
import { Redirect, Route } from "react-router"

import { AuthContext } from "../components/AuthProvider"
import { CenterContentLayout } from "../layouts/CenterContentRoute"

export const AdminRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

  if (currentUser && currentUser.db && !currentUser.db.isEnabled) {
    return <Redirect to={"/account/settings"} />
  }
  return (
    <CenterContentLayout>
      <Route
        {...rest}
        render={(props) =>
          currentUser.role === "staff" && currentUser.db.isAdmin ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/admin"} />
          )
        }
      />
    </CenterContentLayout>
  )
}
