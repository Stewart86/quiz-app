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
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minHeight: "80vh"
  },
  textField: {
  },
}))

export default function Login() {
  const classes = useStyles()

  return (
    <Grid
      className={classes.root}
      container
      item
      direction='column'
      justify='center'
      alignItems='center'>
      <Card>
        <CardContent>
          <Grid item xs={12}>
            <Typography variant={"h1"}>Quiz App</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              label={"User ID"}
              variant='outlined'
              margin='normal'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              label={"Password"}
              variant='outlined'
              margin='normal'
            />
          </Grid>
        </CardContent>
        <CardActions>
          <Button>Login</Button>
          <Button>Sign Up</Button>
        </CardActions>
      </Card>
      Note: after login check if admin redirect to admin page else question page
      login
    </Grid>
  )
}
