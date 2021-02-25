import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"

import { AccountCircleOutlined } from "@material-ui/icons"
import { auth } from "../firebase"
import { getUser } from "../firestore/users"
import { makeStyles } from "@material-ui/core/styles"
import { signout } from "../auth/auth"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "108px",
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    margin: theme.spacing(2),
  },
}))

export const Nav = () => {
  const classes = useStyles()
  const [userName, setUserName] = useState()

  useEffect(() => {
    const user = auth.currentUser
    const getUserFromDb = async (uid) => {
      const DbUser = await getUser(uid)
      setUserName(DbUser.name)
    }
    if (user) {
      getUserFromDb(user.uid)
    }
  }, [userName])

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
          <Button className={classes.btn} href='/admin' color='inherit'>
            Admin
          </Button>
          <Button className={classes.btn} href='/question' color='inherit'>
            Question
          </Button>
          {userName ? (
            <>
              <Button
                className={classes.btn}
                onClick={handleLogout} 
                color='inherit'>
                {"Logout"}
              </Button>
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
