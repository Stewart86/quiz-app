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
          component={AddQuestion}
        />
        <TutorRoute path={"/admin/addQuestion"} component={AddQuestion} />
        <TutorRoute path={"/"} component={ManageQuestions} />
      </Switch>
    </>
  )
}
