import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
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
  makeStyles,
} from "@material-ui/core"
import React, { useContext, useState } from "react"
import { sendVerificationEmail, signout } from "../../auth/auth"

import { AuthContext } from "../../components/AuthProvider"
import { Loading } from "../../components"
import { Reset } from "./Reset"
import { createPortalLink } from "../../firestore/products"

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.success.main,
    position: "absolute",
    top: "50%",
    left: "7%",
    marginTop: -12,
    marginLeft: 0,
  },
}))

export const AccountSettings = () => {
  const classes = useStyles()
  const [resend, setResend] = useState(false)
  const [openResetPassword, setOpenResetPassword] = useState(false)
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
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
                          currentUser.db.status}
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
                          <div className={classes.wrapper}>
                            <Button
                              disabled={loading}
                              variant={"contained"}
                              color={"primary"}
                              onClick={handleStripePortal}>
                              Stripe Portal
                            </Button>
                            {loading && (
                              <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                              />
                            )}
                          </div>
                          {loading && (
                            <Typography variant={"caption"}>
                              Please wait while we redirect you to your
                              subscription details.
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
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
