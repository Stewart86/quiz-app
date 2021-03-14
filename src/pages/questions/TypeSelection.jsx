import { Container, Grid, Typography, makeStyles } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"

import { AuthContext } from "../../components/AuthProvider"
import { QUESTION_TYPE } from "../../helper/enum"
import { Redirect } from "react-router"
import { TypeCircle } from "./TypeCircle"
import { isSubscriptionActive } from "../../firestore/products"
import placeholder from "../../images/placeholder.png"

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
          <Typography variant={"h3"}>
            Welcome {currentUser.displayName}
          </Typography>
        </Grid>
        <Grid container justify={"center"} item xs={12}>
          <Typography variant={"h5"}>
            Let's choose the type of lesson you want to begin
          </Typography>
        </Grid>
        <Grid item>
          <TypeCircle
            type={"Multiple Choice"}
            image={placeholder}
            handleClick={() =>
              handleSetType({ type: QUESTION_TYPE.multipleChoice })
            }
          />
        </Grid>
        <Grid item>
          <TypeCircle
            type={"Fill In The Blank"}
            image={placeholder}
            handleClick={() =>
              handleSetType({ type: QUESTION_TYPE.fillInTheBlank })
            }
          />
        </Grid>
        <Grid item>
          <TypeCircle
            type={"Notes"}
            image={placeholder}
            handleClick={() => handleSetType({ type: QUESTION_TYPE.note })}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
