import { AppBar, Container, Link, Typography } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { dayToTrialEnd, daysToRenew } from "../helper/utilities"
import { expireUser, getUser } from "../firestore/users"

import { AuthContext } from "./AuthProvider"
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
  const { currentUser, roles } = useContext(AuthContext)
  const [daysLeft, setDaysLeft] = useState(null)

  useEffect(() => {
    let mounted = true
    const getDbUser = async (user) => {
      if (user) {
        const dbUser = await getUser(user.uid)
        if (dbUser && dbUser.expireStart) {
          if (mounted) {
            if (roles.trial) {
              setDaysLeft(dayToTrialEnd(dbUser.expireStart.seconds))
            } else if (roles.student) {
              setDaysLeft(daysToRenew(dbUser.expireStart.seconds))
            } else {
              setDaysLeft(null)
            }
          }
        }
      }
    }
    getDbUser(currentUser)
    return () => {
      mounted = false
    }
  }, [currentUser, roles.student, roles.trial])

  const classes = useStyles()

  const gtfoUser = async (uid) => {
    expireUser(uid)
    history.push("/account/settings")
  }

  if (isNumber(daysLeft) && daysLeft < 0) {
    gtfoUser(currentUser.uid)
    return null
  }

  if (isNumber(daysLeft) && daysLeft < 8) {
    return (
      <>
        <AppBar className={classes.footer} position={"fixed"}>
          <Container>
            <Typography>
              This account will cease in {daysLeft} days.{" "}
              <Link color={"inherit"} href={"/account/settings"}>
                {" "}
                Renew or Subscribe here
              </Link>
              .
            </Typography>
          </Container>
        </AppBar>
      </>
    )
  }
  return null
}
