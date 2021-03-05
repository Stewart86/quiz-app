import { Grid } from "@material-ui/core"
import { PrintableMCQ } from "./PrintableMCQ"
import { PrintableNote } from "./PrintableNote"
import { PrinttableFITB } from "./PrinttableFITB"
import { QUESTION_TYPE } from "../../helper/enum"
import React from "react"

export const PrintableQuestions = ({ count, question }) => {
  return (
    <Grid item xs={12}>
      {(() => {
        switch (question.type) {
          case QUESTION_TYPE.multipleChoice:
            return <PrintableMCQ question={question} count={count} />

          case QUESTION_TYPE.fillInTheBlank:
            return <PrinttableFITB question={question} count={count} />

          case QUESTION_TYPE.note:
            return <PrintableNote question={question} count={count} />

          default:
            break
        }
      })()}
    </Grid>
  )
}
