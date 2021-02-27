import {
  Button,
  Card,
  CardContent,
  CardHeader,
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

import { AuthContext } from "../../components/AuthProvider"
import { CenterContentLayout } from "../../layouts/CenterContentRoute"
import { Loading } from "../../components"
import { getUser } from "../../firestore/users"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  notice: {
    color: theme.palette.warning.main,
  },
}))

export const AccountSettings = () => {
  const classes = useStyles()
  const [user, setUser] = useState(null)
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

  const dayToTrialEnd = () => {
    const serverTime = new Date(user.createdOn.seconds * 1000)
    const sevenDaysEpoch = serverTime.setDate(serverTime.getDate() + 7)
    const secLeft = sevenDaysEpoch - Date.now()
    return Math.floor(secLeft / 1000 / 60 / 60 / 24)
  }

  const dayToRenew = () => {
    const serverTime = new Date(user.createdOn.seconds * 1000)
    const nextRenewal = serverTime.setMonth(serverTime.getMonth() + 1)
    const secLeft = nextRenewal - Date.now()
    return Math.floor(secLeft / 1000 / 60 / 60 / 24)
  }

  if (!user) {
    return <Loading />
  }
  return (
    <CenterContentLayout>
      <Card>
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
                  <Grid item>
                    <Typography
                      variant={"subtitle1"}
                      className={classes.notice}>
                      <strong>{dayToTrialEnd()} days left for trial.</strong>
                    </Typography>
                  </Grid>
                )}
                {roles.student && (
                  <>
                    <Grid item>
                      <Typography
                        variant={"subtitle1"}
                        className={classes.notice}>
                        <strong>
                          {dayToRenew()} days left for current usage period.
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button color={"primary"} variant={"contained"}>
                        Renew
                      </Button>
                    </Grid>
                  </>
                )}
              </>
            )}
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>
              <Button color={"primary"} variant={"contained"}>
                {"Reset Password"}
              </Button>
            </Grid>
            <Grid item>
              <Button color={"secondary"} variant={"contained"}>
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </CenterContentLayout>
  )
}
