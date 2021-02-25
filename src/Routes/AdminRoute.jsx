import { Redirect, Route } from "react-router"

import { CenterContentLayout } from "../layouts/CenterContentRoute"
import React from "react"

export const AdminRoute = ({
  component: Component,
  authenticated,
  roles,
  ...rest
}) => {
  return (
    <CenterContentLayout>
      <Route
        {...rest}
        render={(props) =>
          authenticated === true && roles.admin ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/admin"} />
          )
        }
      />
    </CenterContentLayout>
  )
}
