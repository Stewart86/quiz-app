import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useContext, useState } from "react"
import { forgetPassword, signin } from "../../auth/auth"

import { AuthContext } from "../../components/AuthProvider"
import { SignUp } from "./SignUp"
import { WarningSnackBar } from "../../components/WarningSnackBar"
import { isString } from "lodash"
import { useHistory } from "react-router-dom"

export const Login = () => {
  const history = useHistory()
  const { currentUser } = useContext(AuthContext)
  const [cred, setCred] = useState({ email: "", password: "" })
  const [warning, setWarning] = useState({ open: false, msg: "" })
  const [openForgetPw, setOpenForgetPw] = useState(false)
  const [email, setEmail] = useState("")
  const [openSignUp, setOpenSignUp] = useState(false)

  const handleLogin = async () => {
    const result = await signin(cred.email, cred.password)
    if (isString(result)) {
      setWarning({ open: true, msg: "Invalid email or password." })
    } else {
      history.push("/admin")
    }
  }

  const handleSignUp = () => {
    setOpenSignUp(true)
  }

  const handleChange = (obj) => {
    setCred((state) => ({ ...state, ...obj }))
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin()
    }
  }

  const handleWarningClose = () => {
    setWarning({ open: false, msg: "" })
  }

  if (currentUser && currentUser.uid) {
    history.push("/admin")
    return null
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleForgetPw = async () => {
    await forgetPassword(email)
    setOpenForgetPw(false)
  }

  return (
    <>
      <Card style={{marginTop: "30px" }} elevation={5}>
        <CardContent>
          <CardHeader
            title={"SG School Work"}
            subheader={"We make learning easy"}
          />
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              autoFocus
              type={"email"}
              onChange={(event) => handleChange({ email: event.target.value })}
              label={"Email"}
              variant={"outlined"}
              margin={"dense"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              onChange={(event) =>
                handleChange({ password: event.target.value })
              }
              required
              type={"password"}
              label={"Password"}
              variant={"outlined"}
              margin={"dense"}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Button onClick={() => setOpenForgetPw(true)} size={"small"}>
            Forget Password
          </Button>
        </CardContent>
        <CardActions disableSpacing>
          <Grid container justify={"space-between"}>
            <Grid item>
              <Button
                onClick={handleSignUp}
                color={"secondary"}
                variant={"contained"}>
                Start your trial now
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleLogin} variant={"outlined"}>
                Login
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <WarningSnackBar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={warning.open}
        message={warning.msg}
        onClose={handleWarningClose}
        autoHideDuration={3000}
      />
      <Dialog open={openForgetPw} onClose={() => setOpenForgetPw(false)}>
        <DialogTitle>Forget Password</DialogTitle>
        <DialogContent>
          <Typography variant={"subtitle1"} gutterBottom>
            Enter the email you use to sign in.
          </Typography>
          <TextField
            fullWidth
            label={"Email"}
            variant={"outlined"}
            onChange={handleEmailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgetPw}>Reset Password</Button>
        </DialogActions>
      </Dialog>
      <SignUp open={openSignUp} handleClose={() => setOpenSignUp(false)} />
    </>
  )
}
