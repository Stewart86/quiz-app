import { AddQuestion } from "./addQuestion/AddQuestion"
import { ManageQuestions } from "./manageQuestions/ManageQuestions"
import React from "react"
import { Route } from "react-router"

export const Admin = () => {
  return (
    <>
      <Route path={"/admin/manageQuestion"}>
        <ManageQuestions />
      </Route>
      <Route path={"/admin/addQuestion"}>
        <AddQuestion />
      </Route>
    </>
  )
}
