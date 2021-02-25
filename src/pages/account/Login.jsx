import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@material-ui/core"
import React, { useState } from "react"

import { isString } from "lodash"
import { signin } from "../../auth/auth"
import { useHistory } from "react-router-dom"

export const Login = () => {
  const history = useHistory()
  const [cred, setCred] = useState()

  const handleLogin = () => {
    // check for auth here
    const result = signin(cred.email, cred.password)
    console.log(result)
    if (isString(result)) {
      console.log("in correct")
    } else {
      history.push("/question")
    }
  }
  const handleSignUp = () => {
    history.push("/account/signup")
  }
  const handleChange = (obj) => {
    setCred((state) => ({ ...state, ...obj }))
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
            type={"password"}
            label={"Password"}
            variant={"outlined"}
            margin={"dense"}
          />
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify={"space-around"}>
          <Button onClick={handleSignUp} variant={"outlined"}>
            Sign Up
          </Button>
          <Button onClick={handleLogin}>Login</Button>
        </Grid>
      </CardActions>
      {/* } Note: after login check if admin redirect to admin page else question page
        login*/}
    </Card>
  )
}
