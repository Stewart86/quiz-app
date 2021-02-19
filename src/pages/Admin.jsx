import { Route, Switch } from "react-router"

import { AddQuestion } from "./addQuestion/AddQuestion"
import { ManageQuestions } from "./manageQuestions/ManageQuestions"
import React from "react"

export const Admin = () => {
  return (
    <>
      <Switch>
        <Route path={"/admin/updateQuestion/:id"}>
          <AddQuestion />
        </Route>
        <Route path={"/admin/addQuestion"}>
          <AddQuestion />
        </Route>
        <Route path={"/"}>
          <ManageQuestions />
        </Route>
      </Switch>
    </>
  )
}
