import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core"
import React, { useContext } from "react"

import { AccountCircleOutlined } from "@material-ui/icons"
import { AuthContext } from "./AuthProvider"
import { makeStyles } from "@material-ui/core/styles"
import { signout } from "../auth/auth"
import { useHistory } from "react-router"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "48px",
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
  const history = useHistory()
  const { currentUser } = useContext(AuthContext)

  const handleLogout = async () => {
    await signout()
    history.push("/")
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar variant={"dense"}>
          <Typography className={classes.title} variant='h6'>
            Quiz App
          </Typography>
          {currentUser.role === "staff" && currentUser.db.isAdmin && (
            <>
              <Button
                className={classes.btn}
                href='/account/manage/staff'
                color='inherit'>
                Staff
              </Button>
              <Button
                className={classes.btn}
                href='/account/manage/students'
                color='inherit'>
                Students
              </Button>
            </>
          )}
          {currentUser.role === "staff" && (
            <Button className={classes.btn} href='/admin' color='inherit'>
              Manage
            </Button>
          )}
          <Button className={classes.btn} href='/question' color='inherit'>
            Quiz
          </Button>
          {currentUser.displayName ? (
            <>
              <Button
                className={classes.btn}
                onClick={handleLogout}
                color='inherit'>
                {"Logout"}
              </Button>
              <Typography
                display={"block"}
                className={classes.greeting}>{`Hi ${currentUser.displayName}`}</Typography>
              <Tooltip title={"Account Settings"}>
                <IconButton
                  href={"/account/settings"}
                  variant={"outlined"}
                  color='inherit'>
                  <AccountCircleOutlined />
                </IconButton>
              </Tooltip>
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
