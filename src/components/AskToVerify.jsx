import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core"

import React from "react"
import { sendVerificationEmail } from "../auth/auth"

export const AskToVerify = ({ verified }) => {

  return (
    <Dialog open={!verified}>
      <DialogTitle>Please Verify your email.</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Click on the verify button and check your email. Use the link provided
          in the email to verify your account.
        </DialogContentText>
        <DialogActions>
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
