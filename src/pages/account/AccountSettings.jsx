import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core"
import React, { useContext, useState } from "react"
import { sendVerificationEmail, signout } from "../../auth/auth"

import { AuthContext } from "../../components/AuthProvider"
import { Loading } from "../../components"
import { Reset } from "./Reset"
import { createPortalLink } from "../../firestore/products"

export const AccountSettings = () => {
  const [resend, setResend] = useState(false)
  const [openResetPassword, setOpenResetPassword] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const handleVerify = async () => {
    await sendVerificationEmail(currentUser)
    setResend(true)
  }

  const handleResetPassword = () => {
    setOpenResetPassword(true)
  }

  const handleLogout = async () => {
    await signout()
  }

  if (!currentUser) {
    return <Loading />
  }

  const handleStripePortal = async () => {
    await createPortalLink()
  }

  return (
    <Container>
      <Card style={{ width: "100%" }}>
        <CardHeader title={"Account"} />
        <CardContent>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant={"button"}>
                          {"Display Name"}
                        </Typography>
                      </TableCell>
                      <TableCell>{currentUser.displayName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant={"button"}>{"Phone"}</Typography>
                      </TableCell>
                      <TableCell>{currentUser.db.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant={"button"}>{"Email"}</Typography>
                      </TableCell>
                      <TableCell>{currentUser.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant={"button"}>
                          {currentUser.role === "staff"
                            ? "Staff Role"
                            : "Registration Status"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {currentUser.db && currentUser.db.isAdmin && "Admin "}
                        {currentUser.role === "staff" && "Tutor "}
                        {currentUser.role === "student" &&
                          currentUser.status === "active" &&
                          "Paid "}
                        {currentUser.role === "student" &&
                          currentUser.status === "trailing" &&
                          "Trial "}
                        {currentUser.db &&
                          !currentUser.db.isEnabled &&
                          "Account Disabled"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant={"button"}>Verified</Typography>
                      </TableCell>
                      <TableCell>
                        {currentUser.emailVerified ? (
                          "Yes"
                        ) : (
                          <>
                            <Typography>No</Typography>
                            <Typography variant={"subtitle1"}>
                              Click verify and check your email to continue
                            </Typography>
                            <Button
                              color={"primary"}
                              variant={"contained"}
                              onClick={handleVerify}>
                              {resend ? "resend" : "verify"}
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                    {currentUser.role === "student" && (
                      <TableRow>
                        <TableCell>
                          <Typography variant={"button"}>
                            Subscription Details
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={handleStripePortal}>
                            Stripe Portal
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {currentUser.role === "student" && (
              <>
                <Grid item>
                  <Divider />
                </Grid>
                <Grid item>
                  <Typography variant={"h6"}>Days Remaining</Typography>
                </Grid>
                {/* {roles.trial && (
                  <>
                    <Grid item>
                      <Typography
                        variant={"subtitle1"}
                        className={classes.notice}>
                        <strong>
                          {dayToTrialEnd(user.expireStart.seconds) > 0
                            ? `${dayToTrialEnd(
                                user.expireStart.seconds
                              )} days left for trial.`
                            : `Your trial expired ${Math.abs(
                                dayToTrialEnd(user.expireStart.seconds)
                              )} days ago.`}
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={() => handlePayment("subscribe")}
                        color={"primary"}
                        variant={"contained"}>
                        Subscribe now
                      </Button>
                    </Grid>
                  </>
                )} */}
                {/* {roles && roles.student && (
                  <>
                    <Grid item>
                      <Typography
                        variant={"subtitle1"}
                        className={classes.notice}>
                        <strong>
                          {daysToRenew(user.expireStart.seconds) > 0
                            ? `${daysToRenew(
                                user.expireStart.seconds
                              )} days left for current usage period.`
                            : `Your trial expired ${Math.abs(
                                daysToRenew(user.expireStart.seconds)
                              )} days ago.`}
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={() => handlePayment("renew")}
                        color={"primary"}
                        variant={"contained"}>
                        Renew
                      </Button>
                    </Grid>
                  </>
                )} */}
              </>
            )}
            <Divider />
            <Grid item>
              <Button
                onClick={handleResetPassword}
                color={"primary"}
                variant={"contained"}>
                {"Reset Password"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleLogout}
                color={"primary"}
                variant={"contained"}>
                {"Logout"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Reset
        open={openResetPassword}
        onClose={() => setOpenResetPassword(false)}
      />
    </Container>
  )
}
