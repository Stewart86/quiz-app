import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { checkoutSession, getProduct } from "../firestore/products"

import { Loading } from "./Loading"
import { isEmpty } from "lodash"

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
    await checkoutSession(currentUser, prices[0].price_id)
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
              <DialogTitle>{prices[0].name}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Free trial for {prices[0].trial_period_days} days
                </DialogContentText>
                {prices[0].description && (
                  <Typography variant={"body1"}>
                    Discription: {prices[0].description}
                  </Typography>
                )}
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Price</TableCell>
                      <TableCell>
                        {currencyFormatter.format(prices[0].unit_amount / 100)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>For</TableCell>
                      <TableCell>
                        {prices[0].interval_count} {prices[0].interval}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </DialogContent>
            </>
          )}
          <DialogActions>
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
