import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core"

import React from "react"
import { useHistory } from "react-router-dom"

export const Login = () => {
  const history = useHistory()

  const handleLogin = () => {
    // check for auth here
    history.push("/question")
  }
  return (
    <Card>
      <CardContent>
        <Grid item xs={12}>
          <Typography variant={"h1"}>Quiz App</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={"User ID"}
            variant={"outlined"}
            margin={"dense"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type={"password"}
            label={"Password"}
            variant={"outlined"}
            margin={"dense"}
          />
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={handleLogin}>Login</Button>
        <Button variant={"outlined"}>Sign Up</Button>
      </CardActions>
      {/* } Note: after login check if admin redirect to admin page else question page
        login*/}
    </Card>
  )
}
