import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core"

import React from "react"
import { makeStyles } from "@material-ui/core"
import placeholder from "../../images/placeholder.png"

const useStyles = makeStyles((theme) => ({
  card: { height: 300, width: 300, borderRadius: 250 },
  media: { height: 300 },
}))

export const TypeCircle = ({ type, handleClick }) => {
  const classes = useStyles()

  console.log(placeholder)

  return (
    <Grid
      container
      alignContent={"center"}
      alignItems={"center"}
      spacing={5}
      direction={"column"}>
      <Grid item>
        <Card className={classes.card}>
          <CardActionArea onClick={handleClick}>
            <CardMedia
              className={classes.media}
              image={placeholder}
              title={type}
            />
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item>
        <Typography variant={"h4"}>{type}</Typography>
      </Grid>
    </Grid>
  )
}
