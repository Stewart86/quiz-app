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
import { deleteQuestions, getQuestions } from "../../firestore/questions"

import { DataGrid } from "@material-ui/data-grid"
import { DeleteForever } from "@material-ui/icons"
import { InsertCategoriesForm } from "../addQuestion/InsertCategoriesForm"
import { convertQuestionObjToArr } from "../../helper/utilities"

export const ManageQuestions = () => {
  const [categories, setCategories] = useState({
    subject: subjects[0],
    level: levels[0],
    type: "Multiple Choice",
  })
  const [questions, setQuestions] = useState([])
  const [selections, setSelections] = useState([])
  const [open, setOpen] = useState(false)

  const getQuestionFromDB = async (categories) => {
    if ("topic" in categories) {
      const lsOfQues = convertQuestionObjToArr(await getQuestions(categories))
      setQuestions(lsOfQues)
    }
  }
  useEffect(() => {
    getQuestionFromDB(categories)
  }, [categories])

  const handleChange = (newValue) => {
    setCategories((state) => ({ ...state, ...newValue }))
  }

  const handleDelete = async () => {
    await deleteQuestions(selections)
    await getQuestionFromDB(categories)
    setOpen(false)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    setOpen(true)
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
        <Grid item style={{ height: "60vh" }}>
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
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          {
            "This is a irreversable operation. Once deleted, it is gone forever."
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
