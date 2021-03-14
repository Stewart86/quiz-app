import { Add, DeleteForever, Edit } from "@material-ui/icons"
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  Tooltip,
} from "@material-ui/core"
import { LEVELS, SUBJECTS } from "../../helper/constants"
import React, { useContext, useEffect, useState } from "react"
import { deleteMany, getMany } from "../../firestore/questions"

import { AuthContext } from "../../components/AuthProvider"
import { DataGrid } from "@material-ui/data-grid"
import { InsertCategoriesForm } from "../addQuestion/InsertCategoriesForm"
import { QUESTION_TYPE } from "../../helper/enum"
import { WarningSnackBar } from "../../components/WarningSnackBar"
import { convertObjToArr } from "../../helper/utilities"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router"

const useStyles = makeStyles((theme) => ({
  dataTable: {
    height: "60vh",
  },
  rightBtn: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
  deleteIcon: {
    color: theme.palette.error.main,
  },
  editIcon: {
    color: theme.palette.info.main,
  },
}))

export const ManageQuestions = () => {
  const classes = useStyles()
  const history = useHistory()

  const { currentUser } = useContext(AuthContext)

  const dataColumn = [
    {
      field: "id",
      headerName: "Actions",
      width: 110,
      renderCell: (cell) => (
        <>
          {currentUser.db.isAdmin && (
            <Tooltip title={"Delete"}>
              <IconButton
                className={classes.deleteIcon}
                size={"small"}
                onClick={() => handleConfirm(cell.value)}>
                <DeleteForever />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={"Edit"}>
            <IconButton
              className={classes.editIcon}
              size={"small"}
              onClick={() => handleUpdate(cell.value)}>
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
    const lsOfQues = convertObjToArr(await getMany(categories))
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

  const handleConfirm = (qid) => {
    setSelections([qid])
    setOpen(true)
  }

  const handleUpdate = (qid) => {
    history.push(`/admin/updatequestion/${qid}`)
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
          <DataGrid rows={questions} columns={dataColumn} />
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
          <Fab
            className={classes.rightBtn}
            onClick={handleCreate}
            color={"primary"}>
            <Add />
          </Fab>
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
