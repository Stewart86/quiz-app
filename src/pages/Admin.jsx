import { AddQuestion } from "./addQuestion/AddQuestion"
import { ManageQuestions } from "./manageQuestions/ManageQuestions"
import React from "react"
import { Switch } from "react-router"
import { TutorRoute } from "../Routes/TutorRoute"

export const Admin = ({ authenticated, roles }) => {
  return (
    <>
      <Switch>
        <TutorRoute
          path={"/admin/updateQuestion/:id"}
          authenticated={authenticated}
          roles={roles}
          component={AddQuestion}
        />
        <TutorRoute
          path={"/admin/addQuestion"}
          authenticated={authenticated}
          roles={roles}
          component={AddQuestion}
        />
        <TutorRoute
          path={"/"}
          authenticated={authenticated}
          roles={roles}
          component={ManageQuestions}
        />
      </Switch>
    </>
  )
}
