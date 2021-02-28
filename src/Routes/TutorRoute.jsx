import React, { useContext } from "react"
import { Redirect, Route } from "react-router"

import { AuthContext } from "../components/AuthProvider"
import { Loading } from "../components"

export const TutorRoute = ({ component: Component, ...rest }) => {
  const { currentUser, roles } = useContext(AuthContext)

  const RedirectTo = ({roles}) => {
    if (roles.student || roles.trial) {
      return <Redirect to={"/question"}/>
    } else {
      return <Redirect to={"/account/settings"}/> 
    } 
  }

  if (roles === undefined) {
    return <Loading />
  }
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          currentUser ? (
            roles.tutor ? (
              <Component {...props} />
            ) : (
              <RedirectTo roles={roles} />
            )
          ) : (
            <Redirect to={"/"} />
          )
        }
      />
    </>
  )
}
