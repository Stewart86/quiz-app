import {
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
} from "@material-ui/core"
import React, { useState } from "react"

import { PrintableFITBAnswer } from "./PrintableFITBAnswer"
import { PrintableMCQAnswer } from "./PrintableMCQAnswer"
import { PrintableQuestions } from "./PrintableQuestions"
import { QUESTION_TYPE } from "../../helper/enum"

export const Printable = ({ questions }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <Container>
      <Grid container>
        {questions[1].type !== QUESTION_TYPE.note && (
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={showAnswer}
                  onChange={() => setShowAnswer((state) => !state)}
                />
              }
              label='Show Answer'
            />
          </FormGroup>
        )}
      </Grid>
      {showAnswer ? (
        <>
          {(() => {
            switch (questions[1].type) {
              case QUESTION_TYPE.multipleChoice:
                return <PrintableMCQAnswer questions={questions} />

              case QUESTION_TYPE.fillInTheBlank:
                return <PrintableFITBAnswer questions={questions} />

              default:
                break
            }
          })()}
        </>
      ) : (
        <Grid container direction={"column"} spacing={2}>
          {Object.keys(questions).map((key) => (
            <PrintableQuestions
              key={key}
              count={key}
              question={questions[key]}
            />
          ))}
        </Grid>
      )}
    </Container>
  )
}
