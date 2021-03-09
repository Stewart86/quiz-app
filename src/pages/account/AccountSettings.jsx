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
import React, { useContext, useEffect, useState } from "react"
import { checkoutSession, createPortalLink } from "../../firestore/products"
import { dayToTrialEnd, daysToRenew } from "../../helper/utilities"

import { AuthContext } from "../../components/AuthProvider"
import { Loading } from "../../components"
import { Reset } from "./Reset"
import { getUser } from "../../firestore/users"
import { makeStyles } from "@material-ui/core/styles"
import { sendVerificationEmail } from "../../auth/auth"

const useStyles = makeStyles((theme) => ({
  notice: {
    color: theme.palette.warning.main,
  },
}))

export const AccountSettings = () => {
  const classes = useStyles()

  const [user, setUser] = useState(null)
  const [resend, setResend] = useState(false)
  const [openResetPassword, setOpenResetPassword] = useState(false)

  const { currentUser, roles } = useContext(AuthContext)

  useEffect(() => {
    let mounted = true
    const getDbUser = async (user) => {
      if (user) {
        const dbUser = await getUser(user.uid)
        if (mounted) {
          setUser(dbUser)
        }
      }
    }
    getDbUser(currentUser)
    return () => {
      mounted = false
    }
  }, [currentUser, roles])

  const handlePayment = async () => {
    await checkoutSession(currentUser)
  }

  const handleVerify = async () => {
    await sendVerificationEmail(currentUser)
    setResend(true)
  }

  const handleResetPassword = () => {
    setOpenResetPassword(true)
  }

  if (!user) {
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
                        <Typography variant={"button"}>{"Name"}</Typography>
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant={"button"}>{"Phone"}</Typography>
                      </TableCell>
                      <TableCell>{user.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant={"button"}>{"Email"}</Typography>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                    </TableRow>
                    {roles && (
                      <TableRow>
                        <TableCell>
                          <Typography variant={"button"}>
                            {"Registration Status"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {roles.admin && "Admin "}
                          {roles.tutor && "Tutor "}
                          {roles.student && "Paid "}
                          {roles.trial && "Trial "}
                          {!user.isEnabled && "Account Disabled"}
                        </TableCell>
                      </TableRow>
                    )}
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
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {roles && (roles.student || roles.trial) && (
              <>
                <Grid item>
                  <Divider />
                </Grid>
                <Grid item>
                  <Typography variant={"h6"}>Days Remaining</Typography>
                </Grid>
                {roles.trial && (
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
                )}
                {roles && roles.student && (
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
                )}
              </>
            )}
            <Divider />
            {user.isExpired && (
              <Grid item>
                <Button
                  onClick={() => handlePayment("subscribe")}
                  color={"primary"}
                  variant={"contained"}>
                  Subscribe now
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                onClick={handleResetPassword}
                color={"primary"}
                variant={"contained"}>
                {"Reset Password"}
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
