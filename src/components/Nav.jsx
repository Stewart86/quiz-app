import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"

import { AccountCircleOutlined } from "@material-ui/icons"
import { AuthContext } from "./AuthProvider"
import { getUser } from "../firestore/users"
import { makeStyles } from "@material-ui/core/styles"
import { signout } from "../auth/auth"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "48px"
  },
  title: {
    flexGrow: 1,
  },
  greeting: {
    flexGrow: 0,
    fontFamily: "Indie Flower",
  },
  btn: {
    margin: theme.spacing(1),
  },
}))

export const Nav = () => {
  const classes = useStyles()
  const [userName, setUserName] = useState(null)
  const { currentUser, roles } = useContext(AuthContext)

  useEffect(() => {
    let mounted = true
    const getUserNameFromDb = async (user) => {
      if (user) {
        const dbUser = await getUser(user.uid)
        if (mounted) {
          setUserName(dbUser.name)
        }
      }
    }
    getUserNameFromDb(currentUser)
    return () => {
      mounted = false
    }
  }, [currentUser])

  const handleLogout = () => {
    signout()
  }
  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar variant={"dense"}>
          <Typography className={classes.title} variant='h6'>
            Quiz App
          </Typography>
          {roles && roles.admin && (
            <>
              <Button
                className={classes.btn}
                href='/account/manage'
                color='inherit'>
                Admin
              </Button>
            </>
          )}
          {roles && roles.tutor && (
            <Button className={classes.btn} href='/admin' color='inherit'>
              Manage
            </Button>
          )}
          {roles && (roles.tutor || roles.student || roles.trial) && (
            <Button className={classes.btn} href='/question' color='inherit'>
              Quiz
            </Button>
          )}
          {userName ? (
            <>
              <Button
                className={classes.btn}
                onClick={handleLogout}
                color='inherit'>
                {"Logout"}
              </Button>
              <Typography
                noWarp
                display={"block"}
                className={classes.greeting}>{`Hi ${userName}`}</Typography>
              <IconButton
                href={"/account/settings"}
                variant={"outlined"}
                color='inherit'>
                <AccountCircleOutlined />
              </IconButton>
            </>
          ) : (
            <Button className={classes.btn} href={"/"} color='inherit'>
              {"Login"}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
