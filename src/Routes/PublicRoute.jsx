import { Redirect, Route } from "react-router"

import React from "react"

export const PublicRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          authenticated === false ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/admin/managequestion"} />
          )
        }
      />
    </div>
  )
}
