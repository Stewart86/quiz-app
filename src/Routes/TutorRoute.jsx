import { Redirect, Route } from "react-router"

import React from "react"

export const TutorRoute = ({
  component: Component,
  authenticated,
  roles,
  ...rest
}) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          authenticated === true && roles.tutor ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/question"} />
          )
        }
      />
    </div>
  )
}
