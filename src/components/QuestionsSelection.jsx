import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
} from "@material-ui/core"

import { Dropdown } from "./Dropdown"
import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  centerContent: {
    minHeight: "94vh",
  },
}))
export const QuestionsSelection = ({
  data,
  handleOnChange,
  selection,
  handlePrintable,
  handleGetQuestions,
}) => {
  const classes = useStyles()

  return (
    <Grid
      className={classes.centerContent}
      alignContent={"center"}
      justify={"center"}
      container>
      <Card>
        <CardHeader title={"Questions Selection"} />
        <CardContent>
          {Object.keys(data).map((k, i) => {
            return (
              <Dropdown
                key={i}
                handleOnChange={handleOnChange}
                selection={selection}
                data={data}
                type={k}
              />
            )
          })}
        </CardContent>
        <CardActions>
          <Button onClick={handlePrintable}>Printable</Button>
          {/* TODO: number of question, timer, generate pdf, questions */}
          <Button
            color={"primary"}
            variant={"contained"}
            onClick={handleGetQuestions}>
            Start Quiz
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
