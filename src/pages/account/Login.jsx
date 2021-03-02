import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useContext, useState } from "react"

import { AuthContext } from "../../components/AuthProvider"
import { WarningSnackBar } from "../../components/WarningSnackBar"
import { isString } from "lodash"
import { signin } from "../../auth/auth"
import { useHistory } from "react-router-dom"

export const Login = () => {
  const history = useHistory()
  const { currentUser } = useContext(AuthContext)
  const [cred, setCred] = useState({ email: "", password: "" })
  const [warning, setWarning] = useState({ open: false, msg: "" })

  const handleLogin = async () => {
    const result = await signin(cred.email, cred.password)
    if (isString(result)) {
      setWarning({ open: true, msg: "Invalid email or password." })
    } else {
      history.push("/admin")
    }
  }
  const handleSignUp = () => {
    history.push("/account/signup")
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
  if (currentUser) {
    history.push("/admin")
    return null
  }
  return (
    <Card elevation={5}>
      <CardHeader
        title={"Quiz App"}
        subheader={"Your One Stop Learning Solution"}
      />
      <CardContent>
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
            onChange={(event) => handleChange({ password: event.target.value })}
            required
            type={"password"}
            label={"Password"}
            variant={"outlined"}
            margin={"dense"}
            onKeyPress={handleKeyPress}
          />
        </Grid>
        <Typography>todo: forget password</Typography>
      </CardContent>
      <CardActions>
        <Grid container justify={"space-around"}>
          <Button onClick={handleSignUp} variant={"outlined"}>
            Sign Up
          </Button>
          <Button onClick={handleLogin}>Login</Button>
        </Grid>
      </CardActions>
      <WarningSnackBar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={warning.open}
        message={warning.msg}
        onClose={handleWarningClose}
        autoHideDuration={3000}
      />
    </Card>
  )
}
