import React from "react"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core"
import _ from "lodash"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  cardAction: {
    float: "right",
  },
}))
export const InsertCategoriesForm = ({
  categories,
  handleChange,
  handleInsertClick,
}) => {
  const classes = useStyles()

  return (
    <Card>
      <CardHeader title={"Input Category"} />
      <CardContent>
        <form>
          <FormControl component={"fieldset"}>
            <FormLabel component={"legend"}>Question Category</FormLabel>
            <TextField
              id={"subject"}
              label="Subject"
              className={classes.textField}
              variant="filled"
              size={"small"}
              onChange={handleChange}
              fullWidth
              helperText={"e.g. 'English', 'Mathematics' or 'Science' etc."}
            />
            <TextField
              id={"level"}
              label="Educational Level"
              className={classes.textField}
              variant="filled"
              size={"small"}
              onChange={handleChange}
              fullWidth
              helperText={"e.g. 'Primary 1' or 'Secondary 1' etc."}
            />
            <TextField
              id={"school"}
              label="School"
              className={classes.textField}
              variant="filled"
              size={"small"}
              onChange={handleChange}
              fullWidth
              helperText={"School that this question is produced"}
            />
            <TextField
              id={"year"}
              label="Year"
              className={classes.textField}
              variant="filled"
              size={"small"}
              onChange={handleChange}
              fullWidth
              helperText={"Year that this question is produced"}
            />
          </FormControl>
          <Divider
            variant={"middle"}
            style={{ marginBottom: "2rem", marginTop: "2rem" }}
          />
          <FormControl component={"fieldset"}>
            <FormLabel component={"legend"}>Answer Input Type</FormLabel>
            <RadioGroup value="multipleChoice" onChange={handleChange}>
              {categories.type.map((n, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    value={n}
                    control={<Radio />}
                    label={_.startCase(n)}
                  />
                )
              })}
            </RadioGroup>
          </FormControl>
        </form>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button onClick={handleInsertClick}>Next</Button>
      </CardActions>
    </Card>
  )
}
