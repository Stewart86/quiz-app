import { Container, Grid } from "@material-ui/core"
import React, { useState } from "react"
import { difficulties, levels, subjects } from "../../helper/constants"

import { InsertCategoriesForm } from "./InsertCategoriesForm"
import { InsertQuestionForm } from "./InsertQuestionForm"

export const AddQuestion = () => {
  const [categories, setCategories] = useState({
    subject: subjects[0],
    level: levels[0],
    difficulty: difficulties[0],
    type: ["multipleChoice"],
  })

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
