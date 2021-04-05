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
import logo from "../images/logo.png"
import { makeStyles } from "@material-ui/core/styles"
import { signout } from "../auth/auth"
import { useHistory } from "react-router"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "66px",
    [theme.breakpoints.down("sm")]: {
      height: "136px",
    },
  },
  title: {
    flexGrow: 1,
    "& :hover": {
      cursor: "pointer",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 40%), 0px 4px 5px 0px rgb(0 0 0 / 24%), 0px 1px 10px 0px rgb(0 0 0 / 22%)",
    },
    "& :active": {
      boxShadow: "0px 1px 2px 1px rgb(0 0 0 / 20%)",
    },
  },
  logo: {
    height: "58px",
    marginTop: "3px",
    padding: "9px",
    borderRadius: "4px",
    boxShadow: "0px 1px 2px 1px rgb(0 0 0 / 20%)",
  },
  greeting: {
    flexGrow: 0.03,
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

  const handleHome = () => {
    window.location.assign("https://sgschoolwork.sg")
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar style={{ overflowX: "auto" }} variant={"dense"}>
          <div className={classes.title}>
            <img
              className={classes.logo}
              src={logo}
              alt={"SG Schoolwork logo"}
              onClick={handleHome}
            />
          </div>
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
                display={"inline"}
                noWrap
                className={
                  classes.greeting
                }>{`Hi ${currentUser.displayName}`}</Typography>
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
