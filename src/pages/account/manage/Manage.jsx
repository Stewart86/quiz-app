import { Button, Grid, Typography } from "@material-ui/core"
import { CancelOutlined, CheckCircleOutline } from "@material-ui/icons"
import React, { useContext, useEffect, useState } from "react"
import {
  disableUser,
  enableUser,
  getAllUsers,
  upgradeRole,
} from "../../../firestore/users"

import { AuthContext } from "../../../components/AuthProvider"
import { DataGrid } from "@material-ui/data-grid"
import { FullScreenContentLayout } from "../../../layouts/FullScreenContentRoute"
import { capitalize } from "lodash"
import { convertObjToArr } from "../../../helper/utilities"
import { makeStyles } from "@material-ui/core/styles"
import { useParams } from "react-router"

const useStyles = makeStyles((theme) => ({
  header: {
    margin: theme.spacing(2),
  },
  dataTable: {
    height: "88vh",
    width: "100vw",
    padding: theme.spacing(2),
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

  let { type } = useParams()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const { currentUser } = useContext(AuthContext)

  const getUsersFromDB = () => {
    setLoading(true)
  }
  useEffect(() => {
    const getUsersFromDB = async () => {
      if (loading) {
        const Users = convertObjToArr(await getAllUsers(type))
        setUsers(Users)
        setLoading(false)
      }
    }
    getUsersFromDB()
  }, [loading, type])

  const handleToAdmin = async (uid) => {
    await upgradeRole(uid, "admin")
    getUsersFromDB()
  }

  const handleToTutor = async (uid) => {
    await upgradeRole(uid, "tutor")
    getUsersFromDB()
  }
  const handleEnable = async (uid) => {
    await enableUser(uid)
    getUsersFromDB()
  }
  const handleDisable = async (uid) => {
    if (currentUser.uid === uid) {
      alert("You cannot disable yourself.")
    } else {
      await disableUser(uid)
      getUsersFromDB()
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
      type: "dateTime",
      valueFormatter: (CellParams) =>
        new Date(CellParams.value.seconds * 1000).toLocaleString(),
    },
    {
      field: "updatedOn",
      headerName: "Updated Date",
      width: 210,
      type: "dateTime",
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
      width: 105,
      hide: type === "users",
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
      width: 105,
      hide: type === "users",
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
      width: 105,
      hide: type === "staff",
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
      width: 105,
      hide: type === "staff",
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
      width: 105,
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
            disabled={cell.value.isAdmin || !cell.value.isEnabled}
            style={{ marginRight: 5 }}
            size={"small"}
            color={"primary"}
            variant={"contained"}
            onClick={() => handleToAdmin(cell.value.id)}>
            Admin
          </Button>
          <Button
            disabled={cell.value.isTutor || !cell.value.isEnabled}
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
      <Grid container>
        <Grid className={classes.header} item>
          <Typography variant={"h3"}>{capitalize(type)}</Typography>
        </Grid>
        <Grid item className={classes.dataTable}>
          <DataGrid loading={loading} rows={users} columns={dataColumn} />
        </Grid>
      </Grid>
    </FullScreenContentLayout>
  )
}
