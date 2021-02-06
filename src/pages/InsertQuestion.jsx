import { Container, Grid } from "@material-ui/core"
import { InsertCategoriesForm, InsertQuestionForm } from "../components"
import React, { useState } from "react"

export const InsertQuestion = () => {
  const [categories, setCategories] = useState({ type: ["multipleChoice"] })

  const handleInsertClick = () => {
    let validate = 0
    Object.keys(categories).forEach((k, i) => {
      validate += 1
    })
    if (validate !== 5) {
      alert("all input must be completed")
    }
  }

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
            handleInsertClick={handleInsertClick}
          />
        </Grid>
        <Grid item>
          <InsertQuestionForm categories={categories} />
        </Grid>
      </Grid>
    </Container>
  )
}
