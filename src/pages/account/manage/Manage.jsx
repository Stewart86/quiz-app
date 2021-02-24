import { Route, Switch } from "react-router"

import React from "react"
import { Students } from "./Students"
import { Tutors } from "./Tutors"

export const Manage = () => {
  return (
    <div>
      <Switch>
        <Route path={"/account/manage/tutors"}>
          <Tutors />
        </Route>
        <Route path={"/account/manage/Students"}>
          <Students />
        </Route>
      </Switch>
    </div>
  )
}
