import { Button, Container, Grid } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { convertObjToArr, isSevenDaysOver } from "../../../helper/utilities"
import { getAllStudents, upgradeRole } from "../../../firestore/users"

import { DataGrid } from "@material-ui/data-grid"
import { FullScreenContentLayout } from "../../../layouts/FullScreenContentRoute"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  dataTable: {
    height: "60vh",
    width: "100%",
  },
}))

export const Manage = () => {
  const classes = useStyles()
  const [users, setUsers] = useState([])

  const getUsersFromDB = async () => {
    const Users = convertObjToArr(await getAllStudents())
    setUsers(Users)
  }
  useEffect(() => {
    getUsersFromDB()
  }, [])

  const handleToAdmin = (uid) => {
    upgradeRole(uid, "admin")
    getUsersFromDB()
  }

  const handleToTutor = (uid) => {
    upgradeRole(uid, "tutor")
    getUsersFromDB()
  }
  const handleEnable = (uid) => {
    console.log(uid)
  }
  const handleDisable = (uid) => {
    console.log(uid)
  }

  const dataColumn = [
    { field: "name", headerName: "Name", width: 180 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "phone", headerName: "Phone", width: 100 },
    {
      field: "createdOn",
      headerName: "Created Date",
      width: 500,
      valueFormatter: (CellParams) =>
        new Date(CellParams.value.seconds * 1000),
    },
    {
      field: "expireStart",
      headerName: "Account Expired",
      width: 160,
      renderCell: (cell) => {
        if (!cell.value) {
          return "-"
        } else {
          return isSevenDaysOver(cell.value.seconds) ? "Yes" : "No"
        }
      },
    },
    {
      field: "admin",
      headerName: "Admin",
      width: 100,
      renderCell: (cell) => (cell.value ? "yes" : "No"),
    },
    {
      field: "tutor",
      headerName: "Tutor",
      width: 100,
      renderCell: (cell) => (cell.value ? "yes" : "No"),
    },
    {
      field: "student",
      headerName: "Student",
      width: 130,
      renderCell: (cell) => (cell.value ? "yes" : "No"),
    },
    {
      field: "trial",
      headerName: "Trial",
      width: 100,
      renderCell: (cell) => (cell.value ? "yes" : "No"),
    },
    {
      field: "isEnabled",
      headerName: "Enabled",
      width: 110,
      renderCell: (cell) => (cell.value ? "yes" : "No"),
    },
    {
      field: "id",
      headerName: "Actions",
      width: 310,
      renderCell: (cell) => (
        <>
          <Button
            style={{ marginRight: 5 }}
            size={"small"}
            color={"primary"}
            variant={"contained"}
            onClick={() => handleToAdmin(cell.value)}>
            Admin
          </Button>
          <Button
            style={{ marginRight: 5 }}
            size={"small"}
            color={"primary"}
            variant={"contained"}
            onClick={() => handleToTutor(cell.value)}>
            Tutor
          </Button>
          <Button
            style={{ marginRight: 5 }}
            size={"small"}
            color={"primary"}
            variant={"contained"}
            onClick={() => handleEnable(cell.value)}>
            enable
          </Button>
          <Button
            style={{ marginRight: 5 }}
            size={"small"}
            color={"secondary"}
            variant={"contained"}
            onClick={() => handleDisable(cell.value)}>
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
            <DataGrid rows={users} columns={dataColumn} />
          </Grid>
        </Grid>
      </Container>
    </FullScreenContentLayout>
  )
}

