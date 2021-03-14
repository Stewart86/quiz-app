import React, { useContext } from "react"
import { Redirect, Route } from "react-router"

import { AuthContext } from "../components/AuthProvider"
import { CenterContentLayout } from "../layouts/CenterContentRoute"

export const AdminRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

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
