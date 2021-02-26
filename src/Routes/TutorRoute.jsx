import React, { useContext } from "react"
import { Redirect, Route } from "react-router"

import { AuthContext } from "../components/AuthProvider"
import { Loading } from "../components"

export const TutorRoute = ({ component: Component, ...rest }) => {
  const { currentUser, roles } = useContext(AuthContext)
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          currentUser ? (
            roles.tutor ? (
              <Component {...props} />
            ) : (
              <Loading />
            )
          ) : (
            <Redirect to={"/question"} />
          )
        }
      />
    </>
  )
}
