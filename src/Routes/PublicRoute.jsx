import { Redirect, Route } from "react-router"

import { CenterContentLayout } from "../layouts/CenterContentRoute"
import React from "react"

export const PublicRoute = ({
  component: Component,
  auth,
  ...rest
}) => {
  return (
    <CenterContentLayout>
      <Route
        {...rest}
        render={(props) =>
          auth === false ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/question"} />
          )
        }
      />
    </CenterContentLayout>
  )
}
