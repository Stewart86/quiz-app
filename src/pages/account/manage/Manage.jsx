import { Add, CancelOutlined, CheckCircleOutline } from "@material-ui/icons"
import { Button, Fab, Grid, Typography } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import {
  changeRole,
  disableUser,
  enableUser,
  getAllAdmins,
  getAllUsers,
} from "../../../firestore/users"

import { AuthContext } from "../../../components/AuthProvider"
import { DataGrid } from "@material-ui/data-grid"
import { FullScreenContentLayout } from "../../../layouts/FullScreenContentRoute"
import { SignUp } from "../SignUp"
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
  rightBtn: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
  input: {
    marginBottom: 10,
  },
}))

export const Manage = () => {
  const classes = useStyles()

  let { type } = useParams()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [addUserModal, setAddUserModal] = useState(false)

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const getUsersFromDB = async () => {
      let Users
      if (type === "staff") {
        Users = convertObjToArr(await getAllAdmins())
      } else {
        Users = convertObjToArr(await getAllUsers())
      }
      setUsers(Users)
      setLoading(false)
    }
    getUsersFromDB()
    console.log("effect")
  }, [type, loading])

  const handleToAdmin = async (uid) => {
    setLoading(true)
    await changeRole(uid, "admin")
  }

  const handleToTutor = async (uid) => {
    if (currentUser.uid === uid) {
      alert("You cannot downgrade yourself.")
    } else {
      setLoading(true)
      await changeRole(uid, "tutor")
    }
  }

  const handleEnable = async (uid) => {
    setLoading(true)
    await enableUser(uid)
  }

  const handleDisable = async (uid) => {
    if (currentUser.uid === uid) {
      alert("You cannot disable yourself.")
    } else {
      setLoading(true)
      await disableUser(uid)
    }
  }

  const handleOpenAddUserModal = () => {
    setAddUserModal(true)
  }

  const staffColumn = [
    { field: "name", headerName: "Name", width: 180 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "phone", headerName: "Phone", width: 100 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 105,
      renderCell: (cell) =>
        cell.value ? (
          <CheckCircleOutline className={classes.check} />
        ) : (
          <CancelOutlined className={classes.cross} />
        ),
    },
    {
      field: "isTutor",
      headerName: "Tutor",
      width: 105,
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

  const userColumn = [
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
      width: 180,
      renderCell: (cell) => (
        <>
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
          <DataGrid
            loading={loading}
            rows={users}
            columns={type === "staff" ? staffColumn : userColumn}
          />
        </Grid>
      </Grid>
      {type === "staff" && (
        <>
          <SignUp
            open={addUserModal}
            handleClose={() => {
              setAddUserModal(false)
            }}
            addStaff
          />
          <Fab
            className={classes.rightBtn}
            onClick={handleOpenAddUserModal}
            color={"primary"}>
            <Add />
          </Fab>
        </>
      )}
    </FullScreenContentLayout>
  )
}
