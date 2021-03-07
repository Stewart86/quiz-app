import { Route, Switch } from "react-router"

import { AccountSettings } from "./AccountSettings"
import { AdminRoute } from "../../Routes/AdminRoute"
import { CenterContentLayout } from "../../layouts/CenterContentRoute"
import { Manage } from "./manage/Manage"
import { PublicRoute } from "../../Routes/PublicRoute"
import React from "react"
import { Renew } from "./Renew"
import { Reset } from "./Reset"
import { SignUp } from "./SignUp"
import { StudentRoute } from "../../Routes/StudentRoute"

export const Account = () => (
  <>
    <Switch>
      <Route path={"/account/signup"}>
        <CenterContentLayout>
          <SignUp />
        </CenterContentLayout>
      </Route>
      <PublicRoute path={"/account/reset"} component={Reset} />
      <AdminRoute path={"/account/renew"} component={Renew} />
      <AdminRoute path={"/account/manage/:type"} component={Manage} />
      <StudentRoute path={"/account/settings"} component={AccountSettings} />
    </Switch>
  </>
)
