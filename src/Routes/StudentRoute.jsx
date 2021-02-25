import { Redirect, Route } from "react-router"

import { FullScreenContentLayout } from "../layouts/FullScreenContentRoute"
import React from "react"

export const StudentRoute = ({
  component: Component,
  authenticated,
  roles,
  ...rest
}) => {
  return (
    <FullScreenContentLayout>
      <Route
        {...rest}
        render={(props) =>
          authenticated === true && roles.student ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/"} />
          )
        }
      />
    </FullScreenContentLayout>
  )
}
