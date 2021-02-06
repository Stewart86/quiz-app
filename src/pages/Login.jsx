import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
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
    <Card elevation={5}>
      <CardHeader
        title={"Quiz App"}
        subheader={"Your One Stop Learning Solution"}
      />
      <CardContent>
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
        <Grid container justify={"space-around"}>
          <Button variant={"outlined"}>Sign Up</Button>
          <Button onClick={handleLogin}>Login</Button>
        </Grid>
      </CardActions>
      {/* } Note: after login check if admin redirect to admin page else question page
        login*/}
    </Card>
  )
}
