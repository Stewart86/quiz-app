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

export const Question = ({ count, question }) => {
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
