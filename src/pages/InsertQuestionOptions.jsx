import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core"
import React, { useState } from "react"

import InsertQuestion from "../pages/InsertQuestion"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  textField: {
    padding: theme.spacing(0.5),
  },
  paper: {
    margin: theme.spacing(3),
  },
}))

export default function InsertQuestionOptions() {
  const classes = useStyles()
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [categories, setCategories] = useState({})

  const handleInsertClick = () => {
    setShowQuestionForm(true)
  }

  const handleChange = (event) => {
    let obj = categories
    obj[event.target.id] = event.target.value
    setCategories(obj)
  }

  return (
    <>
      {!showQuestionForm ? (
        <Card>
          <CardHeader title={"Input Category"} subheader={"Enter the category that this question belongs to."} />
          <CardContent>
            <form>
              <Grid container direction='column'>
                <Grid item>
                  <TextField
                    id={"subject"}
                    label='Subject'
                    className={classes.textField}
                    variant='filled'
                    onChange={handleChange}
                    fullWidth
                    helperText={"e.g. 'English', 'Mathematics' or 'Science' etc."}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id={"level"}
                    label='Educational Level'
                    className={classes.textField}
                    variant='filled'
                    onChange={handleChange}
                    fullWidth
                    helperText={"e.g. 'Primary 1' or 'Secondary 1' etc."}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id={"school"}
                    label='School'
                    className={classes.textField}
                    variant='filled'
                    onChange={handleChange}
                    fullWidth
                    helperText={"School that this question is produced"}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id={"year"}
                    label='Year'
                    className={classes.textField}
                    variant='filled'
                    onChange={handleChange}
                    fullWidth
                    helperText={"Year that this question is produced"}
                  />
                </Grid>
                <Grid item>
                  {/* should use radio button to prevent mistype*/}
                  <TextField
                    id={"type"}
                    label='Type'
                    className={classes.textField}
                    variant='filled'
                    onChange={handleChange}
                    fullWidth
                    helperText={"e.g. 'Multiple Choice', 'text input'"}
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <CardActionArea>
            <CardActions>
              <Button
                onClick={handleInsertClick}>
                Next
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      ) : (
        <InsertQuestion categories={categories} />
      )}
    </>
  )
}
