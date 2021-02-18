import { AddBox, DeleteForever, Edit } from "@material-ui/icons"
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { dataColumn, levels, subjects } from "../../helper/constants"
import { deleteMany, getMany } from "../../firestore/questions"

import { DataGrid } from "@material-ui/data-grid"
import { InsertCategoriesForm } from "../addQuestion/InsertCategoriesForm"
import { WarningSnackBar } from "../../components/WarningSnackBar"
import { convertQuestionObjToArr } from "../../helper/utilities"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router"

const useStyles = makeStyles((theme) => ({
  dataTable: {
    height: "60vh",
  },
  rightBtn: { marginLeft: "1em", float: "right" },
}))

export const ManageQuestions = () => {
  const classes = useStyles()
  const history = useHistory()

  const [categories, setCategories] = useState({
    subject: subjects[0],
    level: levels[0],
    type: "Multiple Choice",
    topic: "",
  })
  const [questions, setQuestions] = useState([])
  const [selections, setSelections] = useState([])
  const [open, setOpen] = useState(false)
  const [warning, setWarning] = useState({ open: false, msg: "" })

  const getQuestionFromDB = async (categories) => {
    const lsOfQues = convertQuestionObjToArr(await getMany(categories))
    setQuestions(lsOfQues)
  }
  useEffect(() => {
    getQuestionFromDB(categories)
  }, [categories])

  const handleChange = (newValue) => {
    setCategories((state) => ({ ...state, ...newValue }))
  }

  const handleDelete = async () => {
    await deleteMany(selections)
    await getQuestionFromDB(categories)
    setOpen(false)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    if (selections.length === 0) {
      setWarning({
        open: true,
        msg: "Select at least one question to delete.",
      })
    } else {
      setOpen(true)
    }
  }

  const handleUpdate = () => {
    if (selections.length === 0) {
      setWarning({
        open: true,
        msg: "Select one question to update.",
      })
    } else if (selections.length > 1) {
      setWarning({
        open: true,
        msg: "Only one selection can be updated at a time.",
      })
    } else {
      history.push(`/admin/updatequestion/${selections[0]}`)
    }
  }

  const handleWarningClose = () => {
    setWarning({
      open: false,
      msg: "",
    })
  }

  const handleCreate = () => {
    history.push("/admin/addquestion")
  }

  return (
    <Container>
      <Grid container spacing={2} direction={"column"}>
        <Grid item>
          <InsertCategoriesForm
            categories={categories}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item className={classes.dataTable}>
          <DataGrid
            rows={questions}
            columns={dataColumn}
            checkboxSelection
            onSelectionChange={(newSel) => setSelections(newSel.rowIds)}
          />
        </Grid>
        <Grid item>
          <Button
            onClick={handleConfirm}
            variant={"contained"}
            color={"secondary"}
            startIcon={<DeleteForever />}>
            Delete
          </Button>
          <Button
            className={classes.rightBtn}
            onClick={handleCreate}
            variant={"contained"}
            color={"primary"}
            startIcon={<AddBox />}>
            Create
          </Button>
          <Button
            className={classes.rightBtn}
            onClick={handleUpdate}
            variant={"contained"}
            color={"primary"}
            startIcon={<Edit />}>
            Update
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          {
            "This is a irreversable operation. Once deleted, it is gone forever. Are  you sure?"
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant={"contained"}
            color={"secondary"}
            onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <WarningSnackBar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={warning.open}
        message={warning.msg}
        onClose={handleWarningClose}
        autoHideDuration={3000}
      />
    </Container>
  )
}
