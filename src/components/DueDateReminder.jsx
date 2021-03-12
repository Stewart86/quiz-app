import { AppBar, Container, Link, Typography } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { dayToTrialEnd, daysToRenew } from "../helper/utilities"

import { AuthContext } from "./AuthProvider"
import { getStudent } from "../firestore/users"
import { isNumber } from "lodash"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router"

const useStyles = makeStyles((theme) => ({
  footer: {
    top: "auto",
    bottom: 0,
    backgroundColor: theme.palette.warning.main,
  },
}))

export const DueDateReminder = () => {
  const history = useHistory()
  const { currentUser } = useContext(AuthContext)
  const [daysLeft, setDaysLeft] = useState(null)

  const classes = useStyles()

  if (isNumber(daysLeft) && daysLeft < 8) {
    return (
      <>
        <AppBar className={classes.footer} position={"fixed"}>
          <Container>
            <Typography>
              This account will cease in {"TEMP"} days.{" "}
              <Link color={"inherit"} href={"/account/settings"}>
                {" "}
                Renew or Subscribe here
              </Link>
            </Typography>
          </Container>
        </AppBar>
      </>
    )
  }
  return null
}
