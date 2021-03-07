import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"

import { isEmpty } from "lodash"
import { makeStyles } from "@material-ui/core/styles"
import { resetPassword } from "../../auth/auth"

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
  },
}))
export const Reset = ({ open, onClose }) => {
  const classes = useStyles()

  const [passwordInput, setPasswordInput] = useState({
    pw: "",
    cpw: "",
    opw: "",
  })
  const [pwHelper, setPwHelper] = useState({ pw: "", cpw: "" })

  const handleChange = (input) => {
    setPasswordInput((state) => {
      const obj = { ...state, ...input }
      validate(obj)
      return obj
    })
  }

  const validate = (input) => {
    const validator = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
    setPwHelper((state) => {
      let out
      if ("pw" in input) {
        if (!validator.test(String(input.pw).toLowerCase())) {
          out = { pw: "password does not meet criteria." }
        } else {
          out = { pw: "" }
        }
      }
      if ("cpw" in input && !isEmpty(input.cpw)) {
        if (input.pw !== input.cpw) {
          out = { cpw: "Password not the same" }
        } else {
          out = { cpw: "" }
        }
      }
      return {
        ...state,
        ...out,
      }
    })
  }

  const handleReset = async () => {
    if (
      isEmpty(pwHelper.pw) &&
      isEmpty(pwHelper.cpw) &&
      !isEmpty(passwordInput.opw)
    ) {
      const result = await resetPassword(passwordInput.opw, passwordInput.cpw)
      if (result.error) {
        alert(result.msg)
      }
    }
    onClose()
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <Typography paragraph variant={"subtitle1"}>
          Enter your new password.
        </Typography>
        <Typography paragraph variant={"caption"}>
          Password must be longer than 8 characters including alphanumerical
          value and special characters.
        </Typography>
        <TextField
          className={classes.textField}
          variant={"outlined"}
          label={"Old Password"}
          type={"password"}
          value={passwordInput.opw}
          onKeyPress={async (e) => e.key === "Enter" && (await handleReset())}
          onChange={(e) => handleChange({ opw: e.target.value })}
        />
        <br />
        <TextField
          className={classes.textField}
          variant={"outlined"}
          label={"Password"}
          type={"password"}
          error={Boolean(pwHelper.pw)}
          helperText={pwHelper.pw}
          value={passwordInput.pw}
          onKeyPress={async (e) => e.key === "Enter" && (await handleReset())}
          onChange={(e) => handleChange({ pw: e.target.value })}
        />
        <TextField
          className={classes.textField}
          variant={"outlined"}
          label={"Confirm Password"}
          type={"password"}
          error={Boolean(pwHelper.cpw)}
          helperText={pwHelper.cpw}
          value={passwordInput.cpw}
          onKeyPress={async (e) => e.key === "Enter" && (await handleReset())}
          onChange={(e) => handleChange({ cpw: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} color={"primary"} onClick={handleReset}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}
