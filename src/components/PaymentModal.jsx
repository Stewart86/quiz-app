import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core"
import { CardElement, Elements } from "@stripe/react-stripe-js"

import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  content: {
    width: 550
  }
}))

const stripePromise = loadStripe(
  "pk_test_51ISMnzAhlGA96d4e6jQvCCFReCKSAZsonqn7nammjSuMpqfteJQZiqoXFo2wmUKVXNXGtVDwmtQxq05lkiIRT5JW001zHApot2"
)

export const PaymentModal = ({ open, handleClose, handlePayment }) => {
  const classes = useStyles()

  return (
    <Dialog className={classes.root} open={open} onClose={handleClose}>
      <Elements stripe={stripePromise}>
        <DialogTitle>Credit Card Information</DialogTitle>
        <DialogContent className={classes.content}>
          <CardElement />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePayment}
            color={"primary"}
            variant={"contained"}>
            Pay
          </Button>
        </DialogActions>
      </Elements>
    </Dialog>
  )
}
