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
import { addOneMonth, dayToTrialEnd, daysToRenew } from "../../helper/utilities"
import { convertToStudent, getUser, renewOne } from "../../firestore/users"

import { AuthContext } from "../../components/AuthProvider"
import { Loading } from "../../components"
import { PaymentModal } from "../../components/PaymentModal"
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
  const [openStripe, setOpenStripe] = useState(false)
  const [openInfo, setOpenInfo] = useState(false)
  const [mode, setMode] = useState(null)

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
  }, [currentUser])

  const getDbUser = async (uid) => {
    const dbUser = await getUser(uid)
    setUser(dbUser)
  }
  const handleOpen = (mode) => {
    setMode(mode)
    setOpenStripe(true)
  }

  const handleClose = () => {
    setOpenStripe(false)
  }

  const handlePayment = async () => {
    if (mode === "renew") {
      const newDate = addOneMonth(user.expireStart.seconds)
      await renewOne(user.id, newDate)
    } else if (mode === "subscribe") {
      await convertToStudent(user.id)
    }
    await getDbUser(user.id)
    setOpenStripe(false)
    setOpenInfo(true)
  }

  const handleVerify = async () => {
    await sendVerificationEmail(currentUser)
  }

  if (!user) {
    return <Loading />
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
                              Verify
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {(roles.student || roles.trial) && (
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
                        onClick={() => handleOpen("subscribe")}
                        color={"primary"}
                        variant={"contained"}>
                        Subscribe now
                      </Button>
                    </Grid>
                  </>
                )}
                {roles.student && (
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
                        onClick={() => handleOpen("renew")}
                        color={"primary"}
                        variant={"contained"}>
                        Renew
                      </Button>
                    </Grid>
                  </>
                )}
              </>
            )}
            {openInfo && (
              <Grid item>
                <Typography>
                  It might take awhile for the system to refresh. Check back
                  again later or refresh the browser for update.
                </Typography>
              </Grid>
            )}
            <Divider />
            {user.isExpired && (
              <Grid item>
                <Button
                  onClick={() => handleOpen("subscribe")}
                  color={"primary"}
                  variant={"contained"}>
                  Subscribe now
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button disabled color={"primary"} variant={"contained"}>
                {"Reset Password"}
              </Button>
            </Grid>
            <Grid item>
              <Button disabled color={"secondary"} variant={"contained"}>
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <PaymentModal
        open={openStripe}
        handleClose={handleClose}
        handlePayment={handlePayment}
      />
    </Container>
  )
}
