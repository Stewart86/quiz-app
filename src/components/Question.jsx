import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core"

import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2)
    }
}))


export default function Question({ count, question }) {
    const classes = useStyles()
  return (
      <Grid item xs={12} >
      <Card>
        <CardHeader title={`Question ${count}`} />
        <CardContent>
          <Typography variant={"subtitle1"} gutterBottom>
            <span dangerouslySetInnerHTML={{ __html: question.question }} />
          </Typography>
        </CardContent>
        <CardActionArea>
        <CardActions>
          <Grid container item direction={"column"} spacing={3}>
            {question.choices.map((choice, i) => {
              return (
                <Grid key={i} item>
                  <Typography variant={"subtitle2"} paragraph>
                    {i + 1}. {choice}
                  </Typography>
                </Grid>
              )
            })}
          </Grid>
        </CardActions>
        </CardActionArea>
      </Card></Grid>
  )
}
