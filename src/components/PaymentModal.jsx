import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core"

import React from "react"

export const PaymentModal = ({ open, handleClose, handlePayment }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Pay With Stripe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            repellendus facere. Et tempore, quae, doloremque eaque fuga
            assumenda ab voluptatibus ad enim veniam libero pariatur cum
            aliquam. Hic, at quaerat?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePayment}
            color={"primary"}
            variant={"contained"}>
            Pay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
