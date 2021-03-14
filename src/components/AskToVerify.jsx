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
          A verification email has been sent to the email address stated here.
          Please check your inbox (including the junk folder). Then click on the
          link provided.
        </DialogContentText>
        <DialogContentText>
          If you did not recieve the email, click on the resend button.
        </DialogContentText>
        <DialogActions>
          <Button onClick={async () => await signout()}>Logout</Button>
          <Button
            color={"primary"}
            variant={"contained"}
            onClick={async () => await sendVerificationEmail()}>
            resend
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
