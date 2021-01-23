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
import { useHistory } from "react-router-dom";

export default function Login() {
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
              variant='outlined'
              margin='normal'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={"Password"}
              variant='outlined'
              margin='normal'
            />
          </Grid>
        </CardContent>
        <CardActions>
          <Button onClick={handleLogin}>Login</Button>
          <Button>Sign Up</Button>
        </CardActions>
        Note: after login check if admin redirect to admin page else question page
        login
      </Card>
  )
}
