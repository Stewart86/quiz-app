import { AccountSettings } from "./AccountSettings"
import { AdminRoute } from "../../Routes/AdminRoute"
import { Manage } from "./manage/Manage"
import { PublicRoute } from "../../Routes/PublicRoute"
import React from "react"
import { Renew } from "./Renew"
import { Reset } from "./Reset"
import { SignUp } from "./SignUp"
import { StudentRoute } from "../../Routes/StudentRoute"
import { Switch } from "react-router"

export const Account = () => (
  <>
    <Switch>
      <PublicRoute path={"/account/signup"} component={SignUp} />
      <PublicRoute path={"/account/reset"} component={Reset} />
      <AdminRoute path={"/account/renew"} component={Renew} />
      <AdminRoute path={"/account/manage"} component={Manage} />
      <StudentRoute path={"/account/settings"} component={AccountSettings} />
    </Switch>
  </>
)
