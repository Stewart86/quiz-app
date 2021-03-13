import React, { useContext } from "react"
import { Redirect, Route } from "react-router"

import { AuthContext } from "../components/AuthProvider"

export const TutorRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          currentUser.role === "staff" ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/question"} />
          )
        }
      />
    </>
  )
}
