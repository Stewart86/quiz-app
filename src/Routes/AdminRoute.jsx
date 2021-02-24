import { Redirect, Route } from "react-router"

import React from "react"

export const AdminRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          authenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/account/login"} />
          )
        }
      />
    </div>
  )
}
