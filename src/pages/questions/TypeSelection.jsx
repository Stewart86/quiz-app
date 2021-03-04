import { Container, Grid, Typography, makeStyles } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"

import { AuthContext } from "../../components/AuthProvider"
import { QUESTION_TYPE } from "../../helper/enum"
import { TypeCircle } from "./TypeCircle"
import { getUser } from "../../firestore/users"

const useStyles = makeStyles((theme) => ({
  centerContent: {
    minHeight: "94vh",
  },
}))

export const TypeSelection = ({ handleSetType }) => {
  const classes = useStyles()
  const [userName, setUserName] = useState()

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    let mounted = true
    const getUserNameFromDb = async (user) => {
      if (user) {
        const dbUser = await getUser(user.uid)
        if (mounted) {
          setUserName(dbUser.name)
        }
      }
    }
    getUserNameFromDb(currentUser)
    return () => {
      mounted = false
    }
  }, [currentUser])
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
          <Typography variant={"h3"}>Welcome {userName}</Typography>
        </Grid>
        <Grid container justify={"center"} item xs={12}>
          <Typography variant={"h5"}>
            Let's choose the type of lesson you want to begin
          </Typography>
        </Grid>
        <Grid item>
          <TypeCircle
            type={"Multiple Choice"}
            handleClick={() =>
              handleSetType({ type: QUESTION_TYPE.multipleChoice })
            }
          />
        </Grid>
        <Grid item>
          <TypeCircle
            type={"Fill In The Blank"}
            handleClick={() =>
              handleSetType({ type: QUESTION_TYPE.fillInTheBlank })
            }
          />
        </Grid>
        <Grid item>
          <TypeCircle
            type={"Notes"}
            handleClick={() => handleSetType({ type: QUESTION_TYPE.note })}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
