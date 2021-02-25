import { AccountSettings } from "./AccountSettings"
import { AdminRoute } from "../../Routes/AdminRoute"
import { Manage } from "./manage/Manage"
import { PublicRoute } from "../../Routes/PublicRoute"
import React from "react"
import { Renew } from "./Renew"
import { Reset } from "./Reset"
import { SignUp } from "./SignUp"
import { Switch } from "react-router"

export const Account = ({ authenticated, roles }) => (
  <>
    <Switch>
      <PublicRoute
        path={"/account/signup"}
        auth={authenticated}
        component={SignUp}
      />
      <PublicRoute
        path={"/account/reset"}
        auth={authenticated}
        component={Reset}
      />
      {roles === null && (
        <>
          <AdminRoute
            path={"/account/renew/:id"}
            authenticated={authenticated}
            roles={roles}
            component={Renew}
          />
          <AdminRoute
            path={"/account/manage"}
            authenticated={authenticated}
            roles={roles}
            component={Manage}
          />
          <AdminRoute
            path={"/account/settings"}
            authenticated={authenticated}
            roles={roles}
            component={AccountSettings}
          />
        </>
      )}
    </Switch>
  </>
)
