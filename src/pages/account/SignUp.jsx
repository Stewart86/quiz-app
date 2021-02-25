import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import { signup } from "../../auth/auth"
import { useHistory } from "react-router"

const useStyles = makeStyles((theme) => ({
  root: { width: "50ch" },
  cardHeader: { margin: "auto" },
  textFieldWrapper: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  submitBtn: {
    margin: "auto",
  },
}))

export const SignUp = () => {
  const classes = useStyles()
  const history = useHistory()

  const [nameHelper, setNameHelper] = useState({ error: false, msg: "" })
  const [phoneHelper, setPhoneHelper] = useState({ error: false, msg: "" })
  const [emailHelper, setEmailHelper] = useState({ error: false, msg: "" })
  const [passwordHelper, setPasswordHelper] = useState({
    error: false,
    msg: "",
  })
  const [confirmPasswordHelper, setComfirmPasswordHelper] = useState({
    error: false,
    msg: "",
  })
  const [accountDetails, setAccountDetails] = useState({})

  const onHandleChange = (field) => {
    setAccountDetails((state) => ({ ...state, ...field }))
  }

  const nameValidation = (event) => {
    if (event.target.value === undefined || event.target.value === "") {
      setNameHelper({ error: true, msg: "Name cannot be empty" })
    } else {
      setNameHelper({ error: false, msg: "" })
    }
  }

  const emailValidation = (event) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(String(event.target.value).toLowerCase())) {
      setEmailHelper({ error: false, msg: "" })
    } else {
      setEmailHelper({ error: true, msg: "Invalid Email" })
    }
  }

  const phoneValidation = (event) => {
    const re = /^(6|8|9)[0-9]{7}$/
    if (re.test(String(event.target.value).toLowerCase())) {
      setPhoneHelper({ error: false, msg: "" })
    } else {
      setPhoneHelper({ error: true, msg: "Invalid Singapore's phone number" })
    }
  }

  const passwordValidation = (event) => {
    const lengthTest = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
    if (lengthTest.test(String(event.target.value).toLowerCase())) {
      setPasswordHelper({ error: false, msg: "" })
    } else {
      setPasswordHelper({
        error: true,
        msg:
          "Password must be longer than 8 characters including alphanumerical value and special characters",
      })
    }
  }
  const passwordConfirmCheck = (event) => {
    if (!accountDetails && !accountDetails.password1) {
      setComfirmPasswordHelper({ error: false, msg: "" })
    }
    if (accountDetails.password1 === event.target.value) {
      setComfirmPasswordHelper({ error: false, msg: "" })
    } else {
      setComfirmPasswordHelper({
        error: true,
        msg: "Password must be the same.",
      })
    }
  }

  const handleSubmit = async () => {
    if (!accountDetails.name) {
      setNameHelper("Name cannot be empty")
    } else if (!accountDetails.phone) {
      setNameHelper("Phone cannot be empty")
    } else if (!accountDetails.email) {
      setNameHelper("Email cannot be empty")
    } else if (!accountDetails.password1) {
      setNameHelper("Password cannot be empty")
    } else if (!accountDetails.password2) {
      setNameHelper("Confirm password cannot be empty")
    } else {
      await signup(
        accountDetails.name,
        accountDetails.email,
        accountDetails.phone,
        accountDetails.password2
      )
      history.push("/question")
    }
  }

  return (
    <Grid item className={classes.root}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography align={"center"} variant={"h4"}>
                {"Create an account"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) =>
                  onHandleChange({ name: event.target.value })
                }
                onBlur={nameValidation}
                error={nameHelper.error}
                helper={nameHelper.msg}
                fullWidth
                required
                color={"primary"}
                label={"Name"}
                variant={"outlined"}>
                {"Name"}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) =>
                  onHandleChange({ phone: event.target.value })
                }
                onBlur={phoneValidation}
                error={phoneHelper.error}
                helperText={phoneHelper.msg}
                required
                fullWidth
                color={"primary"}
                label={"Phone"}
                variant={"outlined"}>
                {"Email"}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant={"h6"}>
                {"Login Credential"}
              </Typography>
              <TextField
                onChange={(event) =>
                  onHandleChange({ email: event.target.value })
                }
                onBlur={emailValidation}
                error={emailHelper.error}
                helperText={emailHelper.msg}
                fullWidth
                required
                color={"primary"}
                label={"Email"}
                type={"email"}
                variant={"outlined"}>
                {"Email"}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) =>
                  onHandleChange({ password1: event.target.value })
                }
                onBlur={passwordValidation}
                error={passwordHelper.error}
                helperText={passwordHelper.msg}
                required
                fullWidth
                color={"primary"}
                type={"password"}
                label={"Password"}
                variant={"outlined"}>
                {"Password"}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) =>
                  onHandleChange({ password2: event.target.value })
                }
                onBlur={passwordConfirmCheck}
                error={confirmPasswordHelper.error}
                helperText={confirmPasswordHelper.msg}
                required
                fullWidth
                color={"primary"}
                type={"password"}
                label={"Confirm Password"}
                variant={"outlined"}>
                {"Confirm Passward"}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            onClick={handleSubmit}
            className={classes.submitBtn}
            color={"primary"}
            variant={"contained"}>
            {"Create my account"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
