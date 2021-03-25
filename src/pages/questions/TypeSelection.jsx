import { Container, Grid, Typography, makeStyles } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"

import { AuthContext } from "../../components/AuthProvider"
import { QUESTION_TYPE } from "../../helper/enum"
import { Redirect } from "react-router"
import { TypeCircle } from "./TypeCircle"
import fitbImage from "../../images/FITB.jpg"
import { isSubscriptionActive } from "../../firestore/products"
import mcqImage from "../../images/MCQ.jpg"
import noteImage from "../../images/Notes.jpg"

const useStyles = makeStyles((theme) => ({
  centerContent: {
    minHeight: "94vh",
  },
}))

export const TypeSelection = ({ handleSetType }) => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    const checkSubscription = async () => {
      if (currentUser.role === "student") {
        const { active } = await isSubscriptionActive(currentUser.uid)
        setRedirect(!active)
      }
    }
    checkSubscription()
  }, [currentUser.role, currentUser.uid])

  if (redirect) {
    return <Redirect to={"/account/settings"} />
  }
  return (
    <Container>
      <Grid
        className={classes.centerContent}
        alignContent={"center"}
        justify={"space-evenly"}
        direction={"row"}
        spacing={6}
        container>
        <Grid container justify={"center"} item xs={12}>
          <Typography variant={"h2"}>
            Welcome {currentUser.displayName}
          </Typography>
        </Grid>
        <Grid container justify={"center"} item xs={12}>
          <Typography variant={"h6"}>
            Let's choose the type of lesson you want to begin
          </Typography>
        </Grid>
        <Grid item>
          <TypeCircle
            type={"Multiple Choice"}
            image={mcqImage}
            handleClick={() =>
              handleSetType({ type: QUESTION_TYPE.multipleChoice })
            }
          />
        </Grid>
        <Grid item>
          <TypeCircle
            type={"Fill In The Blank"}
            image={fitbImage}
            handleClick={() =>
              handleSetType({ type: QUESTION_TYPE.fillInTheBlank })
            }
          />
        </Grid>
        <Grid item>
          <TypeCircle
            type={"Creative Writing"}
            image={noteImage}
            handleClick={() => handleSetType({ type: QUESTION_TYPE.note })}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
