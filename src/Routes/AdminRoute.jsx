import React, { useContext } from "react"
import { Redirect, Route } from "react-router"

import { AuthContext } from "../components/AuthProvider"
import { CenterContentLayout } from "../layouts/CenterContentRoute"
import { Loading } from "../components"

export const AdminRoute = ({ component: Component, ...rest }) => {
  const { currentUser, roles } = useContext(AuthContext)
  return (
    <CenterContentLayout>
      <Route
        {...rest}
        render={(props) =>
          currentUser ? (
            roles.admin ? (
              <Component {...props} />
            ) : (
              <Loading />
            )
          ) : (
            <Redirect to={"/admin"} />
          )
        }
      />{" "}
    </CenterContentLayout>
  )
}
