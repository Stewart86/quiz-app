import { Container, Grid } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { dataColumn, levels, subjects } from "../../helper/constants"

import { DataGrid } from "@material-ui/data-grid"
import { InsertCategoriesForm } from "../addQuestion/InsertCategoriesForm"
import { convertQuestionObjToArr } from "../../helper/utilities"
import { getQuestions } from "../../firestore/questions"

export const ManageQuestions = () => {
  const [categories, setCategories] = useState({
    subject: subjects[0],
    level: levels[0],
    type: ["Multiple Choice"],
  })
  const [questions, setQuestions] = useState(null)

  useEffect(() => {
    const getQuestionFromDB = async () => {
      if ("topic" in categories) {
        const lsOfQues = convertQuestionObjToArr(await getQuestions(categories))
        console.log(lsOfQues)
        setQuestions(lsOfQues)
      }
    }
    getQuestionFromDB()
  }, [categories, questions])

  const handleChange = (newValue) => {
    setCategories((state) => ({ ...state, ...newValue }))
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
      </Grid>
      {questions && <DataGrid row={questions} columns={dataColumn} checkboxSelection />}
    </Container>
  )
}
