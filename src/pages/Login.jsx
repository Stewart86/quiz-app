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
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}))

export default function Login() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid container item xs={4}></Grid>
        <Grid container item xs={4}>
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
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  fullWidth
                  label={"Password"}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
            </CardContent>
            <CardActions>
              <Button>Login</Button>
              <Button>Sign Up</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid container item xs={4}></Grid>
      </Grid>
      after login check if admin redirect to admin page else question page login
    </div>
  )
}
