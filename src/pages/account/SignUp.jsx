import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
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

export const SignUp = ({ open, handleClose, addStaff = false }) => {
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
  const [openThankYou, setOpenThankYou] = useState(false)

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
    const sumOfErrors = [
      !nameHelper.error,
      !phoneHelper.error,
      !emailHelper.error,
      !passwordHelper.error,
      !confirmPasswordHelper.error,
    ].reduce((a, b) => a + b)

    if (sumOfErrors === 5) {
      await signup(
        accountDetails.name,
        accountDetails.email,
        accountDetails.phone,
        accountDetails.password2,
        addStaff
      )
      if (!addStaff) {
        setOpenThankYou(true)
      }
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Create an account"}</DialogTitle>
        <DialogContent className={classes.textFieldWrapper}>
          <TextField
            onChange={(event) => onHandleChange({ name: event.target.value })}
            onKeyPress={async (event) =>
              event.key === "Enter" && (await handleSubmit())
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
          <TextField
            onChange={(event) => onHandleChange({ phone: event.target.value })}
            onKeyPress={async (event) =>
              event.key === "Enter" && (await handleSubmit())
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
          <DialogContentText>{"Login Credential"}</DialogContentText>
          <TextField
            onChange={(event) => onHandleChange({ email: event.target.value })}
            onKeyPress={async (event) =>
              event.key === "Enter" && (await handleSubmit())
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
          <TextField
            onChange={(event) =>
              onHandleChange({ password1: event.target.value })
            }
            onKeyPress={async (event) =>
              event.key === "Enter" && (await handleSubmit())
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
          <TextField
            onChange={(event) =>
              onHandleChange({ password2: event.target.value })
            }
            onKeyPress={async (event) =>
              event.key === "Enter" && (await handleSubmit())
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
          <Typography>
            By sigining up, you agree with our{" "}
            <Link href='https://sgschoolwork.sg/terms'>Terms & condtions</Link> and{" "}
            <Link href='https://sgschoolwork.sg/privacy'>Privacy Policies</Link>.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            className={classes.submitBtn}
            color={"primary"}
            variant={"contained"}>
            {"Create an account"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openThankYou} onClose={() => setOpenThankYou(false)}>
        <DialogTitle>Thank you for Signing up!</DialogTitle>
        <DialogContent>
          You are required to verify your email to access to the quiz. Please
          check your email for verification. If you cannot find the verification
          email, do check your junk / spam mail box too.
        </DialogContent>
        <DialogActions>
          <Button
            variant={"outlined"}
            onClick={() => history.push("/account/settings")}>
            Account Settings
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
