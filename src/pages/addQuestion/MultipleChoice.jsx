import { Grid } from "@material-ui/core"
import { InsertAnswerForm } from "./InsertAnswerForm"
import { InsertQuestionForm } from "./InsertQuestionForm"
import React from "react"

export const MultipleChoice = ({
  rand,
  categories,
  handleEditorChange,
  handleAnswer,
  handleSetChoice,
  handleRemoveClick,
  handleAddClick,
  editorDefault,
}) => {
  return (
    <>
      <Grid item>
        <InsertQuestionForm
          key={rand}
          question={editorDefault}
          editorTitle={"Question"}
          handleEditorChange={handleEditorChange}
        />
      </Grid>
      <Grid item>
        <InsertAnswerForm
          choices={categories.choices}
          handleAnswer={handleAnswer}
          answer={categories.answer}
          handleSetChoice={handleSetChoice}
          handleRemoveClick={handleRemoveClick}
          handleAddClick={handleAddClick}
        />
      </Grid>
    </>
  )
}
