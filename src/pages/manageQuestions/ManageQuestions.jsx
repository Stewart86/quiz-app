import { AddBox, DeleteForever, Edit } from "@material-ui/icons"
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
} from "@material-ui/core"
import { LEVELS, SUBJECTS } from "../../helper/constants"
import React, { useEffect, useState } from "react"
import { deleteMany, getMany } from "../../firestore/questions"

import { DataGrid } from "@material-ui/data-grid"
import { InsertCategoriesForm } from "../addQuestion/InsertCategoriesForm"
import { QUESTION_TYPE } from "../../helper/enum"
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

  const dataColumn = [
    {
      field: "id",
      headerName: "Actions",
      width: 110,
      renderCell: () => (
        <>
          <Tooltip title={"Delete"}>
            <IconButton size={"small"} onClick={handleConfirm}>
              <DeleteForever />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Edit"}>
            <IconButton size={"small"} onClick={handleUpdate}>
              <Edit />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    { field: "question", headerName: "Question", width: 300 },
    { field: "choices", headerName: "Choices", width: 200 },
    {
      field: "answer",
      headerName: "Answer",
      type: "number",
      width: 100,
      renderCell: (CellParams) => <>{JSON.stringify(CellParams.value)}</>,
    },
    { field: "explain", headerName: "Explaination", width: 600 },
  ]

  const [categories, setCategories] = useState({
    subject: SUBJECTS[0],
    level: LEVELS[0],
    type: QUESTION_TYPE.multipleChoice,
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
          {selections.length > 1 && (
            <Button
              onClick={handleConfirm}
              variant={"contained"}
              color={"secondary"}
              startIcon={<DeleteForever />}>
              Multiple Delete
            </Button>
          )}
          <Button
            className={classes.rightBtn}
            onClick={handleCreate}
            variant={"contained"}
            color={"primary"}
            startIcon={<AddBox />}>
            Create
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
