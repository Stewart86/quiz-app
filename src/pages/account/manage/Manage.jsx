import { Button, Container, Grid } from "@material-ui/core"
import { CancelOutlined, CheckCircleOutline } from "@material-ui/icons"
import React, { useContext, useEffect, useState } from "react"
import {
  disableUser,
  enableUser,
  getAllStudents,
  upgradeRole,
} from "../../../firestore/users"

import { AuthContext } from "../../../components/AuthProvider"
import { DataGrid } from "@material-ui/data-grid"
import { FullScreenContentLayout } from "../../../layouts/FullScreenContentRoute"
import { convertObjToArr } from "../../../helper/utilities"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  dataTable: {
    height: "60vh",
    width: "100%",
  },
  check: {
    color: theme.palette.success.main,
  },
  cross: {
    color: theme.palette.error.main,
  },
}))

export const Manage = () => {
  const classes = useStyles()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const { currentUser } = useContext(AuthContext)

  const getUsersFromDB = async () => {
    const Users = convertObjToArr(await getAllStudents())
    setUsers(Users)
    setLoading(false)
  }
  useEffect(() => {
    getUsersFromDB()
  }, [])

  const handleToAdmin = async (uid) => {
    setLoading(true)
    await upgradeRole(uid, "admin")
    await getUsersFromDB()
    setLoading(false)
  }

  const handleToTutor = async (uid) => {
    setLoading(true)
    await upgradeRole(uid, "tutor")
    await getUsersFromDB()
    setLoading(false)
  }
  const handleEnable = async (uid) => {
    setLoading(true)
    await enableUser(uid)
    await getUsersFromDB()
    setLoading(false)
  }
  const handleDisable = async (uid) => {
    setLoading(true)
    if (currentUser.uid === uid) {
      alert("You cannot disable yourself.")
    } else {
      await disableUser(uid)
      await getUsersFromDB()
    }
    setLoading(false)
  }

  const dataColumn = [
    { field: "name", headerName: "Name", width: 180 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "phone", headerName: "Phone", width: 100 },
    {
      field: "createdOn",
      headerName: "Created Date",
      width: 210,
      valueFormatter: (CellParams) =>
        new Date(CellParams.value.seconds * 1000).toLocaleString(),
    },
    {
      field: "updatedOn",
      headerName: "Updated Date",
      width: 210,
      valueFormatter: (CellParams) =>
        new Date(CellParams.value.seconds * 1000).toLocaleString(),
    },
    {
      field: "dueIn",
      headerName: "Account Expiry",
      width: 160,
    },
    {
      field: "admin",
      headerName: "Admin",
      width: 100,
      renderCell: (cell) =>
        cell.value ? (
          <CheckCircleOutline className={classes.check} />
        ) : (
          <CancelOutlined className={classes.cross} />
        ),
    },
    {
      field: "tutor",
      headerName: "Tutor",
      width: 100,
      renderCell: (cell) =>
        cell.value ? (
          <CheckCircleOutline className={classes.check} />
        ) : (
          <CancelOutlined className={classes.cross} />
        ),
    },
    {
      field: "student",
      headerName: "Student",
      width: 130,
      renderCell: (cell) =>
        cell.value ? (
          <CheckCircleOutline className={classes.check} />
        ) : (
          <CancelOutlined className={classes.cross} />
        ),
    },
    {
      field: "trial",
      headerName: "Trial",
      width: 100,
      renderCell: (cell) =>
        cell.value ? (
          <CheckCircleOutline className={classes.check} />
        ) : (
          <CancelOutlined className={classes.cross} />
        ),
    },
    {
      field: "isEnabled",
      headerName: "Enabled",
      width: 110,
      renderCell: (cell) =>
        cell.value ? (
          <CheckCircleOutline className={classes.check} />
        ) : (
          <CancelOutlined className={classes.cross} />
        ),
    },
    {
      field: "action",
      headerName: "User Management",
      width: 310,
      renderCell: (cell) => (
        <>
          <Button
            disabled={cell.value.isAdmin}
            style={{ marginRight: 5 }}
            size={"small"}
            color={"primary"}
            variant={"contained"}
            onClick={() => handleToAdmin(cell.value.id)}>
            Admin
          </Button>
          <Button
            disabled={cell.value.isTutor}
            style={{ marginRight: 5 }}
            size={"small"}
            color={"primary"}
            variant={"contained"}
            onClick={() => handleToTutor(cell.value.id)}>
            Tutor
          </Button>
          <Button
            disabled={cell.value.isEnabled}
            style={{ marginRight: 5 }}
            size={"small"}
            color={"primary"}
            variant={"contained"}
            onClick={() => handleEnable(cell.value.id)}>
            enable
          </Button>
          <Button
            disabled={!cell.value.isEnabled}
            style={{ marginRight: 5 }}
            size={"small"}
            color={"secondary"}
            variant={"contained"}
            onClick={() => handleDisable(cell.value.id)}>
            disable
          </Button>
        </>
      ),
    },
  ]
  return (
    <FullScreenContentLayout>
      <Container>
        <Grid container>
          <Grid item className={classes.dataTable}>
            <DataGrid loading={loading} rows={users} columns={dataColumn} />
          </Grid>
        </Grid>
      </Container>
    </FullScreenContentLayout>
  )
}
