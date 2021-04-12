import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { checkoutSession, getProduct } from "../firestore/products"
import { isEmpty, last } from "lodash"

import { Loading } from "./Loading"
import { signout } from "../auth/auth"

export const SubscribeToTrial = ({ currentUser }) => {
  const [prices, setPrices] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getProductFromDb = async () => {
      const arr = await getProduct()
      setPrices(arr)
    }
    getProductFromDb()
  }, [])

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "SGD",
    minimumFractionDigits: 2,
  })

  const handleSubscribe = async () => {
    setLoading(true)
    await checkoutSession(currentUser, last(prices).price_id)
  }

  const handleSignout = async () => {
    await signout()
  }

  return (
    <Dialog open>
      {loading ? (
        <Loading />
      ) : (
        <>
          <DialogTitle>Subscribe Now</DialogTitle>
          {!isEmpty(prices) && (
            <>
              <DialogTitle>{last(prices).name}</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>
                  Free trial for {last(prices).trial_period_days} days
                </DialogContentText> */}
                {last(prices).description && (
                  <Typography variant={"body1"}>
                    Discription: {last(prices).description}
                  </Typography>
                )}
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Price</TableCell>
                      <TableCell>
                        {currencyFormatter.format(
                          last(prices).unit_amount / 100
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>For</TableCell>
                      <TableCell>
                        {last(prices).interval_count} {last(prices).interval}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </DialogContent>
            </>
          )}
          <DialogActions>
            <Button variant={"outlined"} onClick={handleSignout}>
              Logout
            </Button>
            <Button
              color={"primary"}
              variant={"contained"}
              onClick={handleSubscribe}>
              Subscribe Now
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}
