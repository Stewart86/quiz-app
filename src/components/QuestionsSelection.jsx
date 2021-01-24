import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@material-ui/core"

import { Dropdown } from "./Dropdown"
import React from "react"

export const QuestionsSelection = ({
  data,
  handleOnChange,
  state,
  handlePrintable,
  handleGetQuestions,
}) => {
  return (
    <Card>
      <CardHeader title={"Questions Selection"} />
      <CardContent>
        {Object.keys(data).map((k, i) => {
          return (
            <Dropdown
              key={i}
              handleOnChange={handleOnChange}
              state={state}
              data={data}
              type={k}
            />
          )
        })}
      </CardContent>
        <CardActions>
          <Button onClick={handlePrintable}>Printable</Button>
          {/* TODO: number of question, timer, generate pdf, questions */}
          <Button onClick={handleGetQuestions}>Start</Button>
        </CardActions>
    </Card>
  )
}
