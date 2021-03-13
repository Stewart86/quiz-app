import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core"
import { sendVerificationEmail, signout } from "../auth/auth"

import React from "react"

export const AskToVerify = ({ verified, email, role }) => {
  return (
    <Dialog open={!verified}>
      <DialogTitle>Please Verify Your Email.</DialogTitle>
      <DialogContent>
        <DialogContentText>Email: {email}</DialogContentText>
        {role === "staff" && (
          <DialogContentText>Role: {role}</DialogContentText>
        )}
        <DialogContentText>
          Click on the verify button and check your email. Use the link provided
          in the email to verify your account.
        </DialogContentText>
        <DialogActions>
          <Button onClick={async () => await signout()}>Logout</Button>
          <Button
            color={"primary"}
            variant={"contained"}
            onClick={async () => await sendVerificationEmail()}>
            Verify
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
